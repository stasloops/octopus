import { Box, Stack } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const ConteinerMonitorCenter: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack
      direction="row"
      sx={{
        width: `100%`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: `100%`,
          maxWidth: `1204px`,
        }}
      >
        {children}
      </Box>
    </Stack>
  );
};
