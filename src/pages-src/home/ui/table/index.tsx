"use client";

import { useSearchParams } from "next/navigation";
import { FC, useCallback, useMemo } from "react";
import { TableVirtuoso } from "react-virtuoso";
import { useGetBloggerMutate } from "../../api/use-blogger";
import { useBloggerTableStore } from "../../modal/store";
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

  const loadMore = useCallback(async () => {
    if (!bloggerTable) return;
    const res = await mutateAsync({
      search: search || undefined,
      offset: bloggerTable.data.length,
    });

    setBloggerTable({
      data: [...bloggerTable.data, ...res.data],
      meta: res.meta,
    });
  }, [bloggerTable, setBloggerTable, mutateAsync, search]);

  const hasMore = useMemo(() => {
    if (!bloggerTable) return false;
    return !!bloggerTable.meta.end ? false : true;
  }, [bloggerTable]);

  return (
    <>
      <TableVirtuoso
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
    </>
  );
};
