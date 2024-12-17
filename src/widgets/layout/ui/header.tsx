import { Box, Stack } from "@mui/material";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { LayoutHeight } from "../model/const";
import { LogOutButton } from "./logout";

interface HeaderProps {
  headerChildren?: ReactNode;
}

export const Header: FC<HeaderProps> = ({ headerChildren }) => {
  return (
    <Box
      sx={{
        position: `absolute`,
        top: 0,
        right: 0,
        left: 0,
        zIndex: 2,
        height: `${LayoutHeight}px`,
        background: `#2B3A8B`,
        overflow: `hidden`,
      }}
    >
      <img
        src={`./gradient.png`}
        alt="gradient"
        style={{
          objectFit: `fill`,
          position: `absolute`,
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          width: `100%`,
          height: `${LayoutHeight}px`,
          pointerEvents: `none`,
          zIndex: -1,
        }}
      />
      <Box sx={{ width: `100%`, px: `40px` }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            width: `100%`,
            height: `${LayoutHeight}px`,
            zIndex: 3,
          }}
        >
          <Box sx={{ width: 0 }}>
            <Link href={`/`}>
              <img
                src={`./logo-orda-white.svg`}
                alt="logo-orda"
                style={{
                  objectFit: `contain`,
                  width: `200px`,
                  height: `50px`,
                  // pointerEvents: `none`,
                }}
              />
            </Link>
          </Box>
          <Box>{headerChildren}</Box>
          <LogOutButton />
        </Stack>
      </Box>
    </Box>
  );
};
