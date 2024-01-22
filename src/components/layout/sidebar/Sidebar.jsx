import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BiCategory } from "react-icons/bi";
import { RiProductHuntLine, RiUserLine } from "react-icons/ri";

export const Sidebar = (
  <React.Fragment>
    <ListItemButton href="/">
      <ListItemIcon>
        <RiUserLine fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Người dùng" />
    </ListItemButton>
    <ListItemButton href="/admin/category">
      <ListItemIcon>
        <BiCategory fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Danh mục" />
    </ListItemButton>
    <ListItemButton href="/admin/product">
      <ListItemIcon>
        <RiProductHuntLine fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Sản phẩm" />
    </ListItemButton>
  </React.Fragment>
);
