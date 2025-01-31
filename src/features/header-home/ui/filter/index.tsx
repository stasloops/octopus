import { IconButton, Collapse } from "@mui/material";
import { Box, Button, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchInput } from "./search-input";
import { FilterField } from "./filter-field";
import { FilterFormData, filterFormSchema } from "../../lib/filter-form-schema";
import { KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material";
import { FilterSelect } from "./filter-select";
import { useFilterDataQuery } from "../../lib/hooks/useFilterDataQuery";
import { FilterAutocomplete } from "./filter-autocomplete";
import { IPayloadParams, useBlogers } from "@/entities/bloger";
import { FilterTags } from "./filter-tags";

const getDefaultValues = () => ({
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
  search: "",
});

const FILTER_CONSTANTS = {
  LOCATION_DEFAULT: "Все",
  STORAGE_KEY: "app_filter_form_values",
  LABELS: {
    FILTER: "Фильтр",
    ADDITIONAL_FILTERS: "Дополнительные фильтры",
  },
};

interface IFilterElementProps {
  onClose: () => void;
}

export const FilterElement: FC<IFilterElementProps> = ({ onClose }) => {
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);
  const { bloggersLocations, subscribersLocations } = useFilterDataQuery();

  const { methods, resetForm } = useHandleForm();
  const { onSubmit } = useFilterForm();

  const handleOnSubmit = async (args: FilterFormData) => {
    try {
      await onSubmit(args);
      onClose();
    } catch (error) {
      console.error("Failed to submit filter:", error);
    }
  };

  const transformData = (data: { id: null; content: string }[]) => {
    return data.map((el) => el.content);
  };

  return (
    <Box
      sx={{ padding: { xs: `56px 20px`, md: `47px 38px`, lg: `47px 38px` } }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
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
                  {FILTER_CONSTANTS.LABELS.FILTER}
                </Typography>
              </Stack>
            </Box>

            <Box>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ flexGrow: 1 }}>
                  <SearchInput />
                </Box>
                <Button
                  variant="outlined"
                  onClick={resetForm}
                  sx={{ height: '40px' }}
                >
                  Сбросить
                </Button>
              </Stack>
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
                  name="location"
                  label="Местоположение"
                  data={transformData(bloggersLocations.data || [])}
                  defaultValue={FILTER_CONSTANTS.LOCATION_DEFAULT}
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
                {FILTER_CONSTANTS.LABELS.ADDITIONAL_FILTERS}
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
                    disabled={true}
                  />
                  <FilterField name="advertisers" label="Рекламодатели" />

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
                    name="geography"
                    label="География аудитории"
                    data={transformData(subscribersLocations.data || [])}
                    defaultValue={FILTER_CONSTANTS.LOCATION_DEFAULT}
                  />

                  <FilterTags name="postTags" label="Теги постов" />

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

const useHandleForm = () => {
  const loadSavedValues = () => {
    try {
      const savedValues = localStorage.getItem(FILTER_CONSTANTS.STORAGE_KEY);
      return savedValues ? JSON.parse(savedValues) : getDefaultValues();
    } catch {
      return getDefaultValues();
    }
  };

  const methods = useForm<FilterFormData>({
    resolver: zodResolver(filterFormSchema),
    mode: "onChange",
    defaultValues: loadSavedValues(),
  });

  const resetForm = () => {
    methods.reset(getDefaultValues());
    localStorage.removeItem(FILTER_CONSTANTS.STORAGE_KEY);
  };

  useEffect(() => {
    const subscription = methods.watch((formValues) => {
      localStorage.setItem(
        FILTER_CONSTANTS.STORAGE_KEY,
        JSON.stringify(formValues)
      );
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  return { methods, resetForm };
};

const useFilterForm = () => {
  const { mutateAsync, setFilters } = useBlogers();

  const onSubmit = async ({
    erRate,
    subscribers,
    postsCount,
    geography,
    location,
    verifiedAccount,
    communityTheme,
    postTags,
    vkVideoViews,
    clipsViews,
    averageReach,
    search,
  }: FilterFormData) => {
    try {
      const handleFilter = <T,>(filter: T) => {
        if (
          filter !== "" &&
          filter !== 0 &&
          filter !== FILTER_CONSTANTS.LOCATION_DEFAULT
        ) {
          return filter;
        }
        return undefined;
      };

      const newFilters: IPayloadParams = {
        er__lte: handleFilter(Number(erRate)),
        posts__lte: handleFilter(Number(postsCount)),
        subscribers__lte: handleFilter(Number(subscribers)),
        theme_in: handleFilter(communityTheme),
        is_confirmed: verifiedAccount === "true" ? true : false,
        location__in: handleFilter(location),
        stat__subscribers_locations__in: handleFilter(geography),
        stat__posts_tags__in: handleFilter(postTags?.replace(/\s*,\s*/g, "|")),
        stat__clips_counters__views__lte: handleFilter(Number(clipsViews)),
        stat__videos_counters__views__lte: handleFilter(Number(vkVideoViews)),
        stat__posts_counters__views_12_avg__lte: handleFilter(
          Number(averageReach)
        ),

        search: handleFilter(search),
      };
      setFilters((prev) => ({ ...prev, ...newFilters, offset: 0 }));

      mutateAsync();
    } catch (error) {
      throw error;
    }
  };

  return { onSubmit };
};
