"use client";

import Loading from "@/src/pages-src/loading";
import { Layout } from "@/src/widgets/layout";
import { Box, Chip, Stack, Tooltip, Typography } from "@mui/material";
import { FC, useCallback, useEffect } from "react";
import { useGetBloggerMutate } from "../api/use-blogger";
import { useBloggerStore } from "../model/store";
import { Charts } from "./charts";
import { HeaderDetal } from "./header-detal";
import { StateGroup } from "./state-group";

interface PageProps {
  idBlogger: number;
}

export const Page: FC<PageProps> = ({ idBlogger }) => {
  const { mutateAsync, isLoading, data } = useGetBloggerMutate();
  const setBloggerTable = useBloggerStore((state) => state.setValue);

  const startMutate = useCallback(async () => {
    const res = await mutateAsync({ id__in: idBlogger.toString() });
    if (!res) return;
    if (res.data.length <= 0) return;
    setBloggerTable(res.data[0]);
  }, [setBloggerTable, mutateAsync, idBlogger]);

  useEffect(() => {
    startMutate();
  }, [idBlogger]);

  return (
    <>
      {!!data && !isLoading && (
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
      {(!data || !!isLoading) && <Loading />}
    </>
  );
};
