"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL_API}`,
});

export const httpLocal = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_URL_TEST_API}`,
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (!config.headers.Authorization && token)
    config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (config) => config,
  async (error) => {
    const token = localStorage.getItem("token");
    if (error.response?.status === 401 && token) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      useRouter().push(`/login`);
    }

    return Promise.reject(error);
  }
);

// http.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (!config.headers.Authorization && token)
//     config.headers.Authorization = `Bearer ${token}`;
//   if (!config.headers.accept) config.headers.accept = "*/*";
//   if (!config.headers["Access-Control-Allow-Origin"])
//     config.headers["Access-Control-Allow-Origin"] = "*";
//   return config;
// });

// http.interceptors.request.use((config) => {
//   const message = {
//     time: Date.now(),
//     config: config,
//   };
//   console.log(message);
//   return config;
// });
