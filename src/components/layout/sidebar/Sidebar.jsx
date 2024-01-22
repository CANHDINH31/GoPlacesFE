import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BiCategory } from "react-icons/bi";
import { RiUserLine, RiHotelLine, RiBus2Line } from "react-icons/ri";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";

export const Sidebar = (
  <React.Fragment>
    <ListItemButton href="/">
      <ListItemIcon>
        <RiUserLine fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Tài khoản" />
    </ListItemButton>
    <ListItemButton href="/tour">
      <ListItemIcon>
        <BiCategory fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Tour du lịch" />
    </ListItemButton>
    <ListItemButton href="/hotel">
      <ListItemIcon>
        <RiHotelLine fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Khách sạn" />
    </ListItemButton>
    <ListItemButton href="/bus">
      <ListItemIcon>
        <RiBus2Line fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Phương tiện" />
    </ListItemButton>
    <ListItemButton href="/food">
      <ListItemIcon>
        <MdOutlineEmojiFoodBeverage fontSize={24} />
      </ListItemIcon>
      <ListItemText primary="Đồ ăn & đồ uống" />
    </ListItemButton>
  </React.Fragment>
);
