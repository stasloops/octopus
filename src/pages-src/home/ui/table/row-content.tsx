import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Avatar,
  Box,
  Button,
  Stack,
  SxProps,
  TableCell,
  Typography,
} from "@mui/material";
import { Theme } from "@mui/system";
import Link from "next/link";
import { IBlogger } from "../../api/http-get-blogger";
import { platformList, statusList } from "../../modal/const";
import { SubscribersElement } from "./subscribers-number";

const Text1SX: SxProps<Theme> = {
  fontWeight: 600,
  fontSize: `13px`,
};
const Text2SX: SxProps<Theme> = {
  fontWeight: 400,
  fontSize: `13px`,
  color: `#333333`,
};

export function rowContent(_index: number, row: IBlogger) {
  if (!row) return null;

  const status = statusList.find((elList) => elList.key == row.status);
  const platform = platformList.find(
    (elList) => elList.key == row.platform_code
  );
  return (
    <>
      <TableCell sx={{ height: `74px` }}>
        {/* <Link href={row.avatar} target="_blank" rel="noopener noreferrer">
          <Avatar alt={row.name} src={row.avatar} />
        </Link> */}
        <Link href={row.url} target="_blank" rel="noopener noreferrer">
          <Avatar></Avatar>
        </Link>
      </TableCell>
      <TableCell>
        <Stack
          direction="column"
          spacing={`4px`}
          sx={{
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {row.title && (
            <Typography sx={{ ...Text1SX }}>{`${row.title}`}</Typography>
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
      <TableCell>
        <Link
          href={row.url}
          style={{ color: `inherit`, textDecoration: `inherit` }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Box>
            <Typography
              sx={{
                textOverflow: `ellipsis`,
                overflow: `hidden`,
                whiteSpace: `nowrap`,
                maxWidth: `145px`,

                color: `#2B69D5`,
                ...Text1SX,
                padding: `8px 10px 10px 10px`,
                borderRadius: `30px`,
                background: `#D9E3F3`,
                display: `inline-block`,
              }}
            >{`@${row.url}`}</Typography>
          </Box>
        </Link>
      </TableCell>
      <TableCell>
        {status && <Typography sx={{ ...Text2SX }}>{status.label}</Typography>}
      </TableCell>
      <TableCell>
        {/* <Typography sx={{ ...Text2SX }}>{row.country}</Typography> */}
      </TableCell>
      <TableCell>
        {/* <Typography sx={{ ...Text2SX }}>{row.city}</Typography> */}
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIcon />}
          sx={{ borderRadius: `20px` }}
        >
          Отчет
        </Button>
      </TableCell>
    </>
  );
}
