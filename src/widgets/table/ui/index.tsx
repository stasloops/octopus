"use client";

import {Box} from "@mui/material";
import {useSearchParams} from "next/navigation";
import {FC, useCallback, useEffect, useMemo} from "react";
import {TableVirtuoso} from "react-virtuoso";
import {FixedHeaderContent} from "./header";
import {RowContent} from "./row-content";
import {VirtuosoTableComponents} from "./virtuoso-table";
import {useBlogers} from "@/entities/bloger";
import {useBloggerTableStore} from "@/entities/bloger/model/store";
import Loading from "@/pages-src/loading";

interface TableElementProps {
  selectable?: boolean;
}

export const TableElement: FC<TableElementProps> = ({selectable = false}) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const {setSelectable, bloggerTable, setBloggerTable} = useBloggerTableStore();
  const { mutateAsync, isLoading, setFilters, data } = useBlogers();

  useEffect(() => {
    setSelectable(selectable)
  }, [selectable])

  const hasMore = useMemo(() => {
    if (!data) return false;
    return !data.meta.end;
  }, [data]);

  useEffect(()=>{
    console.log(bloggerTable?.data);
  }, [bloggerTable])

  const loadMore = useCallback(async () => {
    if (!bloggerTable) return;
    if (!hasMore) return;
    setFilters((prev) => {
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
          padding: 0,
        }}

      >
        <TableVirtuoso
          useWindowScroll
          allowFullScreen
          data={bloggerTable?.data || []}
          components={VirtuosoTableComponents}
          fixedHeaderContent={FixedHeaderContent}
          fixedFooterContent={()=>{
            return isLoading ? <Loading/> : undefined
          }}
          itemContent={RowContent}
          endReached={loadMore}
          context={{
            hasMore,
          }}
        />
      </Box>
    </>
  );
};
