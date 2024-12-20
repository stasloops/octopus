import { numberShortenCharacrer } from "@/src/shared/lib/number-shorten-character";
import { fakerRU } from "@faker-js/faker";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import {
  Box,
  ButtonBase,
  Collapse,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useMemo, useState } from "react";
import { useBloggerStore } from "../../model/store";
import { StatElement } from "./stat";

export const VideoClips: FC = () => {
  const blogger = useBloggerStore((state) => state.value);
  const [open, setOpen] = useState<boolean>(false);

  const onChangeOpen = () => {
    setOpen(!open);
  };

  const param1 = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 5000000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param2 = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 5000000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param3 = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 5000000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param4 = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 5000000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param5 = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 5000000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param6 = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 5000000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param7 = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 5000000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param8 = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 5000000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);

  if (!blogger) return null;
  return (
    <Paper elevation={3}>
      <ButtonBase onClick={onChangeOpen} sx={{ width: `100%` }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            justifyContent: "start",
            alignItems: "center",
            padding: 1,
            width: `100%`,
          }}
        >
          <Typography variant="h6">ВИДЕОКЛИПЫ</Typography>
          {!open && <ArrowDropDownIcon />}
          {!!open && <ArrowDropUpIcon />}
        </Stack>
      </ButtonBase>
      <Collapse in={open}>
        <Box sx={{ width: `cacl(100% + 20px)`, padding: 1 }}>
          <Grid2 container spacing={`20px`}>
            {!!param1 && (
              <StatElement
                error
                label="Кол-во просмотров в видео"
                value={
                  <Tooltip title={param1.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param1.value}</Typography>
                  </Tooltip>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param2 && (
              <StatElement
                error
                label="Кол-во лайков в видео"
                value={
                  <Tooltip title={param2.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param2.value}</Typography>
                  </Tooltip>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param3 && (
              <StatElement
                error
                label="Кол-во сообщений в видеопостах"
                value={
                  <Tooltip title={param3.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param3.value}</Typography>
                  </Tooltip>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param4 && (
              <StatElement
                error
                label="Кол-во комментариев к одному сообщению в видео"
                value={
                  <Tooltip title={param4.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param4.value}</Typography>
                  </Tooltip>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param5 && (
              <StatElement
                error
                label="Среднее количество лайков на видео"
                value={
                  <Tooltip title={param5.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param5.value}</Typography>
                  </Tooltip>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param6 && (
              <StatElement
                error
                label="Среднее количество комментариев на последних 12 видео"
                value={
                  <Tooltip title={param6.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param6.value}</Typography>
                  </Tooltip>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param7 && (
              <StatElement
                error
                label="Среднее количество комментариев к одному сообщению на последних 12 видео"
                value={
                  <Tooltip title={param7.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param7.value}</Typography>
                  </Tooltip>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param8 && (
              <StatElement
                error
                label="Среднее количество просмотров на последние 12 видео"
                value={
                  <Tooltip title={param8.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param8.value}</Typography>
                  </Tooltip>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
          </Grid2>
        </Box>
      </Collapse>
    </Paper>
  );
};
