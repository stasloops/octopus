import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import TuneIcon from "@mui/icons-material/Tune";
import { Box, Drawer, IconButton } from "@mui/material";
import { FC, useState } from "react";
import { FilterElement } from "./filter";

export const FilterButton: FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Box>
        <IconButton
          sx={{
            background: `#2B3A8B40`,
            borderRadius: `15px`,
            width: `36px`,
            height: `36px`,
          }}
          onClick={toggleDrawer(true)}
        >
          <TuneIcon color="white" />
        </IconButton>
        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ position: `relative` }}>
            <IconButton
              sx={{ position: `absolute`, top: `47px`, right: `38px` }}
              onClick={toggleDrawer(false)}
            >
              <ClearOutlinedIcon sx={{ color: `#B5CDEF` }} />
            </IconButton>
            <FilterElement />
          </Box>
        </Drawer>
      </Box>
    </>
  );
};
