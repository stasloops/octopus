import { theme } from "@/shared/lib/theme";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useMemo } from "react";
import { useGetBloggerMutate } from "../../api/use-blogger";

export const ExternalLinks: FC = () => {
  const { data: blogger } = useGetBloggerMutate();
  const externalLinks = useMemo(
    () =>
      blogger?.external_links !== undefined && blogger?.external_links !== null
        ? blogger.external_links
        : null,
    [blogger]
  );

  return (
    <>
      {!!externalLinks?.length && (
        <Grid2 xs={12} md={4} lg={3}>
          <Paper
            sx={{
              position: `relative`,
              width: `100%`,
              padding: `17px 9px`,
              color: theme.palette.white.main,
              background: `linear-gradient(to bottom right, #3d84de, #62bcf1)`,
              borderRadius: `20px`,
            }}
          >
            <IconButton
              sx={{ position: `absolute`, top: `10px`, right: `0px` }}
            >
              <MoreVertIcon color="white" />
            </IconButton>
            <Stack spacing={1}>
              <Typography>{`Ссылки на другие соц. сети`}</Typography>
              {externalLinks.map((el, index) => (
                <Button
                  key={index}
                  fullWidth
                  variant="outlined"
                  startIcon={<InsertLinkOutlinedIcon />}
                  color="white"
                  sx={{
                    maxWidth: `100%`,
                  }}
                >
                  <Box
                    sx={{
                      height: `23px`,
                      width: `100%`,
                      position: `relative`,
                    }}
                  >
                    <Box
                      sx={{
                        position: `absolute`,
                        width: `100%`,
                        maxWidth: `100%`,
                      }}
                    >
                      <Typography
                        sx={{
                          maxWidth: `100%`,
                          textOverflow: `ellipsis`,
                          overflow: `hidden`,
                          whiteSpace: `nowrap`,
                          textAlign: `start`,
                        }}
                      >
                        {el}
                      </Typography>
                    </Box>
                  </Box>
                </Button>
              ))}
            </Stack>
          </Paper>
        </Grid2>
      )}
    </>
  );
};
