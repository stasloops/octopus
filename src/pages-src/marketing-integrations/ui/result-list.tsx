import { Avatar, Button, Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { Virtuoso } from "react-virtuoso";
import { useMarketingTableStore } from "../model/store";

export const ResultList: FC = () => {
  const marketingTable = useMarketingTableStore((state) => state.value);

  return (
    <>
      {!!marketingTable && (
        <Virtuoso
          useWindowScroll
          allowFullScreen
          style={{ height: 400 }}
          data={marketingTable.data}
          itemContent={(_, row) => (
            <Paper sx={{ padding: 2, mx: `40px`, mt: `20px` }}>
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Avatar
                    alt="avatar"
                    src={row.avatar || undefined}
                    sx={{ height: `50px`, width: `50px` }}
                  ></Avatar>
                  <Stack spacing={1}>
                    <Stack
                      direction={{ xs: "column", md: "row", lg: "row" }}
                      spacing={{ xs: 1, md: 3, lg: 4 }}
                      sx={{
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography variant="body2">{`Рекламодатели: ${row.name}`}</Typography>
                      <Typography variant="body2">{`Лайки: ${row.likes}`}</Typography>
                      <Typography variant="body2">{`Комментарии: ${row.comments}`}</Typography>
                    </Stack>
                    <Typography variant="body2">{`Хэштеги: ${row.hashtags.join(
                      `, `
                    )}`}</Typography>
                  </Stack>
                </Stack>

                <Stack
                  direction={{ xs: "column", md: "row", lg: "row" }}
                  spacing={2}
                  sx={{
                    justifyContent: {
                      xs: "center",
                      md: "space-between",
                      lg: "space-between",
                    },
                    alignItems: {
                      xs: "flex-start",
                      md: "flex-end",
                      lg: "flex-end",
                    },
                  }}
                >
                  <Typography variant="body2">{row.text}</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                      borderRadius: `20px`,
                      whiteSpace: `nowrap`,
                      flexShrink: 0,
                    }}
                  >
                    Открыть отчёт
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          )}
        />
      )}
    </>
  );
};
