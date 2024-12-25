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
import { FC, useEffect, useMemo, useState } from "react";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";
import { useCloseAll } from "../../model/store";
import { StatElement } from "./stat";

export const Posts: FC = () => {
  const { data: blogger } = useGetBloggerMutateStats();
  const [open, setOpen] = useState<boolean>(false);

  const onChangeOpen = () => {
    setOpen(!open);
  };

  const close = useCloseAll((state) => state.value);
  useEffect(() => {
    setOpen(false);
  }, [close]);

  const param1 = useMemo(() => {
    if (!blogger?.posts_counters) return null;
    const value = blogger.posts_counters.views || 0;
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param2 = useMemo(() => {
    if (!blogger?.posts_counters) return null;
    const value = blogger.posts_counters.likes || 0;
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param3 = useMemo(() => {
    if (!blogger?.posts_counters) return null;
    const value = blogger.posts_counters.comments || 0;
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param4 = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 5000000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param5 = useMemo(() => {
    if (!blogger?.posts_counters) return null;
    const value = blogger.posts_counters.reposts || 0;
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param6 = useMemo(() => {
    if (!blogger?.posts_counters) return null;
    const value = blogger.posts_counters.views_12_avg || 0;
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param7 = useMemo(() => {
    if (!blogger?.posts_counters) return null;
    const value = blogger.posts_counters.likes_12_avg || 0;
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param8 = useMemo(() => {
    if (!blogger?.posts_counters) return null;
    const value = blogger.posts_counters.comments_12_avg || 0;
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param9 = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 5000000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const param10 = useMemo(() => {
    if (!blogger?.posts_counters) return null;
    const value = blogger.posts_counters.reposts_12_avg || 0;
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);

  if (!blogger) return null;
  return (
    <Paper>
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
          <Typography variant="h6">ПОСТЫ</Typography>
          {!open && <ArrowDropDownIcon />}
          {!!open && <ArrowDropUpIcon />}
        </Stack>
      </ButtonBase>
      <Collapse in={open}>
        <Box sx={{ width: `cacl(100% + 20px)`, padding: 1 }}>
          <Grid2 container spacing={`20px`}>
            {!!param1 && (
              <StatElement
                label="Кол-во просмотров постов"
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
                label="Кол-во лайков к постам"
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
                label="Кол-во сообщений в посте"
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
                label="Кол-во комментариев к одному сообщению в посте"
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
                label="Кол-во репостов обычного поста"
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
                label="Средний охват в 12 последних постах"
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
                label="Среднее количество лайков в 12 последних постах"
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
                label="Среднее количество комментариев на последних 12 постах"
                value={
                  <Tooltip title={param8.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param8.value}</Typography>
                  </Tooltip>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param9 && (
              <StatElement
                error
                label="Среднее количество комментариев к одному сообщению на последних 12 постах"
                value={
                  <Tooltip title={param9.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param9.value}</Typography>
                  </Tooltip>
                }
                icon2={<OndemandVideoIcon />}
                icon3={<VisibilityOutlinedIcon />}
              />
            )}
            {!!param10 && (
              <StatElement
                label="Среднее количество репостов постов за последние 12 постов"
                value={
                  <Tooltip title={param10.origin.toLocaleString("ru-RU")}>
                    <Typography variant="h6">{param10.value}</Typography>
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
