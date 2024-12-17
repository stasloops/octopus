import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";
import {
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { IPage, pageList } from "../model/const";

export const MenuButton: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MenuIcon color="white" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClick={handleClose}
      >
        {pageList.map((el, index) => (
          <PageItem key={index} item={el} />
        ))}
      </Menu>
    </>
  );
};

interface PageItemProps {
  item: IPage;
}

const PageItem: FC<PageItemProps> = ({ item }) => {
  const pathname = usePathname();
  return (
    <MenuItem component={Link} href={item.key}>
      <ListItemIcon>
        {pathname == item.key && <ArrowForwardIosIcon fontSize="small" />}
      </ListItemIcon>
      <Typography variant="inherit"> {item.label}</Typography>
    </MenuItem>
  );
};
