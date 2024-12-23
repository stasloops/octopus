"use client";

import Loading from "@/src/pages-src/loading";
import { Layout } from "@/src/widgets/layout";
import { Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
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

  return (
    <>
      {!!dataBlogger && !isLoading && (
        <>
          <Layout />
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
