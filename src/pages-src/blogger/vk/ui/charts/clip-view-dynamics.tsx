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
import { FC, useMemo } from "react";
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

export const ClipViewDynamics: FC = () => {
  const { data: bloggerStats } = useGetBloggerMutateStats();

  const dataChart: IDataChart[] | null = useMemo(() => {
    if (!bloggerStats) return null;
    if (bloggerStats.clips_views_history === undefined) return null;
    if (Object.keys(bloggerStats.clips_views_history).length == 0) return null;
    const value: IDataChart[] = [];
    for (const key in bloggerStats.clips_views_history) {
      const element = bloggerStats.clips_views_history[key];
      value.push({ value: element, label: key });
    }
    return value;
  }, [bloggerStats]);

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
            <IconButton
              sx={{ position: `absolute`, top: `20px`, right: `5px` }}
            >
              <MoreVertIcon sx={{ color: `#B5CDEF` }} />
            </IconButton>
            <Stack spacing={2} height={`100%`}>
              <Typography
                sx={{
                  fontWeight: `600`,
                  fontSize: `20px`,
                  color: `#2B3A8B`,
                  height: `30px`,
                }}
                pr={2}
              >
                Динамика просмотров в клипах
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
                          top: `25%`,
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
          "--my-custom-gradient-2": "url(#GlobalGradient2)",
          [`.${barElementClasses.root}`]: {
            fill: `#fff0`,
            // strokeWidth: 4,
            // stroke: theme.palette.primary.contrastText,
          },
          [`.${axisClasses.root}`]: {
            [`.${axisClasses.line}`]: {
              stroke: `#B5CDEF`,
              strokeWidth: `8.75px`,
            },
            [`.${axisClasses.tick}`]: {
              stroke: `#2B69D5`,
              strokeWidth: `8.75px`,
            },
            [`.${axisClasses.tickLabel}`]: {
              fill: `#222657`,
              // fontSize: `30px !important`,
            },
          },
          [`.${axisClasses.directionX} .${axisClasses.tickContainer}:last-child .MuiChartsAxis-tick`]:
            {
              display: `none`,
            },
        })}
        slotProps={{
          popper: {
            sx: {
              "--my-custom-gradient-2":
                "linear-gradient(90.36deg, #2B3ABB 3.14%, #70D2F8 99.72%)",
            },
          },
          axisTickLabel: {
            fontSize: `30px`,
          },
        }}
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
                fill={`var(--my-custom-gradient-2, #123456)`}
                {...restProps}
              />
            );
          },
          axisLine: (props) => {
            return (
              <g>
                <line
                  {...props}
                  {...(typeof props.x1 === "number" && { x1: props.x1 - 10 })}
                  {...(typeof props.y2 === "number" && { y2: props.y2 + 10 })}
                  strokeLinecap="round"
                  stroke="#B5CDEF"
                  strokeWidth="8.75px"
                />
                {typeof props.x2 === "number" && (
                  <line
                    x1={props.x2}
                    x2={props.x2}
                    y1={0}
                    y2={10}
                    strokeLinecap="round"
                    stroke="#B5CDEF"
                    strokeWidth="8.75px"
                    style={{ zIndex: 2 }}
                  />
                )}
                {typeof props.y1 === "number" && (
                  <line
                    y1={props.y1}
                    y2={props.y1}
                    x1={0}
                    x2={-10}
                    strokeLinecap="round"
                    stroke="#B5CDEF"
                    strokeWidth="8.75px"
                  />
                )}
              </g>
            );
          },
          axisTick: (props) => {
            if (typeof props.x2 === "number") return null;
            return (
              <g>
                <line
                  {...props}
                  strokeLinecap="round"
                  {...(typeof props.y2 === "number" && {
                    y1: -4,
                    y2: props.y2,
                  })}
                />
              </g>
            );
          },
          axisTickLabel: (props) => {
            return (
              <g>
                <text {...props}>
                  {props.x == 0 ? (
                    <tspan x="0" dy="9px" dominantBaseline="hanging">
                      {props.text}
                    </tspan>
                  ) : (
                    <tspan x="-10" dy="-6px" dominantBaseline="hanging">
                      {props.text}
                    </tspan>
                  )}
                </text>
              </g>
            );
          },
        }}
      >
        <linearGradient
          id="GlobalGradient2"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0" stopColor="#2B3ABB" />
          <stop offset="1" stopColor="#70D2F8" />
        </linearGradient>
      </BarChart>
    </>
  );
};
