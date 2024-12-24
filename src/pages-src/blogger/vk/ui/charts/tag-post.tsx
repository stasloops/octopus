import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useGetBloggerMutateStats } from "../../api/use-blogger-stats";

interface IDataChart {
  value: number;
  label: string;
}

export const TagPost: FC = () => {
  const { data: bloggerStats } = useGetBloggerMutateStats();
  const [scroll, setScroll] = useState<boolean>(false);
  const [isMany, setIsMany] = useState<boolean>(false);

  const dataChart: IDataChart[] | null = useMemo(() => {
    if (!bloggerStats) return null;
    if (bloggerStats.posts_tags === undefined) return null;
    if (Object.keys(bloggerStats.posts_tags).length == 0) return null;
    const value: IDataChart[] = [];
    for (const key in bloggerStats.posts_tags) {
      const element = bloggerStats.posts_tags[key];
      value.push({ value: element, label: key });
    }
    return value;
  }, [bloggerStats]);

  const refBox1 = useRef<HTMLDivElement>();
  const refBox2 = useRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => {
      if (!refBox1.current || !refBox2.current) return;
      setIsMany(
        refBox2.current.clientHeight - 4 > refBox1.current.clientHeight
      );
    }, 1000);
  }, []);

  const onChangeScroll = () => {
    setScroll(!scroll);
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
                {`Теги под постами`}
              </Typography>
              <Box
                ref={refBox1}
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
                    overflow: !!scroll ? `auto` : `hidden`,
                  }}
                >
                  {!scroll && !!isMany && (
                    <Box
                      sx={{
                        position: `absolute`,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: `100px`,
                        background: `linear-gradient(#fff0, 10%, #fff)`,
                      }}
                    >
                      <Button
                        onClick={onChangeScroll}
                        sx={{ width: `100%`, height: `100%` }}
                      >
                        Раскрыть
                      </Button>
                    </Box>
                  )}
                  <Box ref={refBox2}>
                    <Grid2
                      container
                      spacing={`10px`}
                      width={`calc(100% - 10px)`}
                    >
                      {dataChart
                        .sort((a, b) => b.value - a.value)
                        .map((el, index) => (
                          <Grid2 xs="auto" key={index}>
                            <Stack
                              direction="row"
                              spacing={`5px`}
                              sx={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Chip
                                label={el.label}
                                variant="outlined"
                                size="small"
                              />
                              <Typography variant="caption">
                                {el.value}
                              </Typography>
                            </Stack>
                          </Grid2>
                        ))}
                    </Grid2>
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
