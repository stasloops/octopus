import { LinearProgress, Stack } from "@mui/material";
import { FC } from "react";

export const Page: FC = async () => {
  return (
    <>
      <Stack
        direction="column"
        spacing={0}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          position: `absolute`,
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <img
          src={`./logo-orda.svg`}
          alt="logo-orda"
          style={{
            objectFit: `contain`,
            width: `300px`,
            height: `100px`,
            pointerEvents: `none`,
          }}
        />
        <LinearProgress
          sx={{
            width: `300px`,
          }}
        />
      </Stack>
    </>
  );
};
