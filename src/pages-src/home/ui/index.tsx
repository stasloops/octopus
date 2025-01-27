"use client";

import { HeaderHome } from "@/features/header-home";
import Loading from "@/pages-src/loading";
import { ConteinerMonitorCenter } from "@/shared/ui/container-monitor-center";
import { Layout } from "@/widgets/layout";
import { Box, Typography } from "@mui/material";
import { FC, useCallback, useEffect } from "react";
import { useGetBloggerMutate } from "../api/use-blogger";
import { useBloggerTableStore } from "../model/store";
import { TableElement } from "./table";
import { TextResultElement } from "./text-result";

interface PageProps {
  search: string;
}

export const Page: FC<PageProps> = ({ search }) => {
  const { mutateAsync, isLoading, data } = useGetBloggerMutate();
  const setBloggerTable = useBloggerTableStore((state) => state.setValue);

  const startMutate = useCallback(async () => {
    const res = await mutateAsync({ search: search });
    setBloggerTable(res);
  }, [setBloggerTable, mutateAsync, search]);

  useEffect(() => {
    startMutate();
  }, [search]);

  return (
    <>
      {!!data && !isLoading && (
        <>
          <Layout headerChildren={<HeaderHome />} />
          <Box>
            <ConteinerMonitorCenter>
              <Typography
                sx={{
                  px: {
                    xs: `18px`,
                    md: `38px`,
                    lg: `38px`,
                  },
                  pt: `40px`,
                  fontWeight: `600`,
                  fontSize: `20px`,
                }}
              >{`Поиск по блогерам`}</Typography>
              <TextResultElement />
              <TableElement />
            </ConteinerMonitorCenter>
          </Box>
        </>
      )}
      {(!data || !!isLoading) && <Loading />}
    </>
  );
};
