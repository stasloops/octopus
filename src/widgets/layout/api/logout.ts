"use server";

import { deleteSessionCustom } from "@/src/shared/lib/session-custom";
import { redirect } from "next/navigation";

export async function logout() {
  deleteSessionCustom();
  redirect("/");
}
