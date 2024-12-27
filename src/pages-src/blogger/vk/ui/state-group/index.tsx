import { Button, Stack } from "@mui/material";
import { FC } from "react";
import { useCloseAll } from "../../model/store";
import { Other } from "./other";
import { Posts } from "./posts";
import { ShortVideos } from "./short-videos";
import { VideoClips } from "./video-clips";

export const StateGroup: FC = () => {
  const onChangeClose = useCloseAll((state) => state.onChange);
  const onCloseAll = () => {
    onChangeClose();
  };
  return (
    <>
      <Stack spacing={2} sx={{ px: `40px`, pt: `15px` }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button onClick={onCloseAll}>Свернуть все</Button>
        </Stack>
        <VideoClips />
        <ShortVideos />
        <Posts />
        <Other />
      </Stack>
    </>
  );
};
