import { Box, Typography, styled } from "@mui/material";
import React from "react";

const Divider = styled(Box)({
  background: "#dd3333",
  height: "2px",
  flex: 1,
  opacity: 0.5,
});

function Warning() {
  return (
    <Box>
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Divider />
        <Typography
          fontSize={{ xs: 16, sm: 20 }}
          fontWeight={600}
          textAlign={{ xs: "center", sm: "unset" }}
        >
          MANG ĐẾN NHỮNG TRẢI NGHIỆM VAPE POD TỐT NHẤT CHÍNH LÀ HẠNH PHÚC CỦA
          JINVAPE SYSTEM
        </Typography>
        <Divider />
      </Box>
      <Box
        mt={"40px"}
        padding={"1% 5%"}
        borderRadius={"10px"}
        border={"8px solid #B70000"}
      >
        <Box>
          <Typography color={"#ED1C24"} component={"span"}>
            CẢNH BÁO:{" "}
          </Typography>
          <Typography component={"span"}>
            Thuốc lá điện tử chỉ dành cho người trưởng thành trên 18 tuổi với
            hàm lượng cho phép.
          </Typography>
        </Box>
        <Box>
          <Typography color={"#ED1C24"} component={"span"}>
            Tuyệt Đối:{" "}
          </Typography>
          <Typography component={"span"}>
            Không sử dụng các loại tinh dầu có chứa cần sa. Việc lạm dụng
            Nicotine có thể làm tăng nhịp tim, tăng huyết áp và buồn nôn.
          </Typography>
        </Box>
        <Typography color={"#ED1C24"} fontWeight={600} component={"span"}>
          JINVAPE Cam Kết : Không bán cho khách hàng dưới 18 tuổi.
        </Typography>
      </Box>
    </Box>
  );
}

export default Warning;
