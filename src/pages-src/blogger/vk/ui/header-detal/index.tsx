import { numberShortenCharacrer } from "@/src/shared/lib/number-shorten-character";
import { theme } from "@/src/shared/lib/theme";
import { fakerRU } from "@faker-js/faker";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Avatar, Box, Paper, Stack, Tooltip, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { FC, useMemo } from "react";
import { useGetBloggerMutate } from "../../api/use-blogger";
import { StatElement } from "./stat";

export const HeaderDetal: FC = () => {
  const { data: blogger } = useGetBloggerMutate();
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
  const precentUnsubscribe = useMemo(
    () =>
      blogger?.unsubscribe_perc !== undefined &&
      blogger?.unsubscribe_perc !== null
        ? { value: blogger.unsubscribe_perc.toFixed(2) }
        : null,
    [blogger]
  );
  const communityTopics = useMemo(() => {
    const value = fakerRU.word.words({ count: { min: 5, max: 20 } });
    return value;
  }, [blogger]);
  const location = useMemo(() => {
    const value = fakerRU.location.city();
    return value;
  }, [blogger]);

  if (!blogger) return null;
  return (
    <>
      <Box sx={{ px: `40px`, pt: `15px` }}>
        <Paper sx={{ padding: 1 }}>
          <Grid2 container spacing={`20px`}>
            <Grid2 xs={12} md={12} lg>
              <Stack
                spacing={2}
                sx={{
                  width: `100%`,
                  //  background: `red`
                }}
              >
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
                    src={blogger.image || undefined}
                    variant="rounded"
                    sx={{ height: `90px`, width: `90px`, borderRadius: `15px` }}
                  ></Avatar>
                  <Stack
                    spacing={3}
                    sx={{
                      width: `100%`,
                      //  background: `blue`
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      {!!blogger.title && (
                        <Box
                          sx={{
                            position: `relative`,
                            width: `100%`,
                            maxWidth: `300px`,
                            height: `15px`,
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                              justifyContent: "flex-start",
                              alignItems: "center",
                              position: `absolute`,
                              width: `100%`,
                            }}
                          >
                            {blogger.title && (
                              <Tooltip title={blogger.title}>
                                <Typography
                                  variant="h6"
                                  color={theme.palette.primary.dark}
                                  sx={{
                                    textOverflow: `ellipsis`,
                                    overflow: `hidden`,
                                    whiteSpace: `nowrap`,
                                  }}
                                >{`${blogger.title}`}</Typography>
                              </Tooltip>
                            )}
                            {!blogger.is_confirmed && (
                              <Tooltip title={`Аккаунт подтвержден`}>
                                <CheckCircleRoundedIcon color="primary" />
                              </Tooltip>
                            )}
                          </Stack>
                        </Box>
                      )}
                    </Stack>
                    <Box sx={{ width: `cacl(100% + 20px)` }}>
                      <Grid2
                        container
                        spacing={`20px`}
                        sx={{
                          justifyContent: "flex-start",
                          alignItems: "flex-start",
                        }}
                      >
                        <Grid2 xs={12} md="auto" lg="auto">
                          <Box
                            sx={{
                              position: `relative`,
                              width: { xs: `100%`, md: `100vw`, lg: `100vw` },
                              maxWidth: `145px`,
                              height: `44px`,
                            }}
                          >
                            <Box
                              sx={{
                                position: `absolute`,
                                width: `100%`,
                                maxWidth: `100%`,
                              }}
                            >
                              <Link
                                href={blogger.url}
                                style={{
                                  color: `inherit`,
                                  textDecoration: `inherit`,
                                }}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Box>
                                  <Tooltip title={`@${blogger.id_}`}>
                                    <Typography
                                      sx={{
                                        maxWidth: `100%`,

                                        color: `#2B69D5`,
                                        textOverflow: `ellipsis`,
                                        overflow: `hidden`,
                                        whiteSpace: `nowrap`,
                                        padding: `10px 10px 10px 10px`,
                                        borderRadius: `30px`,
                                        background: `#D9E3F3`,
                                        display: `inline-block`,
                                      }}
                                    >{`@${blogger.id_}`}</Typography>
                                  </Tooltip>
                                </Box>
                              </Link>
                            </Box>
                          </Box>
                        </Grid2>
                        <Grid2 xs={12} md lg>
                          <Box
                            sx={{
                              // background: `red`,
                              width: `100%`,
                            }}
                          >
                            {!!communityTopics && (
                              <Typography
                                sx={{
                                  maxWidth: `400px`,
                                  "& span": {
                                    fontWeight: 800,
                                    color: theme.palette.error.main,
                                  },
                                }}
                              >
                                <span>{`Тематика сообщества: `}</span>
                                {communityTopics}
                              </Typography>
                            )}
                          </Box>
                        </Grid2>
                      </Grid2>
                    </Box>
                  </Stack>
                </Stack>
                <Box>
                  <Paper
                    variant="outlined"
                    sx={{
                      background: `#EDF4FF`,
                      padding: 1,
                      maxWidth: `320px`,
                    }}
                  >
                    <Typography
                      sx={{
                        "& span": {
                          color: theme.palette.primary.light,
                        },
                      }}
                    >
                      <span>{`Подтверждённый аккаунт: `}</span>
                      {!!blogger.is_confirmed ? `ДА` : `НЕТ`}
                    </Typography>
                    <Typography
                      sx={{
                        "& span": {
                          color: theme.palette.error.main,
                        },
                      }}
                    >
                      <span>{`Местоположение: `}</span>
                      {location}
                    </Typography>
                  </Paper>
                </Box>
              </Stack>
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
