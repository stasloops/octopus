import { Box, CircularProgress, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useEffect, useState } from "react";
import { AudienceGeography } from "./audience-geography";
import { ClipViewDynamics } from "./clip-view-dynamics";
import { DemoDynamics } from "./dynamics-generate";
import { GenderAge } from "./gender-age";
import { PostViewDynamics } from "./post-view-dynamics";
import { TagClip } from "./tag-clip";
import { TagPost } from "./tag-post";
import { TagVideo } from "./tag-video";
import { ThemeVideos } from "./theme-videos";
import { TypeContent } from "./type-content";
import { VideoViewDynamics } from "./video-view-dynamics";

export const Charts: FC = () => {
  const [postRender, setPostRender] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setPostRender(true);
    }, 2000);
  }, []);

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
            <VideoViewDynamics />
            <PostViewDynamics />
            <ClipViewDynamics />
            <DemoDynamics />
            {postRender && (
              <>
                <AudienceGeography />
                <ThemeVideos />
              </>
            )}
            {!postRender && (
              <Grid2 xs={12} md="auto" lg="auto">
                <CircularProgress />
              </Grid2>
            )}
          </Grid2>
        </Box>
      </Stack>
    </>
  );
};
