import { CircularProgress, Stack } from "@mui/material";
import { FC, useCallback, useMemo } from "react";
import { Virtuoso } from "react-virtuoso";
import { useMarketingIntegrations } from "../api/use-marketing-integrations";
import { limitCount } from "../model/const";
import { useMarketingTableStore } from "../model/store";
import { rowContent } from "./row-content";

export const ResultList: FC = () => {
  const marketingTable = useMarketingTableStore((state) => state.value);
  const setMarketingTable = useMarketingTableStore((state) => state.setValue);

  const { mutateAsync, isLoading } = useMarketingIntegrations();

  const hasMore = useMemo(() => {
    if (!marketingTable) return false;
    return !!marketingTable.meta.end ? false : true;
  }, [marketingTable]);

  const loadMore = useCallback(async () => {
    if (!marketingTable) return;
    if (!hasMore) return;

    const res = await mutateAsync({
      offset: marketingTable.data.length,
      limit: limitCount,
      // sort: `-subscribers`,
    });

    const box = document.getElementById("Scroller") as HTMLElement | null;
    if (box) {
      box?.scroll(0, box?.scrollTop - 5);
    }

    setMarketingTable({
      data: [...marketingTable.data, ...res.data],
      meta: res.meta,
    });
  }, [marketingTable, setMarketingTable, mutateAsync, hasMore]);

  return (
    <>
      <Stack spacing={2}>
        {!!marketingTable && (
          <Virtuoso
            useWindowScroll
            allowFullScreen
            style={{ height: 400 }}
            data={marketingTable.data}
            itemContent={rowContent}
            endReached={loadMore}
            components={{
              Footer: () => (
                <>
                  {!!hasMore && (
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        width: `100%`,
                        height: `50px`,
                      }}
                    >
                      <CircularProgress size="25px" />
                    </Stack>
                  )}
                </>
              ),
            }}
          />
        )}
      </Stack>
    </>
  );
};
