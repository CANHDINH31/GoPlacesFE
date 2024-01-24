import React, { useEffect, useState } from "react";
import { Typography, TextField, Grid } from "@mui/material";
import ModalUpdate from "../../common/ModalUpdate";
import { notify } from "../../../utils/helpers/notify";
import { updateOrder } from "../../../utils/api/order";

function ModalDetailOrder({ open, handleClose, reloadData, info }) {
  const [numberPriceA, setNumberPriceA] = useState("");
  const [numberPriceC, setNumberPriceC] = useState("");

  const handleReset = () => {
    handleClose();
    setNumberPriceA("");
    setNumberPriceC("");
  };

  const handleUpdateUser = async () => {
    try {
      await updateOrder(info?._id, {
        numberPriceA,
        numberPriceC,
      });
      notify("success", "Cập nhật thành công");
      handleReset();
      await reloadData();
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (info) {
      setNumberPriceA(info?.numberPriceA);
      setNumberPriceC(info?.numberPriceC);
    }
  }, [info]);

  return (
    <ModalUpdate
      open={open}
      title={"Thông tin booking"}
      handleClose={handleReset}
      handleOk={handleUpdateUser}
    >
      <Grid container spacing={2} component={"form"}>
        <Grid item xs={12} display={"flex"} alignItems={"center"} gap={1}>
          <Typography variant="subtitle2">Họ tên người đặt vé:</Typography>
          <Typography variant="subtitle2">{info?.user?.name}</Typography>
        </Grid>
        <Grid item xs={6} display={"flex"} alignItems={"center"} gap={1}>
          <Typography variant="subtitle2">Giá vé người lớn:</Typography>
          <Typography variant="subtitle2">{info?.tour?.priceA}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Số lượng vé người lớn:</Typography>
          <TextField
            fullWidth
            size="small"
            value={numberPriceA}
            onChange={(e) => setNumberPriceA(e.target.value)}
          />
        </Grid>
        <Grid item xs={6} display={"flex"} alignItems={"center"} gap={1}>
          <Typography variant="subtitle2">Giá vé trẻ em:</Typography>
          <Typography variant="subtitle2">{info?.tour?.priceC}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Số lượng vé trẻ em:</Typography>
          <TextField
            fullWidth
            size="small"
            value={numberPriceC}
            onChange={(e) => setNumberPriceC(e.target.value)}
          />
        </Grid>
      </Grid>
    </ModalUpdate>
  );
}

export default ModalDetailOrder;
