"use client";

import { HeaderHome } from "@/src/features/header-home";
import Loading from "@/src/pages-src/loading";
import { Layout } from "@/src/widgets/layout";
import { Box } from "@mui/material";
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
            <TextResultElement />
            <TableElement />
          </Box>
        </>
      )}
      {(!data || !!isLoading) && <Loading />}
    </>
  );
};
