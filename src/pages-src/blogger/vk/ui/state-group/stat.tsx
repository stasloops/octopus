import { theme } from "@/src/shared/lib/theme";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, ReactNode } from "react";

interface StatElementProps {
  icon1?: ReactNode;
  icon2?: ReactNode;
  icon3?: ReactNode;
  label: string;
  value: ReactNode;
  error?: boolean;
}

export const StatElement: FC<StatElementProps> = ({
  icon1,
  icon2,
  icon3,
  label,
  value,
  error,
}) => {
  return (
    <>
      <Grid2 xs="auto">
        <Paper
          sx={{
            position: `relative`,
            width: `290px`,
            minHeight: `110px`,
            padding: 1,
            color: theme.palette.white.main,
            background: `linear-gradient(to bottom right, #3d84de, #62bcf1)`,
            borderBottom: !!error
              ? `5px solid ${theme.palette.error.main}`
              : undefined,
          }}
        >
          <IconButton sx={{ position: `absolute`, top: `0px`, right: `0px` }}>
            <MoreVertIcon color="white" />
          </IconButton>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                height: `50px`,
                width: `50px`,
                position: `relative`,
              }}
            >
              <Box
                sx={{
                  position: `absolute`,
                  height: `24px`,
                  width: `24px`,
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(-50%, -50%)`,
                }}
              >
                {icon1}
              </Box>
              <Box
                sx={{
                  position: `absolute`,
                  height: `24px`,
                  width: `24px`,
                  left: `35%`,
                  top: `35%`,
                  transform: `translate(-50%, -50%)`,
                }}
              >
                {icon2}
              </Box>
              <Box
                sx={{
                  position: `absolute`,
                  height: `24px`,
                  width: `24px`,
                  left: `65%`,
                  top: `65%`,
                  transform: `translate(-50%, -50%)`,
                }}
              >
                {icon3}
              </Box>
            </Box>
            <Stack spacing={0}>
              {value}
              <Typography>{label}</Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid2>
    </>
  );
};
