import { Stack } from "@mui/material";
import { FC } from "react";
import { Other } from "./other";
import { Posts } from "./posts";
import { ShortVideos } from "./short-videos";
import { VideoClips } from "./video-clips";

export const StateGroup: FC = () => {
  return (
    <>
      <Stack spacing={2} sx={{ px: `40px`, pt: `15px` }}>
        <VideoClips />
        <ShortVideos />
        <Posts />
        <Other />
      </Stack>
    </>
  );
};
