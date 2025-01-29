import { IconButton, Collapse } from "@mui/material";
import { Box, Button, Chip, Stack, Tooltip, Typography } from "@mui/material";
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
import { useBloggerTableStore } from "@/pages-src/home/model/store";
import { FilterTags } from "./filter-tags";

const locationDefaultValue = "Все";

interface IFilterElementProps {
  onClose: () => void;
}

export const FilterElement: FC<IFilterElementProps> = ({ onClose }) => {
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);
  const {
    bloggersLocations,
    subscribersLocations,
    postTags,
    isLoading,
    isError,
  } = useFilterDataQuery();
  const setBloggerTable = useBloggerTableStore((state) => state.setValue);

  const loadSavedValues = () => {
    const savedValues = localStorage.getItem("filterFormValues");
    if (savedValues) {
      return JSON.parse(savedValues);
    }
    return {
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
    };
  };

  const methods = useForm<FilterFormData>({
    resolver: zodResolver(filterFormSchema),
    mode: "onChange",
    defaultValues: loadSavedValues(),
  });

  useEffect(() => {
    const subscription = methods.watch((formValues) => {
      localStorage.setItem("filterFormValues", JSON.stringify(formValues));
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const { mutateAsync } = useBlogers();

  const onSubmit = async ({
    erRate,
    subscribers,
    postsCount,
    geography,
    location,
    advertisers,
    verifiedAccount,
    communityTheme,
    postTags,
    vkVideoViews,
    clipsViews,
    averageReach,
  }: FilterFormData) => {
    try {
      const handleFilter = <T,>(filter: T) => {
        if (filter !== "" && filter !== 0 && filter !== locationDefaultValue) {
          return filter;
        }
        return undefined;
      };

      const is_confirmed = verifiedAccount === "Да" ? true : false;

      const newFilters: IPayloadParams = {
        er__lte: handleFilter(Number(erRate)),
        posts__lte: handleFilter(Number(postsCount)),
        subscribers__lte: handleFilter(Number(subscribers)),

        theme_in: handleFilter(communityTheme),
        is_confirmed,

        location__in: handleFilter(location),
        stat__subscribers_locations__in: handleFilter(geography),
        stat__posts_tags__in: handleFilter(postTags),

        stat__clips_counters__views__lte: handleFilter(Number(clipsViews)),

        stat__videos_counters__views__lte: handleFilter(Number(vkVideoViews)),
        stat__posts_counters__views_12_avg__lte: handleFilter(
          Number(averageReach)
        ),

        search: "",
      };
      console.log(vkVideoViews);

      console.log(newFilters);
      const res = await mutateAsync(newFilters);
      setBloggerTable(res);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const transformData = (data: { id: null; content: string }[]) => {
    return data.map((el) => {
      return el.content;
    });
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
                  name="location"
                  label="Местоположение"
                  data={transformData(bloggersLocations.data || [])}
                  defaultValue={locationDefaultValue}
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
                    defaultValue={locationDefaultValue}
                  />

                  <FilterTags name="postTags" label="Теги постов" />

                  {/* <FilterAutocomplete
                    name="postTags"
                    label="Теги постов"
                    data={transformData(postTags.data || [])}
                  /> */}

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
