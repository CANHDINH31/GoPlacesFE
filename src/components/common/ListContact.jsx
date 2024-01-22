import { Box, Link } from "@mui/material";
import React from "react";
import Contact from "./Contact";

const ListContact = () => {
  return (
    <Box position={"fixed"} bottom={40} left={10} zIndex={999}>
      <Link
        href="https://www.facebook.com/profile.php?id=100067193366909&mibextid=ZbWKwL"
        target="_blank"
      >
        <Contact
          image={"/img/common/FacebookContact.png"}
          bgFill={"rgb(24 ,119 ,242,0.7)"}
          bsFill={"0 0 0 0 #1877F2"}
          bgCircle={"#1877F2"}
        />
      </Link>
      <Link href="https://zalo.me/0349343647" target="_blank">
        <Contact
          image={"/img/common/ZaloContact.png"}
          bgFill={"rgba(33,150,243,.7)"}
          bsFill={"0 0 0 0 #2196F3"}
          bgCircle={"#2196F3"}
        />
      </Link>
      <Link href="https://zalo.me/0349343647" target="_blank">
        <Contact
          image={"/img/common/PhoneContact.png"}
          bgFill={"rgb(221,51,51,.7)"}
          bsFill={"0 0 0 0 #dd3333"}
          bgCircle={"#dd3333"}
        />
      </Link>
    </Box>
  );
};

export default ListContact;
