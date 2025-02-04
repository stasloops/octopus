"use client";

import { Layout } from "@/widgets/layout";
import { Box, Button, Stack } from "@mui/material";
import { HeaderHome } from "@/features/header-home";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  defaultFormFilter,
  FormFilterSchema,
  IFormFilter,
} from "@/pages-src/marketing-integrations/model/form";
import { zodResolver } from "@hookform/resolvers/zod";
import FilterElement from "src/pages-src/my-reports/ui/filter";
import { CommunitiesElement } from "./communities";
import { MarketingIntegrationsElement } from "./marketing-integrations";
import { AudienceIntersectionElement } from "./audience-intersection";

const TYPE_VIEW = {
  communities: "communities",
  marketingIntegrations: "marketing-integrations",
  audienceIntersection: "audience-intersection",
} as const;

type TypeView = (typeof TYPE_VIEW)[keyof typeof TYPE_VIEW];

export const Page = () => {
  const [view, setView] = useState<TypeView>(TYPE_VIEW.communities);
  const methods = useForm<IFormFilter>({
    mode: "onChange",
    defaultValues: defaultFormFilter,
    resolver: zodResolver(FormFilterSchema),
  });

  return (
    <FormProvider {...methods}>
      <Layout headerChildren={<HeaderHome />} />
      <Box>
        <Box sx={{ px: "38px", py: "40px" }}>
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Button
              href=""
              onClick={() => setView(TYPE_VIEW.communities)}
              variant={
                view === TYPE_VIEW.communities ? "contained" : "outlined"
              }
            >
              Сообщества
            </Button>
            <Button
              href=""
              onClick={() => setView(TYPE_VIEW.marketingIntegrations)}
              variant={
                view === TYPE_VIEW.marketingIntegrations
                  ? "contained"
                  : "outlined"
              }
            >
              Маркетинговые интеграции
            </Button>
            <Button
              href=""
              onClick={() => setView(TYPE_VIEW.audienceIntersection)}
              variant={
                view === TYPE_VIEW.audienceIntersection
                  ? "contained"
                  : "outlined"
              }
            >
              Пересечение аудитории
            </Button>
          </Stack>
          <FilterElement />
          <Box sx={{ pt: "16px" }}>
            {(view === TYPE_VIEW.communities && <CommunitiesElement />) ||
              (view === TYPE_VIEW.marketingIntegrations && (
                <MarketingIntegrationsElement />
              )) ||
              (view === TYPE_VIEW.audienceIntersection && (
                <AudienceIntersectionElement />
              ))}
          </Box>
        </Box>
      </Box>
    </FormProvider>
  );
};
