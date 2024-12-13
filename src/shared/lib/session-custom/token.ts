import "server-only";

import { SignJWT, jwtVerify } from "jose";
import moment from "moment";
import { cookies } from "next/headers";

interface SessionPayload {
  [key: string]: any;
}

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Ошибка верификации");
  }
}

export async function createSessionCustom(params: {
  token: string;
  expiresAtServer?: string;
}) {
  const expiresAt = !!params.expiresAtServer
    ? moment(params.expiresAtServer).toDate()
    : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({
    token: params.token,
    expiresAt,
  });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSessionCustom() {
  cookies().delete("session");
}
