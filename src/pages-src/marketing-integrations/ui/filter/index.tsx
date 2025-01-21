import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Divider, Stack, Typography } from "@mui/material";
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
      <Box
        sx={{
          px: {
            xs: `18px`,
            md: `38px`,
            lg: `38px`,
          },
          pt: `52px`,
        }}
      >
        <FormProvider {...methods}>
          <Stack spacing={`0px`}>
            <Box sx={{ width: `cacl(100% + 20px)` }}>
              <Grid2 container spacing={`18px`}>
                <Grid2 xs={12} md={12} lg>
                  <Box width="100%">
                    <Grid2 container spacing={`18px`}>
                      <Grid2 xs={12} md={4} lg={4}>
                        <AdvertisersInput />
                      </Grid2>
                      <Grid2 xs={12} md={4} lg={4}>
                        <HashtagsInput />
                      </Grid2>
                      <Grid2 xs={12} md={4} lg={4}>
                        <UrlInput />
                      </Grid2>
                    </Grid2>
                  </Box>
                </Grid2>
                <Grid2 xs={12} md={12} lg="auto">
                  <DataRangeInput />
                </Grid2>
              </Grid2>
            </Box>
            <Divider sx={{ pt: `40px` }} />
            <Stack
              direction={{ xs: "column", md: "row", lg: "row" }}
              spacing={2}
              sx={{
                pt: `31px`,
                justifyContent: {
                  xs: "flex-start",
                  md: "space-between",
                  lg: "space-between",
                },
                alignItems: { xs: "flex-start", md: "center", lg: "center" },
              }}
            >
              <Box>
                <Typography
                  color={`#B5CDEF`}
                  sx={{
                    fontSize: {
                      xs: "14px",
                      md: "1rem",
                      lg: "1rem",
                    },
                    fontWeight: 400,
                  }}
                >
                  * - введите название рекламодателей через запятую от 3-ёх до
                  5-ти
                </Typography>
                <Typography
                  color={`#B5CDEF`}
                  sx={{
                    fontSize: {
                      xs: "14px",
                      md: "1rem",
                      lg: "1rem",
                    },
                    fontWeight: 400,
                  }}
                >
                  ** - введите хэштеги через запятую, без #, от 3-ёх до 5-ти
                </Typography>
              </Box>
              <SubmitButton />
            </Stack>
          </Stack>
        </FormProvider>
      </Box>
    </>
  );
};
