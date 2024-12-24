import { colorsList } from "@/src/shared/lib/colors";
import { fakerRU } from "@faker-js/faker";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { PieValueType } from "@mui/x-charts";
import { MakeOptional } from "@mui/x-charts/internals";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { FC, useMemo, useState } from "react";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";

const genFakeData = (): any => {
  const male = {
    "0-12": fakerRU.number.int({ min: 0, max: 1000 }),
    "13-18": fakerRU.number.int({ min: 0, max: 1000 }),
    "19-30": fakerRU.number.int({ min: 0, max: 1000 }),
    "31-55": fakerRU.number.int({ min: 0, max: 1000 }),
    "56-80": fakerRU.number.int({ min: 0, max: 1000 }),
    "80+": fakerRU.number.int({ min: 0, max: 1000 }),
  };
  const female = {
    "0-12": fakerRU.number.int({ min: 0, max: 1000 }),
    "13-18": fakerRU.number.int({ min: 0, max: 1000 }),
    "19-30": fakerRU.number.int({ min: 0, max: 1000 }),
    "31-55": fakerRU.number.int({ min: 0, max: 1000 }),
    "56-80": fakerRU.number.int({ min: 0, max: 1000 }),
    "80+": fakerRU.number.int({ min: 0, max: 1000 }),
  };
  const none = {
    "0-12": fakerRU.number.int({ min: 0, max: 1000 }),
    "13-18": fakerRU.number.int({ min: 0, max: 1000 }),
    "19-30": fakerRU.number.int({ min: 0, max: 1000 }),
    "31-55": fakerRU.number.int({ min: 0, max: 1000 }),
    "56-80": fakerRU.number.int({ min: 0, max: 1000 }),
    "80+": fakerRU.number.int({ min: 0, max: 1000 }),
  };
  const all = {
    "0-12": male["0-12"] + female["0-12"] + none["0-12"],
    "13-18": male["13-18"] + female["13-18"] + none["13-18"],
    "19-30": male["19-30"] + female["19-30"] + none["19-30"],
    "31-55": male["31-55"] + female["31-55"] + none["31-55"],
    "56-80": male["56-80"] + female["56-80"] + none["56-80"],
    "80+": male["80+"] + female["80+"] + none["80+"],
  };
  return {
    male,
    female,
    none,
    all,
  };
};

export const GenderAge: FC = () => {
  const { data: bloggerStats } = useGetBloggerMutateStats();
  const [gender, setGender] = useState<string>(`all`);

  const [fakerData] = useState(genFakeData());

  const dataChart: MakeOptional<PieValueType, "id">[] | null = useMemo(() => {
    if (!bloggerStats?.subscribers_genders) return null;
    const subscribersGenders: { [gender: string]: { [age: string]: number } } =
      {
        ...bloggerStats?.subscribers_genders,
        all: {
          "0-12":
            bloggerStats?.subscribers_genders["male"]?.["0-12"] ||
            0 + bloggerStats?.subscribers_genders["female"]?.["0-12"] ||
            0,
          "13-18":
            bloggerStats?.subscribers_genders["male"]?.["13-18"] ||
            0 + bloggerStats?.subscribers_genders["female"]?.["13-18"] ||
            0,
          "19-30":
            bloggerStats?.subscribers_genders["male"]?.["19-30"] ||
            0 + bloggerStats?.subscribers_genders["female"]?.["19-30"] ||
            0,
          "31-55":
            bloggerStats?.subscribers_genders["male"]?.["31-55"] ||
            0 + bloggerStats?.subscribers_genders["female"]?.["31-55"] ||
            0,
          "56-80":
            bloggerStats?.subscribers_genders["male"]?.["56-80"] ||
            0 + bloggerStats?.subscribers_genders["female"]?.["56-80"] ||
            0,
          "80+":
            bloggerStats?.subscribers_genders["male"]?.["80+"] ||
            0 + bloggerStats?.subscribers_genders["female"]?.["80+"] ||
            0,
        },
      };
    const data = subscribersGenders[gender];
    if (!data) return null;

    const value = [
      { value: data["0-12"] || 0, label: "0-12" },
      { value: data["13-18"] || 0, label: "13-18" },
      { value: data["19-30"] || 0, label: "19-30" },
      { value: data["31-55"] || 0, label: "31-55" },
      { value: data["56-80"] || 0, label: "56-80" },
      { value: data["80+"] || 0, label: "80+" },
    ];
    return value;
  }, [bloggerStats, gender]);

  const handleChange =
    (value: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setGender(value);
    };

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
                Пол и возраст аудитории сообщества
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
              <Box
                sx={{
                  position: `relative`,
                  width: `100%`,
                  height: `0%`,
                }}
              >
                <Grid2
                  container
                  spacing={`5px`}
                  sx={{
                    position: `absolute`,
                    bottom: 0,
                    width: `100%`,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CheckBoxElement
                    value={gender}
                    gender="all"
                    handleChange={handleChange}
                    label="Все"
                  />
                  <CheckBoxElement
                    value={gender}
                    gender="male"
                    handleChange={handleChange}
                    label="Мужчины"
                  />
                  <CheckBoxElement
                    value={gender}
                    gender="female"
                    handleChange={handleChange}
                    label="Женщины"
                  />
                  {/* <CheckBoxElement
                    value={gender}
                    gender="null"
                    handleChange={handleChange}
                    label="Не указан"
                  /> */}
                </Grid2>
              </Box>
            </Stack>
          </Paper>
        </Grid2>
      )}
    </>
  );
};

interface CheckBoxElementProps {
  value: string;
  gender: string;
  handleChange: (value: string) => (e: any) => void;
  label: string;
}

const CheckBoxElement: FC<CheckBoxElementProps> = ({
  value,
  gender,
  handleChange,
  label,
}) => {
  return (
    <Grid2 xs="auto">
      <FormControlLabel
        sx={{ height: `25px` }}
        control={
          <Checkbox checked={gender == value} onChange={handleChange(gender)} />
        }
        label={label}
      />
    </Grid2>
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
        colors={colorsList.slice(6)}
      />
    </>
  );
};
