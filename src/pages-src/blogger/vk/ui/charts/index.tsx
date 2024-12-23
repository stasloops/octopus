import { Box, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { TypeContent } from "./type-content";

export const Charts: FC = () => {
  return (
    <>
      <Stack spacing={3} sx={{ px: `40px`, pt: `15px` }}>
        <Box sx={{ width: `cacl(100% + 20px)` }}>
          <Grid2 container spacing={`20px`}>
            <TypeContent />
          </Grid2>
        </Box>
      </Stack>
    </>
  );
};
