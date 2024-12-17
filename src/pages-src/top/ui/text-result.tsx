"use client";

import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { useBloggerTableStore } from "../model/store";

interface TextResultElement {}

export const TextResultElement: FC<TextResultElement> = ({}) => {
  const bloggerTable = useBloggerTableStore((state) => state.value);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const serchAll = searchParams.size;

  return (
    <>
      <Box
        sx={{
          pt: `15px`,
          pb: `10px`,
          px: `40px`,
          width: `100%`,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            height: `36px`,
          }}
        >
          <Box>
            {!!serchAll && (
              <Typography
                sx={{
                  fontSize: `#222657`,
                  color: `#222657`,
                  fontWeight: 600,
                }}
              >{`По запросу${!!search ? ` "${search}"` : ``} найдено ${
                bloggerTable?.meta.total
              } блогеров`}</Typography>
            )}
          </Box>
          <Box>
            {!!serchAll && <Button endIcon={<DownloadIcon />}>Скачать</Button>}
          </Box>
        </Stack>
      </Box>
    </>
  );
};
