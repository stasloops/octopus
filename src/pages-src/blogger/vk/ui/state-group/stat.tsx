import { theme } from "@/shared/lib/theme";
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
      <Grid2 xs={12} md={4} lg={3}>
        <Paper
          className="PaperContent"
          sx={{
            borderRadius: `20px`,
            position: `relative`,
            width: `100%`,
            // minHeight: `110px`,
            height: `126px`,
            padding: `17px 9px`,
            color: theme.palette.white.main,
            background: `linear-gradient(to bottom right, #3d84de, #62bcf1)`,
            borderBottom: !!error
              ? `5px solid ${theme.palette.error.main}`
              : undefined,
          }}
        >
          <IconButton sx={{ position: `absolute`, top: `10px`, right: `0px` }}>
            <MoreVertIcon color="white" />
          </IconButton>
          <Stack
            direction="row"
            spacing={`14px`}
            sx={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Box
              sx={{
                height: `30px`,
                width: `30px`,
                position: `relative`,
              }}
            >
              <Box
                sx={{
                  position: `absolute`,
                  height: `17px`,
                  width: `17px`,
                  left: `50%`,
                  top: `50%`,
                  transform: `translate(-50%, -50%)`,
                  "& svg": {
                    height: `17px`,
                    width: `17px`,
                  },
                }}
              >
                {icon1}
              </Box>
              <Box
                sx={{
                  position: `absolute`,
                  height: `17px`,
                  width: `17px`,
                  left: `35%`,
                  top: `35%`,
                  transform: `translate(-50%, -50%)`,
                  "& svg": {
                    height: `17px`,
                    width: `17px`,
                  },
                }}
              >
                {icon2}
              </Box>
              <Box
                sx={{
                  position: `absolute`,
                  height: `17px`,
                  width: `17px`,
                  left: `65%`,
                  top: `65%`,
                  transform: `translate(-50%, -50%)`,
                  "& svg": {
                    height: `17px`,
                    width: `17px`,
                  },
                }}
              >
                {icon3}
              </Box>
            </Box>
            <Stack spacing={0}>
              {value}
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: `12px`,
                  // width: `195px`,
                  lineHeight: `15px`,
                  pr: `20px`,
                }}
              >
                {label}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
      </Grid2>
    </>
  );
};
