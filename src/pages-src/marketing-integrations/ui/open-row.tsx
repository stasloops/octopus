import { numberShortenCharacrer } from "@/src/shared/lib/number-shorten-character";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { FC, useMemo, useState } from "react";
import { IMarketingIntegrations } from "../api/http-get-marketing-integrations";

interface OpenRowProps {
  row: IMarketingIntegrations;
}

export const OpenRow: FC<OpenRowProps> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const param1 = useMemo(() => {
    if (row.subscribers === undefined || row.subscribers === null) return null;
    const value = row.subscribers || 0;
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [row]);

  const param2 = useMemo(() => {
    if (row.likes === undefined || row.likes === null) return null;
    const value = row.likes || 0;
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [row]);
  const param3 = useMemo(() => {
    if (row.comments === undefined || row.comments === null) return null;
    const value = row.comments || 0;
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [row]);

  const param4 = useMemo(() => {
    if (row.er1 === undefined || row.er1 === null) return null;
    const value = row.er1 || 0;
    return { value: value.toFixed(2) };
  }, [row]);
  const param5 = useMemo(() => {
    if (row.er2 === undefined || row.er2 === null) return null;
    const value = row.er2 || 0;
    return { value: value.toFixed(2) };
  }, [row]);
  const param6 = useMemo(() => {
    if (row.er3 === undefined || row.er3 === null) return null;
    const value = row.er3 || 0;
    return { value: value.toFixed(2) };
  }, [row]);

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        sx={{
          borderRadius: `20px`,
          whiteSpace: `nowrap`,
          flexShrink: 0,
        }}
        onClick={handleClickOpen}
      >
        Открыть отчёт
      </Button>

      {!!open && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Отчет"}</DialogTitle>
          <DialogContent>
            <Stack
              spacing={2}
              sx={{
                my: 1,
                width: { xs: `100%`, md: `500px`, lg: `500px` },
              }}
            >
              <TextField
                fullWidth
                label="Пост"
                multiline
                maxRows={5}
                minRows={3}
                variant="outlined"
                value={row.text}
              />
              {!!param1 && (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">
                    Кол-во подписчиков (на момент выхода рекламы)
                  </Typography>
                  <Tooltip title={param1.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param1.value}</Typography>
                  </Tooltip>
                </Stack>
              )}
              {!!param2 && (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">Кол-во лайков</Typography>
                  <Tooltip title={param2.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param2.value}</Typography>
                  </Tooltip>
                </Stack>
              )}
              {!!param3 && (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">Кол-во комментариев</Typography>
                  <Tooltip title={param3.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param3.value}</Typography>
                  </Tooltip>
                </Stack>
              )}
              {!!param4 && (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">ER поста</Typography>

                  <Typography variant="h6">{param4.value}%</Typography>
                </Stack>
              )}
              {!!param5 && (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">ER аудитории</Typography>
                  <Typography variant="h6">{param5.value}%</Typography>
                </Stack>
              )}
              {!!param6 && (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2">Разница ER</Typography>

                  <Typography variant="h6">{param6.value}%</Typography>
                </Stack>
              )}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Закрыть</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
