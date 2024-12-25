"use client";

import Loading from "@/src/pages-src/loading";
import { Layout } from "@/src/widgets/layout";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import {
  Box,
  Chip,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useGetBloggerMutate } from "../api/use-blogger";
import { useGetBloggerMutateStats } from "../api/use-blogger-stats";
import { Charts } from "./charts";
import { HeaderDetal } from "./header-detal";
import { StateGroup } from "./state-group";

interface PageProps {
  idBlogger: number;
}

export const Page: FC<PageProps> = ({ idBlogger }) => {
  const { isLoading: isLoadingBlogger, data: dataBlogger } =
    useGetBloggerMutate();
  const { isLoading: isLoadingBloggerStats, data: dataBloggerStats } =
    useGetBloggerMutateStats();
  const isLoading = isLoadingBlogger && isLoadingBloggerStats;

  const [scrollUp, setScrollUp] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop > 100) {
        setScrollUp(true);
      } else {
        setScrollUp(false);
      }
    }, 200);
    return () => clearInterval(interval);
  });

  const onClickUp = () => {
    document.documentElement.scroll(0, 0);
  };

  return (
    <>
      {!!dataBlogger && !isLoading && (
        <>
          <Layout />
          {scrollUp && (
            <Box sx={{ position: `fixed`, bottom: 0, right: 0 }}>
              <IconButton size="large" onClick={onClickUp}>
                <ArrowCircleUpOutlinedIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
          <Box>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "start",
                alignItems: "center",
                px: `40px`,
                pt: `15px`,
              }}
            >
              <Typography variant="h6">{`Аналитика аккаунта`}</Typography>
              <Tooltip title="Все данные с красной подписью или обводкой - сгенерированы (не настоящие)">
                <Chip
                  color="error"
                  size="small"
                  label="Альфа"
                  variant="outlined"
                />
              </Tooltip>
            </Stack>
            <HeaderDetal />
            <StateGroup />
            <Charts />
          </Box>
        </>
      )}
      {(!dataBlogger || !!isLoading) && <Loading />}
    </>
  );
};
