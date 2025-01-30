"use client";

import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { FC, useCallback, useEffect, useMemo } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { useBloggerTableStore } from "../../model/store";
import { fixedHeaderContent } from "./header";
import { rowContent } from "./row-content";
import { VirtuosoTableComponents } from "./virtuoso-table";
import { useBlogers } from "@/entities/bloger";

interface TableElementProps {}

export const TableElement: FC<TableElementProps> = ({}) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const bloggerTable = useBloggerTableStore((state) => state.value);
  const setBloggerTable = useBloggerTableStore((state) => state.setValue);

  const { mutateAsync, setFilters, data } = useBlogers();

  const hasMore = useMemo(() => {
    if (!data) return false;
    return !!data.meta.end ? false : true;
  }, [data]);

  const loadMore = useCallback(async () => {
    if (!bloggerTable) return;
    if (!hasMore) return;
    setFilters((prev) => {
      console.log(prev);
      
      return {
        ...prev,
        search: search || undefined,
        offset: bloggerTable.data.length,
      };
    });
    await mutateAsync();

    const box = document.getElementById("Scroller") as HTMLElement | null;
    if (box) {
      box?.scroll(0, box?.scrollTop - 5);
    }

    // window.scroll(500, 0);
  }, [bloggerTable, setBloggerTable, mutateAsync, search, hasMore]);

  useEffect(() => {
    if (data) {
      if (data.meta.offset === 0) {
        return setBloggerTable(data);
      }
      if (!bloggerTable) return;

      const existingIds = new Set(bloggerTable.data.map((item) => item.id));
      const hasDuplicates = data.data.some((item) => existingIds.has(item.id));

      if (!hasDuplicates) {
        setBloggerTable({
          data: [...bloggerTable.data, ...data.data],
          meta: data.meta,
        });
      }
    }
  }, [JSON.stringify(data)]);

  return (
    <>
      <Box
        sx={{
          "& .ReactVirtualized__Table__headerRow": {
            position: `sticky`,
            insetBlockStart: 0,
            zIndex: 1,
          },
          pt: `10px`,
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
