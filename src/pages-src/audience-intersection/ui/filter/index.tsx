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
import { NamesInput } from "./names-input";
import { SubmitButton } from "./submit-button";

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
                        <NamesInput />
                      </Grid2>
                    </Grid2>
                  </Box>
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
                  * - введите названия сообществ или ссылки на сообщетсва через
                  запятую от 2-ух до 5-ти
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
