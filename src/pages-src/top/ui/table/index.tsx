"use client";

import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { useGetBloggerMutate } from "../../api/use-blogger";
import { useBloggerTableStore } from "../../model/store";
import { fixedHeaderContent } from "./header";
import { rowContent } from "./row-content";
import { VirtuosoTableComponents } from "./virtuoso-table";

interface TableElementProps {}

export const TableElement: FC<TableElementProps> = ({}) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const bloggerTable = useBloggerTableStore((state) => state.value);
  const setBloggerTable = useBloggerTableStore((state) => state.setValue);

  const { mutateAsync } = useGetBloggerMutate();

  const hasMore = useMemo(() => {
    if (!bloggerTable) return false;
    return !!bloggerTable.meta.end ? false : true;
  }, [bloggerTable]);

  const loadMore = useCallback(async () => {
    if (!bloggerTable) return;
    if (!hasMore) return;

    const res = await mutateAsync({
      search: search || undefined,
      offset: bloggerTable.data.length,
    });

    const box = document.getElementById("Scroller") as HTMLElement | null;
    if (box) {
      box?.scroll(0, box?.scrollTop - 5);
    }

    // window.scroll(500, 0);
    setBloggerTable({
      data: [...bloggerTable.data, ...res.data],
      meta: res.meta,
    });
  }, [bloggerTable, setBloggerTable, mutateAsync, search, hasMore]);

  return (
    <>
      <Box
        sx={{
          "& .ReactVirtualized__Table__headerRow": {
            position: `sticky`,
            insetBlockStart: 0,
            zIndex: 1,
          },
        }}
      >
        <TableVirtuoso
          useWindowScroll
          allowFullScreen
          data={bloggerTable?.data || []}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
          endReached={loadMore}
          context={{
            hasMore,
          }}
        />
      </Box>
    </>
  );
};
