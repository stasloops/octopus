import "server-only";

import { cookies } from "next/headers";
import { decrypt } from ".";

interface ISession {
  token: string;
}

export const verifySessionCustom = async () => {
  const cookie = cookies().get("session")?.value;
  const session = (await decrypt(cookie)) as ISession | undefined;
  if (session?.token === undefined) return null;

  return {
    token: session.token,
  };
};
