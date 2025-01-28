import { numberShortenCharacrer } from "@/shared/lib/number-shorten-character";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import UnsubscribeOutlinedIcon from "@mui/icons-material/UnsubscribeOutlined";
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
  const countPost = useMemo(
    () =>
      blogger?.posts !== undefined && blogger?.posts !== null
        ? numberShortenCharacrer(blogger.posts)
        : null,
    [blogger]
  );
  const precentUnsubscribe = useMemo(
    () =>
      blogger?.unsubscribe_perc !== undefined &&
      blogger?.unsubscribe_perc !== null
        ? { value: blogger.unsubscribe_perc.toFixed(2) }
        : null,
    [blogger]
  );
  const communityTopics = useMemo(
    () =>
      blogger?.theme !== undefined && blogger?.theme !== null
        ? blogger?.theme
        : null,
    [blogger]
  );
  const location = useMemo(
    () =>
      blogger?.location !== undefined && blogger?.location !== null
        ? blogger?.location
        : null,
    [blogger]
  );

  if (!blogger) return null;
  return (
    <>
      <Box
        sx={{
          px: { xs: `20px`, md: `38px`, lg: `38px` },
          pt: `28px`,
        }}
      >
        <Paper
          sx={{
            position: `relative`,
            padding: `23.5px`,
            borderRadius: `20px`,
            height: { xs: null, md: null, lg: `232px` },
            background: `linear-gradient(90.14deg, #2B3ABB 2.96%, #70D2F8 171.19%)`,
          }}
        >
          <Box sx={{ width: `100%`, height: `100%` }}>
            <Grid2
              sx={{
                height: `100%`,
                justifyContent: {
                  xs: `flex-start`,
                  md: `center`,
                  lg: `center`,
                },
                alignItems: {
                  xs: `flex-start`,
                  md: `center`,
                  lg: `center`,
                },
              }}
              container
              columnSpacing={`47px`}
              rowSpacing={{ xs: `40px`, md: `40px`, lg: null }}
              // spacing={`47px`}
            >
              <Grid2 xs={12} md lg>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    width: `100%`,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Avatar
                    alt="avatar"
                    src={blogger.image || undefined}
                    variant="rounded"
                    sx={{ height: `90px`, width: `90px`, borderRadius: `20px` }}
                  ></Avatar>
                  <Stack
                    spacing={`23px`}
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
                                  sx={{
                                    textOverflow: `ellipsis`,
                                    overflow: `hidden`,
                                    whiteSpace: `nowrap`,
                                    fontWeight: `600`,
                                    fontSize: `20px`,
                                    color: `#FFFFFF`,
                                  }}
                                >{`${blogger.title}`}</Typography>
                              </Tooltip>
                            )}
                            {!!blogger.is_confirmed && (
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

                                        fontWeight: `600`,
                                        fontSize: `14px`,
                                      }}
                                    >{`@${blogger.id_}`}</Typography>
                                  </Tooltip>
                                </Box>
                              </Link>
                            </Box>
                          </Box>
                        </Grid2>
                      </Grid2>
                    </Box>
                  </Stack>
                </Stack>
              </Grid2>
              <Grid2 xs={12} md lg>
                <Box sx={{ width: `100%` }}>
                  <Stack spacing="12px">
                    {!!communityTopics && (
                      <Box>
                        <Typography
                          sx={{
                            "& span": {
                              color: `#fff`,
                              fontWeight: 800,
                            },
                            fontWeight: 600,
                            color: `#B5CDEF`,
                          }}
                        >
                          <span>{`Тематика сообщества: `}</span>
                          {communityTopics}
                        </Typography>
                      </Box>
                    )}
                    <Typography
                      sx={{
                        "& span": {
                          color: `#fff`,
                          fontWeight: 500,
                        },
                        fontWeight: 600,
                        color: `#B5CDEF`,
                      }}
                    >
                      <span>{`Подтверждённый аккаунт: `}</span>
                      {!!blogger.is_confirmed ? `да` : `нет`}
                    </Typography>
                    <Typography
                      sx={{
                        "& span": {
                          color: `#fff`,
                          fontWeight: 500,
                        },
                        fontWeight: 600,
                        color: `#B5CDEF`,
                      }}
                    >
                      <span>{`Местоположение: `}</span>
                      {location}
                    </Typography>
                  </Stack>
                </Box>
              </Grid2>
              <Grid2 xs={12} md={12} lg="auto">
                <Box>
                  <Grid2
                    container
                    columnSpacing="21px"
                    sx={{
                      justifyContent: `center`,
                      alignItems: `center`,
                    }}
                  >
                    {!!subscribers && (
                      <StatElement
                        icon={
                          <PeopleAltOutlinedIcon
                            sx={{
                              height: `70px`,
                              width: `77px`,
                              color: `#EFFCFC`,
                            }}
                          />
                        }
                        label="подписки"
                        value={
                          <Tooltip
                            title={subscribers.origin.toLocaleString("ru-RU")}
                          >
                            <Typography
                              align="center"
                              sx={{
                                fontWeight: `500`,
                                fontSize: `16px`,
                                color: `#FFFFFF`,
                              }}
                            >
                              {subscribers.value}
                            </Typography>
                          </Tooltip>
                        }
                      />
                    )}
                    {!!countPost && (
                      <StatElement
                        icon={
                          <ChromeReaderModeOutlinedIcon
                            sx={{
                              height: `70px`,
                              width: `77px`,
                              color: `#EFFCFC`,
                            }}
                          />
                        }
                        label="посты"
                        value={
                          <Tooltip
                            title={countPost.origin.toLocaleString("ru-RU")}
                          >
                            <Typography
                              sx={{
                                fontWeight: `500`,
                                fontSize: `16px`,
                                color: `#FFFFFF`,
                              }}
                            >
                              {countPost.value}
                            </Typography>
                          </Tooltip>
                        }
                      />
                    )}
                    {!!er && (
                      <StatElement
                        icon={
                          <TrendingUpOutlinedIcon
                            sx={{
                              height: `70px`,
                              width: `77px`,
                              color: `#EFFCFC`,
                            }}
                          />
                        }
                        label="ER"
                        value={
                          <Typography
                            sx={{
                              fontWeight: `500`,
                              fontSize: `16px`,
                              color: `#FFFFFF`,
                            }}
                          >
                            {er.value}%
                          </Typography>
                        }
                      />
                    )}
                    {!!precentUnsubscribe && (
                      <StatElement
                        icon={
                          <UnsubscribeOutlinedIcon
                            sx={{
                              height: `70px`,
                              width: `77px`,
                              color: `#EFFCFC`,
                            }}
                          />
                        }
                        label="отписки"
                        value={
                          <Typography
                            sx={{
                              fontWeight: `500`,
                              fontSize: `16px`,
                              color: `#FFFFFF`,
                            }}
                          >
                            {precentUnsubscribe.value}%
                          </Typography>
                        }
                      />
                    )}
                  </Grid2>
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        </Paper>
      </Box>
    </>
  );
};
