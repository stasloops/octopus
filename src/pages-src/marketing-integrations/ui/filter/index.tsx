import { theme } from "@/src/shared/lib/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
    defaultFormFilter,
    FormFilterSchema,
    IFormFilter,
} from "../../model/form";
import { AdvertisersInput } from "./advertisers-input";
import { DataRangeInput } from "./data-range";
import { HashtagsInput } from "./hashtags-input";
import { SubmitButton } from "./submit-button";
import { UrlInput } from "./url-input";

export const FilterElement: FC = () => {
  const methods = useForm<IFormFilter>({
    mode: "onChange",
    defaultValues: defaultFormFilter,
    resolver: zodResolver(FormFilterSchema),
  });

  return (
    <>
      <Box sx={{ px: `38px`, pt: `15px` }}>
        <Paper variant="outlined" sx={{ padding: `20px` }}>
          <FormProvider {...methods}>
            <Stack spacing={1}>
              <Box sx={{ width: `cacl(100% + 20px)` }}>
                <Grid2 container spacing={`20px`}>
                  <Grid2 xs={12} md={6} lg={3}>
                    <AdvertisersInput />
                  </Grid2>
                  <Grid2 xs={12} md={6} lg={3}>
                    <HashtagsInput />
                  </Grid2>
                  <Grid2 xs={12} md={6} lg={3}>
                    <UrlInput />
                  </Grid2>
                  <Grid2 xs={12} md={6} lg={3}>
                    <DataRangeInput />
                  </Grid2>
                </Grid2>
              </Box>
              <Divider />
              <Stack
                direction={{ xs: "column", md: "row", lg: "row" }}
                spacing={2}
                sx={{
                  justifyContent: {
                    xs: "flex-start",
                    md: "space-between",
                    lg: "space-between",
                  },
                  alignItems: { xs: "flex-start", md: "center", lg: "center" },
                }}
              >
                <Box>
                  <Typography color={theme.palette.grey[500]}>
                    * - введите название рекламодателей через запятую от 3-ёх до
                    5-ти
                  </Typography>
                  <Typography color={theme.palette.grey[500]}>
                    ** - введите хэштеги через запятую, без #, от 3-ёх до 5-ти
                  </Typography>
                </Box>
                <SubmitButton />
              </Stack>
            </Stack>
          </FormProvider>
        </Paper>
      </Box>
    </>
  );
};
