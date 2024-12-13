import { createTheme, PaletteColor } from "@mui/material";
import { fontFamily } from "./font";

declare module "@mui/material/styles" {
  interface Palette {
    white: PaletteColor;
  }
  interface PaletteOptions {
    white: PaletteColor;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}
declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    white: true;
  }
}

const { palette } = createTheme();
export const theme = createTheme({
  typography: {
    fontFamily: fontFamily.style.fontFamily,
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          textTransform: "none",
        },
      },
    },
  },
  palette: {
    mode: "light",
    background: {
      default: `#fff`,
    },
    primary: {
      main: `#2B69D5`,
    },
    white: palette.augmentColor({
      color: {
        main: "#fff",
      },
    }),
    // background: { default: "#ececec" }
  },
});
