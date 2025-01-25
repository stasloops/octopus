import { theme } from "@/shared/lib/theme";
import { Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, ReactNode } from "react";

interface StatElementProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
  error?: boolean;
}

export const StatElement: FC<StatElementProps> = ({
  icon,
  label,
  value,
  error,
}) => {
  return (
    <>
      <Grid2 xs={`auto`}>
        <Stack
          direction="column"
          spacing={`0px`}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
          {value}
          <Typography
            color={!!error ? theme.palette.error.main : undefined}
            align="center"
            sx={{
              fontWeight: `400`,
              fontSize: `12px`,
            }}
          >
            {label}
          </Typography>
        </Stack>
      </Grid2>
    </>
  );
};
