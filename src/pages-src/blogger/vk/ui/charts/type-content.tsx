import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { FC, useMemo } from "react";
import { useGetBloggerMutate } from "../../api/use-blogger";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";

export const TypeContent: FC = () => {
  const { data: dataBlogger } = useGetBloggerMutate();
  const { data: bloggerStats } = useGetBloggerMutateStats();

  const dataChart: MakeOptional<PieValueType, "id">[] | null = useMemo(() => {
    const value = [
      { value: dataBlogger?.videos || 0, label: "Видеоклипы" },
      {
        value: dataBlogger?.clips || 0,
        label: "Короткие видео",
      },
      { value: dataBlogger?.posts || 0, label: "Посты" },
    ];
    return value;
  }, [dataBlogger]);

  return (
    <>
      {!!dataChart && (
        <Grid2 xs={12} md="auto" lg="auto">
          <Paper
            sx={{
              position: `relative`,
              width: { xs: `100%`, md: `400px`, lg: `400px` },
              height: `500px`,
              padding: 1,
            }}
          >
            <IconButton sx={{ position: `absolute`, top: `0px`, right: `0px` }}>
              <MoreVertIcon />
            </IconButton>
            <Stack spacing={2} height={`100%`}>
              <Typography variant="h6" pr={2}>
                Тип контента
              </Typography>
              <Box
                sx={{
                  position: `relative`,
                  width: `100%`,
                  height: `100%`,
                }}
              >
                <Box
                  sx={{ position: `absolute`, width: `100%`, height: `100%` }}
                >
                  <ChartElement dataChart={dataChart} />
                </Box>
              </Box>
            </Stack>
          </Paper>
        </Grid2>
      )}
    </>
  );
};

const ChartElement: FC<{
  dataChart: MakeOptional<PieValueType, "id">[];
}> = ({ dataChart }) => {
  const summ: number = useMemo(() => {
    return dataChart
      .map((el) => el.value)
      .reduce((acc, number) => acc + number, 0);
  }, [dataChart]);

  return (
    <>
      <PieChart
        series={[
          {
            valueFormatter: (item) =>
              item === null
                ? ""
                : `${item.value.toLocaleString("ru-RU")} / ${(
                    (item.value / summ) *
                    100
                  ).toFixed(1)}%`,
            arcLabel: (item) => `${((item.value / summ) * 100).toFixed(1)}%`,
            arcLabelMinAngle: 35,
            arcLabelRadius: "60%",
            data: dataChart,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: "bold",
            fill: `#fff`,
          },
        }}
        margin={{ right: 200 }}
        // slotProps={{
        //   legend: {
        //     // direction: "row",
        //     position: { vertical: "bottom", horizontal: "middle" },
        //     padding: 0,
        //   },
        // }}
        // colors={colorsList.slice(2)}
      />
    </>
  );
};
