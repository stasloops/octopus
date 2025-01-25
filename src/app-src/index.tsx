"use client";

import { theme } from "@/shared/lib/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { ruRU } from "@mui/x-date-pickers/locales";
import "moment/locale/ru";
import { SnackbarProvider } from "notistack";
import { FC, ReactNode } from "react";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./providers/query-provider";

interface AppProps {
  children: ReactNode;
}

const App: FC<AppProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider
        dateAdapter={AdapterMoment}
        adapterLocale="ru-RU"
        localeText={
          ruRU.components.MuiLocalizationProvider.defaultProps.localeText
        }
      >
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={5} autoHideDuration={3000}>
            <CssBaseline />
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default App;
