"use client";

import { HeaderHome } from "@/features/header-home";
import Loading from "@/pages-src/loading";
import { Layout } from "@/widgets/layout";
import { Box, Typography } from "@mui/material";
import { FC, useCallback, useEffect } from "react";
import { useBloggerTableStore } from "../model/store";
import { TableElement } from "./table";
import { TextResultElement } from "./text-result";
import { useBlogers } from "@/entities/bloger";

interface PageProps {
  search: string;
}

export const Page: FC<PageProps> = ({ search }) => {
  const { mutateAsync, isLoading, data } = useBlogers();
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
            >{`Поиск по блоггерам`}</Typography>
            <TextResultElement />
            <TableElement />
          </Box>
        </>
      )}
      {(!data || !!isLoading) && <Loading />}
    </>
  );
};
