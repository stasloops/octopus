"use client";

import { Box, Stack, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FC } from "react";
import { useBloggerTableStore } from "../../model/store";

interface TextResultElement {}

export const TextResultElement: FC<TextResultElement> = ({}) => {
  const bloggerTable = useBloggerTableStore((state) => state.value);
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

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
            {!!search && (
              <Typography
                sx={{
                  fontSize: `#222657`,
                  color: `#222657`,
                  fontWeight: 600,
                }}
              >{`По запросу "${search}" найдено ${bloggerTable?.meta.total} блогеров`}</Typography>
            )}
          </Box>
          <Box></Box>
        </Stack>
      </Box>
    </>
  );
};
