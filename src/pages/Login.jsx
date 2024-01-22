import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { login } from "../utils/api/auth";
import { notify } from "../utils/helpers/notify";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res?.data?.data?.role == 1) {
        notify("success", "Đăng nhập thành công");
        localStorage.setItem("user", JSON.stringify(res.data.data));
        navigate("/");
      } else {
        notify("error", "Đăng nhập không thành công");
      }
    } catch (error) {
      notify("error", error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) return navigate("/");
  }, []);

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Paper elevation={3}>
        <Box p={4} minWidth={"20vw"} component={"form"} onSubmit={handleLogin}>
          <Typography variant="h6" fontWeight={600} textAlign={"center"}>
            ĐĂNG NHẬP HỆ THỐNG
          </Typography>
          <Box mt={4}>
            <Box>
              <Typography variant="subtitle2">Email: </Typography>
              <TextField
                size="small"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle2">Mật khẩu: </Typography>
              <TextField
                size="small"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Box mt={2} textAlign={"center"}>
              <Button variant="contained" size="small" type="submit">
                Đăng nhập
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Stack>
  );
}

export default Login;
