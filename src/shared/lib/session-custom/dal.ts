import "server-only";

import { cookies } from "next/headers";
import { decrypt } from ".";

export const verifySessionCustom = async () => {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (session?.userId === undefined) {
    return null;
  }

  return {
    isAuth: true,
    user: {
      id: session.userId as number,
    },
  };
};
