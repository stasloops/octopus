import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Avatar,
  Box,
  Button,
  Stack,
  SxProps,
  TableCell,
  Tooltip,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/system";
import Link from "next/link";
import { IBlogger } from "../../api/http-get-blogger";
import { platformList } from "../../model/const";
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
        <Link href={row.url} target="_blank" rel="noopener noreferrer">
          <Avatar></Avatar>
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
                sx={{ ...Text1SX, maxWidth: `100%` }}
              >{`${row.title}`}</Typography>
            </Tooltip>
          )}
          <Stack
            direction="row"
            spacing={`5px`}
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
        <Link
          href={row.url}
          style={{ color: `inherit`, textDecoration: `inherit` }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Box>
            <Tooltip title={`@${row.id_}`}>
              <Typography
                sx={{
                  maxWidth: `145px`,

                  color: `#2B69D5`,
                  ...Text1SX,
                  padding: `8px 10px 10px 10px`,
                  borderRadius: `30px`,
                  background: `#D9E3F3`,
                  display: `inline-block`,
                }}
              >{`@${row.id_}`}</Typography>
            </Tooltip>
          </Box>
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
      >{`${row.er.toFixed(1)}%`}</TableCell>
      <TableCell
        sx={{
          display: {
            xs: `none`,
            md: `table-cell`,
            lg: `table-cell`,
          },
        }}
        align="right"
      >
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          sx={{ borderRadius: `20px` }}
        >
          Отчет
        </Button>
      </TableCell>
      <TableCell
        sx={{
          display: {
            xs: `table-cell`,
            md: `none`,
            lg: `none`,
          },
          height: `180px`,
        }}
      >
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Link href={row.url} target="_blank" rel="noopener noreferrer">
              <Avatar></Avatar>
            </Link>
            <Stack
              direction="column"
              spacing={`4px`}
              sx={{
                justifyContent: "center",
                alignItems: "flex-start",
                width: `100%`,
              }}
            >
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
                        sx={{ ...Text1SX, maxWidth: `100%` }}
                      >{`${row.title}`}</Typography>
                    </Tooltip>
                  )}
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
          </Stack>
          <Stack spacing={1}>
            {row.er && <Typography>{`ER: ${row.er.toFixed(1)}%`}</Typography>}
          </Stack>
          <Box>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: `20px` }}
            >
              Отчет
            </Button>
          </Box>
        </Stack>
      </TableCell>
    </>
  );
}
