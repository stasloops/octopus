import {
  Box,
  Button,
  Chip,
  Stack,
  Tooltip,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchInput } from "./search-input";
import { FilterField } from "./filter-field";
import { FilterFormData, filterFormSchema } from "../../lib/filter-form-schema";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { FilterSelect } from "./filter-select";
import { useFilterDataQuery } from "../../lib/hooks/useFilterDataQuery";
import { FilterAutocomplete } from "./filter-autocomplete";
import { useBlogers } from "@/entities/bloger";

export const FilterElement: FC = () => {
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);
  const {
    bloggersLocations,
    subscribersLocations,
    postTags,
    isLoading,
    isError,
  } = useFilterDataQuery();

  const methods = useForm<FilterFormData>({
    resolver: zodResolver(filterFormSchema),
    mode: "onChange",
    defaultValues: {
      subscribers: "",
      geography: "",
      brandMentions: "",
      erRate: "",
      otherSocialAccount: "",
      advertisers: "",
      subscriptions: "",
      postsCount: "",
      verifiedAccount: "",
      location: "",
      postTags: "",
      vkVideoViews: "",
      communityTheme: "",
      clipsViews: "",
      averageReach: "",
    },
  });

  const { mutateAsync } = useBlogers();

  const onSubmit = (data: FilterFormData) => {
    console.log("data: ", data);
    // Здесь обработка данных формы
  };

  return (
    <Box
      sx={{ padding: { xs: `56px 20px`, md: `47px 38px`, lg: `47px 38px` } }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Box>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ fontWeight: `600`, fontSize: `20px` }}>
                  Фильтр
                </Typography>
                <Tooltip title={`В разработке`}>
                  <Chip
                    color="error"
                    size="small"
                    label="В разработке"
                    variant="outlined"
                  />
                </Tooltip>
              </Stack>
            </Box>

            <Box>
              <SearchInput />
            </Box>

            <Box sx={{ width: `100%` }}>
              <Grid2
                container
                spacing={`20px`}
                sx={{
                  justifyContent: {
                    xs: `center`,
                    md: `flex-start`,
                    lg: `flex-start`,
                  },
                }}
              >
                <FilterField
                  name="subscribers"
                  label="Кол-во подписчиков"
                  type="number"
                />
                <FilterField
                  name="erRate"
                  label="ER% в сообществе"
                  type="number"
                />
                <FilterField
                  name="communityTheme"
                  label="Тематика сообщества"
                />
                <FilterAutocomplete
                  name="geography"
                  label="Местоположение"
                  data={["Москва", "Воронеж", "Сантрапе"]}
                />
              </Grid2>
            </Box>

            <Box>
              <Button
                onClick={() => setShowAdditionalFilters(!showAdditionalFilters)}
                variant="text"
                sx={{ mb: 2 }}
                endIcon={
                  <IconButton size="small">
                    {showAdditionalFilters ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                }
              >
                Дополнительные фильтры
              </Button>

              <Collapse in={showAdditionalFilters}>
                <Grid2
                  container
                  spacing={`20px`}
                  sx={{
                    justifyContent: {
                      xs: `center`,
                      md: `flex-start`,
                      lg: `flex-start`,
                    },
                  }}
                >
                  <FilterField name="brandMentions" label="Упоминания бренда" />
                  <FilterField
                    name="otherSocialAccount"
                    label="Аккаунт в другой социальной сети"
                  />
                  <FilterField name="advertisers" label="Рекламодатели" />
                  <FilterField
                    name="subscriptions"
                    label="Кол-во подписок"
                    type="number"
                  />
                  <FilterField
                    name="postsCount"
                    label="Кол-во постов (в блоге за весь период)"
                    type="number"
                  />

                  <FilterSelect
                    name="verifiedAccount"
                    label="Подтверждённый аккаунт"
                  />

                  <FilterAutocomplete
                    name="location"
                    label="Местоположение"
                    data={[]}
                  />
                  <FilterAutocomplete
                    name="postTags"
                    label="Теги постов"
                    data={[]}
                  />

                  <FilterField
                    name="vkVideoViews"
                    label="Кол-во просмотров (VK Video)"
                    type="number"
                  />
                  <FilterField
                    name="clipsViews"
                    label="Кол-во просмотров в клипах"
                    type="number"
                  />
                  <FilterField
                    name="averageReach"
                    label="Средний охват в сообществах"
                    type="number"
                  />
                </Grid2>
              </Collapse>
            </Box>

            <Box
              sx={{
                position: `relative`,
                px: { xs: `41px`, md: 0, lg: 0 },
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: `20px`,
                  width: { xs: `100%`, md: `98px`, lg: `98px` },
                }}
              >
                Поиск
              </Button>
            </Box>
          </Stack>
        </form>
      </FormProvider>
    </Box>
  );
};
