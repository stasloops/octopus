import { Box, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { GenderAge } from "./gender-age";
import { TagClip } from "./tag-clip";
import { TagPost } from "./tag-post";
import { TagVideo } from "./tag-video";
import { TypeContent } from "./type-content";

export const Charts: FC = () => {
  return (
    <>
      <Stack spacing={3} sx={{ px: `40px`, pt: `15px` }}>
        <Box sx={{ width: `cacl(100% + 20px)` }}>
          <Grid2 container spacing={`20px`}>
            <TypeContent />
            <GenderAge />
            <TagPost />
            <TagClip />
            <TagVideo />
          </Grid2>
        </Box>
      </Stack>
    </>
  );
};
