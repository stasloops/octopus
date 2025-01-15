import { numberShortenCharacrer } from "@/src/shared/lib/number-shorten-character";
import {
  Avatar,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { FC, useMemo } from "react";
import { IMarketingIntegrations } from "../api/http-get-marketing-integrations";
import { OpenRow } from "./open-row";

interface RowContentProps {
  _index: number;
  row: IMarketingIntegrations;
}

export const RowContent: FC<RowContentProps> = ({ _index, row }) => {
  const likes = useMemo(() => numberShortenCharacrer(row.likes), [row.likes]);
  const comments = useMemo(
    () => numberShortenCharacrer(row.comments),
    [row.comments]
  );
  return (
    <>
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
                <Typography variant="body2">{`Лайки: ${likes.value}`}</Typography>
                <Typography variant="body2">{`Комментарии: ${comments.value}`}</Typography>
              </Stack>
              <Typography variant="body2">{`Хэштеги: ${row.hashtags
                .map((el) => `#${el}`)
                .join(` `)}`}</Typography>
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
            <OpenRow row={row} />
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};
