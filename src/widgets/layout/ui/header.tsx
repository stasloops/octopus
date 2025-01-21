import { Box, Stack } from "@mui/material";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { LayoutHeight } from "../model/const";
import { MenuButton } from "./menu-button";

interface HeaderProps {
  headerChildren?: ReactNode;
}

export const Header: FC<HeaderProps> = ({ headerChildren }) => {
  return (
    <Box
      sx={{
        position: `sticky`,
        top: 0,
        right: 0,
        left: 0,
        zIndex: 3,
        height: `${LayoutHeight}px`,
        background: `#2B3A8B`,
        overflow: `hidden`,
      }}
    >
      <img
        src={`/gradient.png`}
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
      <Box
        sx={{
          width: `100%`,
          px: {
            xs: `19px`,
            md: `38px`,
            lg: `38px`,
          },
        }}
      >
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
          <Stack
            direction="row"
            spacing={1}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MenuButton />
            <Box
              sx={{
                display: {
                  xs: `none`,
                  md: `flex`,
                  lg: `flex`,
                },
              }}
            >
              <Link href={`/`}>
                <img
                  src={`/logo-orda-white.svg`}
                  alt="logo-orda"
                  style={{
                    objectFit: `contain`,
                    width: `130px`,
                    height: `50px`,
                    // pointerEvents: `none`,
                  }}
                />
              </Link>
            </Box>
            <Box
              sx={{
                display: {
                  xs: `flex`,
                  md: `none`,
                  lg: `none`,
                },
              }}
            >
              <img
                src={`/logo-orda-white-mobile.svg`}
                alt="logo-orda"
                style={{
                  objectFit: `contain`,
                  width: `35px`,
                  height: `35px`,
                  // pointerEvents: `none`,
                }}
              />
            </Box>
          </Stack>
          <Stack
            direction="row"
            spacing={6}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>{headerChildren}</Box>
            {/* <LogOutButton /> */}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
