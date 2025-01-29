import { IBlogger } from "@/shared/api/blogger/model";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {
  Avatar,
  Box,
  Stack,
  SxProps,
  TableCell,
  Tooltip,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/system";
import Link from "next/link";
import { platformList } from "../../model/const";
import { CheckElement } from "./check-element";
import { RowNumberElement } from "./row-number-element";
import { SubscribersElement } from "./subscribers-number";

const Text1SX: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: `13px`,
  textOverflow: `ellipsis`,
  overflow: `hidden`,
  whiteSpace: `nowrap`,
};
const Text2SX: SxProps<Theme> = {
  fontWeight: 400,
  fontSize: `13px`,
  color: `#333333`,
};

export function rowContent(_index: number, row: IBlogger) {
  if (!row) return null;

  const platform = platformList.find(
    (elList) => elList.key == row.platform_code
  );

  return (
    <>
      <TableCell
        sx={{
          height: `74px`,
          display: {
            xs: `none`,
            md: `table-cell`,
            lg: `table-cell`,
          },
        }}
      >
        <CheckElement row={row} />
      </TableCell>
      <TableCell
        sx={{
          height: `74px`,
          display: {
            xs: `none`,
            md: `table-cell`,
            lg: `table-cell`,
          },
        }}
      >
        <Link href={row.url} target="_blank" rel="noopener noreferrer">
          <Avatar alt="avatar" src={row.image || undefined}></Avatar>
        </Link>
      </TableCell>
      <TableCell
        sx={{
          display: {
            xs: `none`,
            md: `table-cell`,
            lg: `table-cell`,
          },
        }}
      >
        <Stack
          direction="column"
          spacing={`4px`}
          sx={{
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {row.title && (
            <Tooltip title={row.title}>
              <Typography
                sx={{ ...Text1SX, maxWidth: `100%`, color: `#222657` }}
              >{`${row.title}`}</Typography>
            </Tooltip>
          )}
          <Stack
            direction="row"
            spacing={`7px`}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {!!platform && (
              <Link href={row.url} target="_blank" rel="noopener noreferrer">
                <Box
                  sx={{
                    overflow: `hidden`,
                    borderRadius: `10px`,
                    width: `18px`,
                    height: `18px`,
                  }}
                >
                  <img
                    src={platform.src}
                    alt="platform"
                    style={{
                      objectFit: `contain`,
                      width: `18px`,
                      height: `18px`,
                      // pointerEvents: `none`,
                    }}
                  />
                </Box>
              </Link>
            )}
            {row.subscribers !== undefined && row.subscribers !== null && (
              <SubscribersElement value={row.subscribers} />
            )}
          </Stack>
        </Stack>
      </TableCell>
      <TableCell
        sx={{
          display: {
            xs: `none`,
            md: `table-cell`,
            lg: `table-cell`,
          },
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
                href={row.url}
                style={{
                  color: `inherit`,
                  textDecoration: `inherit`,
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box>
                  <Tooltip title={`@${row.id_}`}>
                    <Typography
                      sx={{
                        maxWidth: `100%`,

                        color: `#2B69D5`,
                        ...Text1SX,

                        padding: `10px 10px 10px 10px`,
                        borderRadius: `30px`,
                        background: `#D9E3F3`,
                        display: `inline-block`,
                      }}
                    >{`@${row.id_}`}</Typography>
                  </Tooltip>
                </Box>
              </Link>
            </Box>
          </Box>
          {!!row.is_confirmed && (
            <Tooltip title={`Аккаунт подтвержден`}>
              <Box sx={{ pb: `1px` }}>
                <CheckCircleRoundedIcon sx={{ color: `#B5CDEF` }} />
              </Box>
            </Tooltip>
          )}
        </Stack>
      </TableCell>
      <TableCell
        sx={{
          display: {
            xs: `none`,
            md: `table-cell`,
            lg: `table-cell`,
          },
        }}
      >
        <RowNumberElement value={row.subscribers} />
      </TableCell>
      <TableCell
        sx={{
          display: {
            xs: `none`,
            md: `table-cell`,
            lg: `table-cell`,
          },
          color: `#2B3A8B`,
          fontSize: `14px`,
          fontWeight: 600,
        }}
      >{`${row.er.toFixed(1)}%`}</TableCell>
      <TableCell
        sx={{
          display: {
            xs: `none`,
            md: `table-cell`,
            lg: `table-cell`,
          },
          color: `#2B3A8B`,
          fontSize: `14px`,
          fontWeight: 600,
        }}
      >
        {/* Качество аудитории */}
      </TableCell>
      <TableCell
        sx={{
          display: {
            xs: `table-cell`,
            md: `none`,
            lg: `none`,
          },
        }}
      >
        <CheckElement row={row} />
      </TableCell>
      <TableCell
        sx={{
          height: `120px`,
          display: {
            xs: `table-cell`,
            md: `none`,
            lg: `none`,
          },
        }}
      >
        <Stack spacing={`16px`}>
          <Stack direction="row" spacing={`4px`}>
            <Link href={row.url} target="_blank" rel="noopener noreferrer">
              <Avatar
                alt="avatar"
                src={row.image || undefined}
                sx={{ width: `54px`, height: `54px` }}
              ></Avatar>
            </Link>
            <Stack
              direction="column"
              spacing={`10px`}
              sx={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: `100%`,
              }}
            >
              <Box
                sx={{
                  position: `relative`,
                  width: { xs: `100%`, md: `100vw`, lg: `100vw` },
                  maxWidth: `145px`,
                  height: `26px`,
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
                    href={row.url}
                    style={{
                      color: `inherit`,
                      textDecoration: `inherit`,
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Box>
                      <Tooltip title={`@${row.id_}`}>
                        <Typography
                          sx={{
                            maxWidth: `100%`,

                            color: `#2B69D5`,
                            ...Text1SX,
                            fontSize: `9px`,
                            fontWeight: 600,
                            padding: `5px 9px 5px 9px`,
                            borderRadius: `30px`,
                            background: `#D9E3F3`,
                            display: `inline-block`,
                          }}
                        >{`@${row.id_}`}</Typography>
                      </Tooltip>
                    </Box>
                  </Link>
                </Box>
              </Box>
              <Stack
                direction="row"
                spacing={`5px`}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!!platform && (
                  <Link
                    href={row.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Box
                      sx={{
                        position: `relative`,
                        overflow: `hidden`,
                        borderRadius: `10px`,
                        width: `12px`,
                        height: `12px`,
                      }}
                    >
                      <img
                        src={platform.src}
                        alt="platform"
                        style={{
                          position: `absolute`,
                          objectFit: `contain`,
                          width: `12px`,
                          height: `12px`,
                          // pointerEvents: `none`,
                        }}
                      />
                    </Box>
                  </Link>
                )}
                {row.subscribers !== undefined && row.subscribers !== null && (
                  <SubscribersElement value={row.subscribers} />
                )}
              </Stack>
            </Stack>
          </Stack>
          <Box
            sx={{
              position: `relative`,
              width: `100%`,
              height: `15px`,
            }}
          >
            <Box
              sx={{
                position: `absolute`,
                width: `100%`,
              }}
            >
              {row.title && (
                <Tooltip title={row.title}>
                  <Typography
                    sx={{
                      color: `#222657`,
                      fontSize: `9px`,
                      fontWeight: 600,
                      maxWidth: `100%`,
                    }}
                  >{`${row.title}`}</Typography>
                </Tooltip>
              )}
            </Box>
          </Box>
        </Stack>
      </TableCell>
      <TableCell
        sx={{
          display: {
            xs: `table-cell`,
            md: `none`,
            lg: `none`,
          },
        }}
      ></TableCell>
      <TableCell
        sx={{
          height: `120px`,
          display: {
            xs: `table-cell`,
            md: `none`,
            lg: `none`,
          },
          color: `#2B3A8B`,
          fontSize: `14px`,
          fontWeight: 600,
        }}
      >{`${row.er.toFixed(1)}%`}</TableCell>
      <TableCell
        sx={{
          display: {
            xs: `table-cell`,
            md: `none`,
            lg: `none`,

            color: `#2B3A8B`,
            fontSize: `14px`,
            fontWeight: 600,
          },
        }}
      >
        {/* Качество аудитории */}
      </TableCell>
      <TableCell
        sx={{
          height: `120px`,
          display: {
            xs: `table-cell`,
            md: `none`,
            lg: `none`,
          },
        }}
      ></TableCell>
    </>
  );
}
