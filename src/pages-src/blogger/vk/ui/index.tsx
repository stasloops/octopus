"use client";

import Loading from "@/src/pages-src/loading";
import { Layout } from "@/src/widgets/layout";
import { Box, Typography } from "@mui/material";
import { FC, useCallback, useEffect } from "react";
import { useGetBloggerMutate } from "../api/use-blogger";
import { useBloggerStore } from "../model/store";
import { HeaderDetal } from "./header-detal";

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
            <Typography
              variant="h6"
              sx={{ px: `40px`, pt: `15px` }}
            >{`Аналитика аккаунта`}</Typography>
            <HeaderDetal />
          </Box>
        </>
      )}
      {(!data || !!isLoading) && <Loading />}
    </>
  );
};
