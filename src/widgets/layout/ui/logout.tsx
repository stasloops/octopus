"use client";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { logout } from "../api/logout";

export const LogOutButton: FC = () => {
  const router = useRouter();
  const onClick = () => {
    logout();
    router.push(`/login`);
  };
  return (
    <Button
      variant="text"
      color="white"
      onClick={onClick}
      startIcon={<LogoutOutlinedIcon />}
      sx={{ justifyContent: `start` }}
    >
      Выход
    </Button>
  );
};
