import React, { useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import ModalUpdate from "../../common/ModalUpdate";
import { notify } from "../../../utils/helpers/notify";
import { register } from "../../../utils/api/auth";

function ModalAddUser({ open, handleClose, reloadData }) {
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

  const handleAddUser = async () => {
    try {
      if (!name || !email || !password) return;
      await register({ name, email, password, phone, date, gender });
      notify("success", "Thêm tài khoản mới thành công");
      handleReset();
      await reloadData();
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  return (
    <ModalUpdate
      open={open}
      title={"Thêm tài khoản"}
      handleClose={handleReset}
      handleOk={handleAddUser}
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
      </Grid>
    </ModalUpdate>
  );
}

export default ModalAddUser;
