import { Stack } from "@mui/material";
import { FC } from "react";
import { TypeContent } from "./type-content";

export const Charts: FC = () => {
  return (
    <>
      <Stack spacing={3} sx={{ px: `40px`, pt: `15px` }}>
        <TypeContent />
      </Stack>
    </>
  );
};
