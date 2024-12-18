import { numberShortenCharacrer } from "@/src/shared/lib/number-shorten-character";
import { fakerRU } from "@faker-js/faker";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useMemo } from "react";
import { useBloggerStore } from "../../model/store";
import { StatElement } from "./stat";

export const HeaderDetal: FC = () => {
  const blogger = useBloggerStore((state) => state.value);
  const subscribers = useMemo(
    () =>
      blogger?.subscribers !== undefined && blogger?.subscribers !== null
        ? numberShortenCharacrer(blogger.subscribers)
        : null,
    [blogger]
  );
  const er = useMemo(
    () =>
      blogger?.er !== undefined && blogger?.er !== null
        ? { value: blogger.er.toFixed(2) }
        : null,
    [blogger]
  );
  const countSubscribers = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 1000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const countPost = useMemo(() => {
    const value = fakerRU.number.int({ min: 10, max: 3000 });
    const shorten = numberShortenCharacrer(value);
    return shorten;
  }, [blogger]);
  const precentUnsubscribe = useMemo(() => {
    const value = fakerRU.number.float({ min: 0.01, max: 100.0 });
    return { value: value.toFixed(2) };
  }, [blogger]);

  return (
    <>
      <Box sx={{ px: `40px`, pt: `15px` }}>
        <Paper elevation={3} sx={{ padding: 1 }}>
          <Grid2 container spacing={`20px`}>
            <Grid2 xs={12} md={12} lg>
              <Box
                sx={{ height: `200px`, width: `100%`, background: `red` }}
              ></Box>
            </Grid2>
            <Grid2 xs={12} md={12} lg={`auto`}>
              <Grid2
                container
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                {!!subscribers && (
                  <StatElement
                    icon={<PeopleAltOutlinedIcon fontSize="large" />}
                    label="Кол-во подписчиков в сообществе автора"
                    value={
                      <Tooltip
                        title={subscribers.origin.toLocaleString("ru-RU")}
                      >
                        <Typography align="center" variant="h6">
                          {subscribers.value}
                        </Typography>
                      </Tooltip>
                    }
                  />
                )}
                {!!countSubscribers && (
                  <StatElement
                    error
                    icon={<PeopleAltOutlinedIcon fontSize="large" />}
                    label="Кол-во подписок"
                    value={
                      <Tooltip
                        title={countSubscribers.origin.toLocaleString("ru-RU")}
                      >
                        <Typography align="center" variant="h6">
                          {countSubscribers.value}
                        </Typography>
                      </Tooltip>
                    }
                  />
                )}
                {!!countPost && (
                  <StatElement
                    error
                    icon={<PeopleAltOutlinedIcon fontSize="large" />}
                    label="Кол-во постов"
                    value={
                      <Tooltip title={countPost.origin.toLocaleString("ru-RU")}>
                        <Typography align="center" variant="h6">
                          {countPost.value}
                        </Typography>
                      </Tooltip>
                    }
                  />
                )}
                {!!er && (
                  <StatElement
                    icon={<PeopleAltOutlinedIcon fontSize="large" />}
                    label="ER сообщества"
                    value={
                      <Typography align="center" variant="h6">
                        {er.value}%
                      </Typography>
                    }
                  />
                )}
                {!!precentUnsubscribe && (
                  <StatElement
                    error
                    icon={<PeopleAltOutlinedIcon fontSize="large" />}
                    label="Процент отписок"
                    value={
                      <Typography align="center" variant="h6">
                        {precentUnsubscribe.value}%
                      </Typography>
                    }
                  />
                )}
              </Grid2>
            </Grid2>
          </Grid2>
        </Paper>
      </Box>
    </>
  );
};
