"use client";

import { Chip, MenuItem, Stack, Tooltip, Typography } from "@mui/material";
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
    <MenuItem onClick={onClick}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="inherit">Выход</Typography>
        <Tooltip title="Этой кнопки не будет">
          <Chip color="error" size="small" label="Альфа" variant="outlined" />
        </Tooltip>
      </Stack>
    </MenuItem>
  );
};
