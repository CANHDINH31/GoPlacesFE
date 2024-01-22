import { Box, Container, Grid } from "@mui/material";
import React from "react";
import ProductCard from "../../../common/ProductCard";
// import ButtonLoadMore from "../../../common/ButtonLoadMore";

function HomeSale({ data }) {
  return (
    <Container>
      <Box py={"20px"}>
        <Box
          component={"img"}
          src={"/img/home/HomeSale.gif"}
          display={"block"}
          sx={{ objectFit: "contain" }}
          width={"100%"}
        />
        <Box mt={"20px"}>
          <Grid container spacing={0.5}>
            {data[0]?.product?.map((e) => (
              <Grid item xs={6} md={2} key={e?._id}>
                <ProductCard item={e} />
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* <Box mt={"6px"} display={"flex"} justifyContent={"center"}>
          <ButtonLoadMore />
        </Box> */}
      </Box>
    </Container>
  );
}

export default HomeSale;
