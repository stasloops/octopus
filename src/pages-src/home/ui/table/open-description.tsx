import { IBlogger } from "@/shared/api/blogger/model";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import {
  Button,
  ButtonBase,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

interface OpenRowProps {
  row: IBlogger;
}

export const OpenDescription: FC<OpenRowProps> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {row.description && (
        <ButtonBase onClick={handleClickOpen}>
          <Chip
            sx={{
              background: `#EFFCFC`,
              "& .MuiChip-label": {
                color: `#222657`,
                fontSize: `14px`,
                fontWeight: 600,
              },
              "& .MuiChip-icon": { color: `#222657` },
            }}
            icon={<TouchAppOutlinedIcon />}
            label="Описание"
          />
        </ButtonBase>
      )}

      {!!open && (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{"Описание"}</DialogTitle>
          <DialogContent>
            <Typography sx={{ whiteSpace: `pre-wrap` }}>
              {row.description}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Закрыть</Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
