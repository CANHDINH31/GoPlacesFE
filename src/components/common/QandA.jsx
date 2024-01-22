import * as React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function QandA() {
  return (
    <Box>
      <Typography fontSize={20} color={"#DD3333"} fontWeight={600}>
        CÂU HỎI THƯỜNG GẶP
      </Typography>
      <Box mt={"20px"}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ background: "#F9DBD5" }}
          >
            <Typography fontSize={18}>
              Chính sách bảo hành và đổi trả
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box p={"20px"}>
              <Stack gap={2}>
                <Typography color={"#ed1c24"} fontSize={16} fontWeight={600}>
                  Bảo hành cho tất cả các sản phẩm mua tại shop đủ các điều kiện
                  sau:
                </Typography>
                <Typography fontSize={14}>
                  1. Sản phẩm nằm trong danh mục được bảo hành gồm Pod System
                  hoặc Vape.
                </Typography>
                <Typography fontSize={14}>
                  2. Sản phẩm mua tại JINVAPE.
                </Typography>
                <Typography fontSize={14}>
                  3. Sản phẩm được sử dụng đúng theo hướng dẫn của Nhà sản xuất.
                </Typography>
                <Typography fontSize={14}>
                  4. 1 đổi 1 trong vòng 07 ngày kể từ ngày nhận hàng với các sản
                  phẩm Pod System. Bảo hành trong vòng 3 tháng kể từ ngày nhận
                  hàng với các sản phẩm Vape.
                </Typography>
                <Typography fontSize={14}>
                  5. Lỗi người dùng trong thời gian bảo hành, JINVAPE miễn phí
                  kiểm tra, khắc phục sửa chữa và báo giá chi phí phụ kiện thay
                  thế cho khách hàng (nếu có).
                </Typography>
                <Typography
                  color={"#ed1c24"}
                  fontSize={16}
                  fontWeight={600}
                  mt={"20px"}
                >
                  Lỗi người dùng là:
                </Typography>
                <Typography fontSize={14}>
                  1. Lỗi do va đập, rơi vỡ làm trầy xước, móp méo hình dạng ban
                  đầu của sản phẩm.
                </Typography>
                <Typography fontSize={14}>
                  2. Lỗi xung điện, chập mạch do sử dụng sai nguồn sạc.
                </Typography>
                <Typography fontSize={14}>
                  3. Sản phẩm bị ngập nước hoặc chịu tác động của nhiệt độ, áp
                  suất.
                </Typography>
                <Typography fontSize={14}>
                  4. Sản phẩm bị chảy tinh dầu trong máy. – Sản phẩm có dấu hiệu
                  tự ý can thiệp, sữa chữa vào bên trong máy.
                </Typography>
              </Stack>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ background: "#F9DBD5" }}
          >
            <Typography fontSize={18}>
              Dịch Vụ Giao Hàng Tận Nơi Mất Bao Lâu ?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box p={"20px"}>
              <Typography fontSize={14}>
                Nhân viên đang kiểm tra và sẽ liên hệ tới các bạn sớm nhất có
                thể (chậm nhất trong 01 giờ tới (giờ hành chính))
              </Typography>
              <Typography fontSize={14}>
                Nếu bạn có nhu cầu đổi sản phẩm hoặc ship nhanh vui lòng liên hệ
                Hotline: 0916.00.10.20
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ background: "#F9DBD5" }}
          >
            <Typography fontSize={18}>
              Làm Sao Để Mua Hàng Tại JINVAPE
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box p={"20px"}>
              <Typography fontSize={14}>
                Để mua hàng online bạn có thể đặt hàng tại website hoặc liên hệ
                hotline 09.16.00.10.20 (có zalo). Nếu Bạn ở HCM thì đến trực
                tiếp tại Shop để được hỗ trợ mua hàng nhanh nhất
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}