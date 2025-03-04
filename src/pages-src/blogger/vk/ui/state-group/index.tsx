import { Button, Stack } from "@mui/material";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { useCloseAll } from "../../model/store";
import { Other } from "./other";
import { Posts } from "./posts";
import { ShortVideos } from "./short-videos";
import { VideoClips } from "./video-clips";

export const StateGroup: FC = () => {
  const pathname = usePathname();
  const closeIsOpen = useCloseAll(
    (state) =>
      state.group1Open ||
      state.group2Open ||
      state.group3Open ||
      state.group4Open
  );
  const onChangeClose = useCloseAll((state) => state.onCloseAll);
  const onCloseAll = () => {
    onChangeClose();
  };
  return (
    <>
      <Stack
        spacing="12px"
        sx={{
          px: `38px`,
          pt: `54px`,
          position: `relative`,
          "& .PaperGroup": {
            background: `linear-gradient(90.36deg, #2B69D5 3.14%, #5BB1ED 36.46%, #70D2F8 99.72%)`,
            color: `#fff`,
          },
          "& .PaperContent": {
            background: `#fff`,
            color: `#222657`,
          },
          "& .MoreVertIcon": {
            color: `#222657`,
          },
          "& .KeyboardArrowIcon": {
            color: `#fff`,
          },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            position: `absolute`,
            top: `13px`,
            right: `38px`,
            justifyContent: "flex-end",
            alignItems: "center",
            display: closeIsOpen ? `block` : `none`,
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
