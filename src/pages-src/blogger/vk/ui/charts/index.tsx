import { Box, CircularProgress, Stack } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useEffect, useState } from "react";
import { AudienceGeography } from "./audience-geography";
import { ClipTheme } from "./clip-theme";
import { ClipViewDynamics } from "./clip-view-dynamics";
import { GenderAge } from "./gender-age";
import { PostViewDynamics } from "./post-view-dynamics";
import { TagClip } from "./tag-clip";
import { TagPost } from "./tag-post";
import { TagVideo } from "./tag-video";
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
      <Stack
        spacing={3}
        sx={{
          px: `38px`,
          pt: `12px`,
        }}
      >
        <Box sx={{ width: `cacl(100% + 20px)` }}>
          <Grid2
            container
            spacing={`12px`}
            sx={{
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <TypeContent />
            <GenderAge />
            <TagPost />
            <TagClip />
            <TagVideo />
            <VideoViewDynamics />
            <PostViewDynamics />
            <ClipViewDynamics />
            {/* <DemoDynamics />
            <DemoDynamics2 /> */}
            {postRender && (
              <>
                <AudienceGeography />
                {/* <ThemeVideos /> */}
                <ClipTheme />
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
