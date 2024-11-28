"use client";

import { useSearchParams } from "next/navigation";

export const useGetParams = () => {
  const searchParams = useSearchParams();

  const t = searchParams.get("t");
  const q = searchParams.get("q");
  return {
    ...(t != null && { t }),
    ...(q != null && { q }),
  };
};
