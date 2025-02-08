import {IBlogger} from "@/shared/api/blogger/model";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import {Avatar, Box, Button, Checkbox, Stack, SxProps, TableCell, Tooltip, Typography,} from "@mui/material";
import {Theme} from "@mui/system";
import Link from "next/link";
import {OpenDescription} from "./open-description";
import {SubscribersElement} from "./subscribers-number";
import {platformList} from "@/entities/bloger/model/const";
import {useSelectedBloggers} from "@/widgets/table/model/selected-bloggers-store";
import {useBloggerTableStore} from "@/entities/bloger/model/store";

const Text1SX: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: `13px`,
  textOverflow: `ellipsis`,
  overflow: `hidden`,
  whiteSpace: `nowrap`,
};

export function RowContentComponent({ row }: { row: IBlogger }) {
  const { toggleSelection, isBloggerSelected } = useSelectedBloggers();
  const { selectable } = useBloggerTableStore();

  const isSelected = isBloggerSelected(row.id);

  if (!row) return null;

  const platform = platformList.find(
    (elList) => elList.key == row.platform_code
  );

  return (
    <>
      {selectable && (
        <TableCell padding="checkbox"
                   sx={{
                     height: `74px`,
                     display: {
                       xs: `none`,
                       md: `table-cell`,
                       lg: `table-cell`,
                     },
                   }}>
          <Checkbox
            checked={isSelected}
            onChange={() => {
              toggleSelection({id: row.id, name: row.title});
            }}
          />
        </TableCell>
      )}
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
        <OpenDescription row={row} />
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
          color: `#2B3A8B`,
          fontSize: `14px`,
          fontWeight: 600,
        }}
      >{`${row.er.toFixed(1)}%`}</TableCell>


      <TableCell
          sx={{}}
          align="right"
      >
        {!selectable &&
        <Link href={`/blogger/vk/${row.id}`}>
            <Button
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                sx={{ borderRadius: `20px` }}
            >
                Отчет
            </Button>
        </Link>
        }
      </TableCell>
      <TableCell
        sx={{
          height: `170px`,
          display: {
            xs: `table-cell`,
            md: `none`,
            lg: `none`,
          },
          pb: `65px`,
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

        <Box sx={{ position: `absolute`, bottom: `13px`, right: 0, left: 0 }}>
          <Stack spacing={2}>
              <Box>
                {!selectable &&
                  <Link href={`/blogger/vk/${row.id}`}>
                      <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          endIcon={<ArrowForwardIcon />}
                          sx={{ borderRadius: `20px` }}
                      >
                          Отчет
                      </Button>
                  </Link>
                }
              </Box>
          </Stack>
      </Box>

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
          height: `170px`,
          display: {
            xs: `table-cell`,
            md: `none`,
            lg: `none`,
          },
          color: `#2B3A8B`,
          fontSize: `14px`,
          fontWeight: 600,
          pb: `65px`,
        }}
      >{`${row.er.toFixed(1)}%`}</TableCell>
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
          height: `170px`,
          display: {
            xs: `table-cell`,
            md: `none`,
            lg: `none`,
          },
          pb: `65px`,
        }}
      >
        <OpenDescription row={row} />
      </TableCell>
      <TableCell sx={{}}></TableCell>
    </>
  );
}

export function RowContent(_: number, row: IBlogger) {
  return <RowContentComponent key={row.id_} row={row} />;
}
