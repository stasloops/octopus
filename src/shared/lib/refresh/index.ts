"use server";

import {redirect} from "next/navigation";

export const refreshCurrentPage = async (url: string) => {
  redirect(url);
};
