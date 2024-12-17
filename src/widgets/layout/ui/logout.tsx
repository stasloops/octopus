"use client";

import { MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { logout } from "../api/logout";

export const LogOutButton: FC = () => {
  const router = useRouter();
  const onClick = () => {
    logout();
    router.push(`/login`);
  };
  return <MenuItem onClick={onClick}>Выход</MenuItem>;
};
