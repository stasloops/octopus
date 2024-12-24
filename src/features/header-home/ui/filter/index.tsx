import {
  Box,
  Button,
  Chip,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { FC } from "react";
import { SearchInput } from "./search-input";

export const FilterElement: FC = () => {
  return (
    <Box
      sx={{
        padding: 2,
        "& .MuiInputBase-root": {
          borderRadius: `20px`,
        },
      }}
    >
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
            <Typography variant="h6">Фильтр</Typography>
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
        <Box sx={{ width: `cacl(100% + 20px)` }}>
          <Grid2 container spacing={`20px`}>
            <Grid2 xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="Кол-во подписчиков"
                variant="outlined"
                size="small"
              />
            </Grid2>
            <Grid2 xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="География аудитории"
                variant="outlined"
                size="small"
              />
            </Grid2>
            <Grid2 xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="Упоминания бренда"
                variant="outlined"
                size="small"
              />
            </Grid2>
            <Grid2 xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="ER% в сообществе"
                variant="outlined"
                size="small"
              />
            </Grid2>
            <Grid2 xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="Аккаунт в другой социальной сети"
                variant="outlined"
                size="small"
              />
            </Grid2>
            <Grid2 xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="Рекламодатели"
                variant="outlined"
                size="small"
              />
            </Grid2>
            <Grid2 xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="Кол-во постов (в блоге за весь период)"
                variant="outlined"
                size="small"
              />
            </Grid2>
            <Grid2 xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="Подтверждённый аккаунт"
                variant="outlined"
                size="small"
              />
            </Grid2>
            <Grid2 xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="Местоположение"
                variant="outlined"
                size="small"
              />
            </Grid2>
            <Grid2 xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="Теги постов"
                variant="outlined"
                size="small"
              />
            </Grid2>
          </Grid2>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: `20px` }}
          >
            Поиск
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};
