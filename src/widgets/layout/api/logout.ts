"use server";

import { deleteSessionCustom } from "@/shared/lib/session-custom";
import { redirect } from "next/navigation";

export async function logout() {
  deleteSessionCustom();
  redirect("/");
}
