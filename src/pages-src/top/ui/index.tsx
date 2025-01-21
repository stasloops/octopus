"use client";

import { HeaderTop } from "@/src/features/header-top";
import Loading from "@/src/pages-src/loading";
import { Layout } from "@/src/widgets/layout";
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
          <Layout headerChildren={<HeaderTop />} />
          <Box>
            <Typography
              variant="h6"
              sx={{ px: `38px`, pt: `15px` }}
            >{`Поиск по топ блоггерам`}</Typography>
            <TextResultElement />
            <TableElement />
          </Box>
        </>
      )}
      {(!data || !!isLoading) && <Loading />}
    </>
  );
};
