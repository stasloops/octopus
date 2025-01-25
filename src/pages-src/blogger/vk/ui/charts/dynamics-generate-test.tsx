import { theme } from "@/shared/lib/theme";
import { fakerRU } from "@faker-js/faker";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {
    axisClasses,
    BarChart,
    barElementClasses,
    PieValueType,
} from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";
import { FC, useMemo, useState } from "react";
import { useGetBloggerMutate } from "../../api/use-blogger";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";

type TTag = { [tag: string]: number };

const genFakeData = (): TTag => {
  const value: TTag = {};
  const count = 11;
  for (let index = 0; index <= count; index++) {
    const tag = `${2024}.${index + 1 < 10 ? `0` : ``}${index + 1}`;
    if (value[tag] !== undefined) continue;
    value[tag] = fakerRU.number.int({ min: 1, max: 1000 });
  }
  return value;
};

interface IDataChart {
  value: number;
  label: string;
}

export const DemoDynamics2: FC = () => {
  const { data: dataBlogger } = useGetBloggerMutate();
  const { data: bloggerStats } = useGetBloggerMutateStats();

  const [fakerData] = useState(genFakeData());

  const dataChart: IDataChart[] | null = useMemo(() => {
    const value: IDataChart[] = [];
    for (const key in fakerData) {
      const element = fakerData[key];
      value.push({ value: element, label: key });
    }
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
              color: theme.palette.primary.contrastText,
              background: `linear-gradient(to bottom right, #3d84de, #62bcf1)`,
            }}
          >
            <IconButton sx={{ position: `absolute`, top: `0px`, right: `0px` }}>
              <MoreVertIcon color="white" />
            </IconButton>
            <Stack spacing={2} height={`100%`}>
              <Typography variant="h6" pr={2}>
                Тест дизайна (пришел в голову)
              </Typography>
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
                    ...(dataChart.length < 5
                      ? {
                          height: `50%`,
                        }
                      : {}),
                  }}
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
  return (
    <>
      <BarChart
        yAxis={[{ scaleType: "band", data: dataChart.map((el) => el.label) }]}
        series={[{ data: dataChart.map((el) => el.value) }]}
        margin={{ left: 65, top: 10 }}
        layout="horizontal"
        sx={(theme) => ({
          [`.${barElementClasses.root}`]: {
            fill: `#fff0`,
            // strokeWidth: 4,
            // stroke: theme.palette.primary.contrastText,
          },
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.tick}, .${axisClasses.line}`]: {
              stroke: `#fff0`,
              strokeWidth: 0,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: theme.palette.primary.contrastText,
            },
          },
        })}
        slots={{
          bar: (props) => {
            const radius = 7;
            // const { ownerState } = props;
            const { x, y, height, width, ...restProps } = props.style as any;
            if (x?.animation?.to === undefined) return;
            const d = `M${x.animation.to},${y.animation.to} h${
              width.animation.to - radius
            } a${radius},${radius} 0 0 1 ${radius},${radius}v ${
              height.animation.to - 2 * radius
            } a${radius},${radius} 0 0 1 ${-radius},${radius} h${
              radius - width.animation.to
            }z`;

            return (
              <path
                d={d}
                fill={`#fff0`}
                strokeWidth={3}
                stroke={theme.palette.primary.contrastText}
                {...restProps}
              />
            );
          },
        }}
      />
    </>
  );
};
