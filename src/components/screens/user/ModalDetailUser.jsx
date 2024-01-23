import React, { useEffect, useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
} from "@mui/material";
import ModalUpdate from "../../common/ModalUpdate";
import { notify } from "../../../utils/helpers/notify";
import { updateUser } from "../../../utils/api/user";

function ModalDetailUser({ open, handleClose, reloadData, info }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("1");

  const handleReset = () => {
    handleClose();
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setDate("");
    setGender("1");
  };

  const handleUpdateUser = async () => {
    try {
      if (!name || !email || !password) return;
      await updateUser(info?._id, {
        name,
        email,
        password,
        phone,
        date,
        gender,
      });
      notify("success", "Cập nhật tài khoản thành công");
      handleReset();
      await reloadData();
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (info) {
      setName(info?.name);
      setEmail(info?.email);
      setPassword(info?.password);
      setPhone(info?.phone);
      setDate(info?.date);
      setGender(Number(info?.gender));
    }
  }, [info]);

  return (
    <ModalUpdate
      open={open}
      title={"Thông tin tài khoản"}
      handleClose={handleReset}
      handleOk={handleUpdateUser}
    >
      <Grid container spacing={2} component={"form"}>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Họ tên:</Typography>
          <TextField
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Email:</Typography>
          <TextField
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Mật khẩu:</Typography>
          <TextField
            fullWidth
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Số điện thoại:</Typography>
          <TextField
            fullWidth
            size="small"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Sinh nhật:</Typography>
          <TextField
            fullWidth
            size="small"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Giới tính:</Typography>
          <RadioGroup
            row
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <FormControlLabel
              value={"1"}
              control={<Radio size="small" />}
              label="Nam"
            />
            <FormControlLabel
              value={"0"}
              control={<Radio size="small" />}
              label="Nữ"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={6} display={"flex"} gap={1} alignItems={"center"}>
          <Typography variant="subtitle2">Trạng thái:</Typography>
          <Chip
            label={info?.isBlock == "0" ? "Hoạt động" : "Khóa"}
            color={info?.isBlock == "0" ? "success" : "error"}
          />
        </Grid>
        {info?.reasonBlock && (
          <Grid item xs={6} display={"flex"} gap={1}>
            <Typography variant="subtitle2">Lý do tài khoản:</Typography>
            <Typography variant="subtitle2">{info?.reasonBlock}</Typography>
          </Grid>
        )}
      </Grid>
    </ModalUpdate>
  );
}

export default ModalDetailUser;
