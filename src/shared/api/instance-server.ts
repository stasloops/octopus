"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { verifySessionCustom } from "../lib/session-custom";

export const httpServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL_API}`,
});

export const httpLocalServer = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL_TEST_API}`,
});

httpServer.interceptors.request.use(async (config) => {
  const session = await verifySessionCustom();
  if (!session) return config;

  if (!config.headers.Authorization && session.token)
    config.headers.Authorization = `Bearer ${session.token}`;
  return config;
});

httpServer.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (error.response?.status === 401) {
      redirect("/login");
    }
    return Promise.reject(error);
  }
);
