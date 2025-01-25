import { theme } from "@/src/shared/lib/theme";
import { CustomTextField } from "@/src/shared/ui/custom-text-field";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useMemo, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";

interface IDataChart {
  value: number;
  label: string;
}

export const AudienceGeography: FC = () => {
  const { data: bloggerStats } = useGetBloggerMutateStats();
  const [scroll, setScroll] = useState<boolean>(false);
  const [isMany, setIsMany] = useState<boolean>(false);

  const [search, setSearch] = useState<string>(``);
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const dataChart: IDataChart[] | null = useMemo(() => {
    if (!bloggerStats) return null;
    if (bloggerStats.subscribers_locations === undefined) return null;
    const value: IDataChart[] = [];
    for (const key in bloggerStats.subscribers_locations) {
      const element = bloggerStats.subscribers_locations[key];
      value.push({ value: element, label: key });
    }
    const valueFilter = !search
      ? value
      : value.filter((el) =>
          el.label.toLowerCase().includes(search.toLocaleLowerCase())
        );
    if (valueFilter.length > 8) setIsMany(true);
    else setIsMany(false);
    return valueFilter;
  }, [bloggerStats, search]);

  const summ: number = useMemo(() => {
    if (!dataChart) return 0;
    return dataChart.reduce((acc, el) => acc + el.value, 0);
  }, [dataChart]);

  const onChangeScroll = () => {
    setScroll(!scroll);
  };

  const [open, setOpen] = useState<boolean>(false);

  const onChangeOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {!!dataChart && (
        <Grid2 xs={12} md={6} lg={4}>
          <Paper
            sx={{
              borderRadius: `20px`,
              position: `relative`,
              width: `100%`,
              height: `513px`,
              padding: `24px`,
            }}
          >
            <Stack
              direction="row"
              spacing={0}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                position: `absolute`,
                top: `20px`,
                right: `5px`,
              }}
            >
              <IconButton onClick={onChangeOpen}>
                <FilterAltOutlinedIcon sx={{ color: `#B5CDEF` }} />
              </IconButton>
              <IconButton>
                <MoreVertIcon sx={{ color: `#B5CDEF` }} />
              </IconButton>
            </Stack>

            <Stack spacing={2} height={`100%`}>
              <Box>
                <Typography
                  sx={{
                    fontWeight: `600`,
                    fontSize: `20px`,
                    color: `#2B3A8B`,
                  }}
                  pr={2}
                >
                  {`География аудитории`}
                </Typography>
                <Collapse in={open}>
                  <CustomTextField
                    fullWidth
                    label="Поиск"
                    variant="outlined"
                    size="small"
                    onChange={onChangeText}
                    value={search}
                  />
                </Collapse>
              </Box>

              <Box
                sx={{
                  position: `relative`,
                  width: `100%`,
                  height: `100%`,
                }}
              >
                <Box
                  sx={{
                    position: `absolute`,
                    width: `100%`,
                    height: `100%`,
                  }}
                >
                  {!scroll && !!isMany && (
                    <Box
                      sx={{
                        position: `absolute`,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: `162px`,
                        background: `linear-gradient(#fff0, 10%, #fff)`,
                        zIndex: 1,
                      }}
                    >
                      <Button
                        onClick={onChangeScroll}
                        sx={{
                          width: `100%`,
                          height: `100%`,
                          fontWeight: `400`,
                          fontSize: `24px`,
                          color: `#222657`,
                        }}
                      >
                        Раскрыть
                      </Button>
                    </Box>
                  )}
                  <Box
                    sx={{
                      height: `100%`,
                    }}
                  >
                    <Virtuoso
                      className="miniscroll"
                      style={{
                        height: "100%",
                        overflow: !!scroll ? `auto` : `hidden`,
                      }}
                      data={dataChart.sort((a, b) => b.value - a.value)}
                      totalCount={200}
                      itemContent={(index, el) => (
                        <StatElement
                          key={index}
                          value={el.value}
                          label={el.label}
                          summ={summ}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid2>
      )}
    </>
  );
};

interface StatElementProps {
  label: string;
  value: number;
  summ: number;
}

const StatElement: FC<StatElementProps> = ({ label, summ, value }) => {
  return (
    <>
      <Stack spacing={`9px`} sx={{ py: `5px`, px: `3px` }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>{label}</Typography>
          <Typography>{`${value.toLocaleString("ru-RU")} / ${(
            (value / summ) *
            100
          ).toFixed(1)}%`}</Typography>
        </Stack>
        <Box
          sx={{
            height: `22px`,
            position: `relative`,
            borderRadius: `15px`,
            overflow: `hidden`,
          }}
        >
          <Box
            sx={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              position: `absolute`,
              background: `#D9E3F3`,
              borderRadius: `15px`,
            }}
          ></Box>
          <Box
            sx={{
              left: `-30px`,
              top: 0,
              bottom: 0,
              position: `absolute`,
              width: `calc(${((value / summ) * 100).toFixed(1)}% + 30px)`,
              background: theme.palette.primary.main,
              //   opacity: 0.3,
              borderRadius: `15px`,
            }}
          ></Box>
        </Box>
      </Stack>
    </>
  );
};
