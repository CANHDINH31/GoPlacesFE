import { Box, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { convertCurrency } from "../../../utils/helpers/convertCurrency";
import {
  renderLabelPrice,
  renderRandomKeyword,
  renderSpecialOffer,
} from "../../../utils/helpers/keyword";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../utils/redux/cartSlice";
import { notify } from "../../../utils/helpers/notify";

const Breadcrumb = styled(Typography)({
  color: "#222",
  opacity: 0.6,
  transition: "all .3s ease",
  fontWeight: 500,

  "&:hover": {
    opacity: 1,
    color: "#111",
  },
});

const TextWithBorderDot = styled(Typography)({
  cursor: "pointer",
  padding: "5px 0",
  borderTop: "1px solid #ddd",
  fontSize: 14,
});

const AmountWrap = styled(Box)({
  display: "flex",
  alignItems: "center",
  border: "1px solid #ddd",
  width: "min-content",
  gap: 12,
});

const ButtonConfig = styled("button")({
  border: "none",
  background: "transparent",
  padding: "12px",
  fontSize: 16,
  transition: "all .3s ease",

  "&:hover": {
    background: "#f1f1f1",
  },
});

const ButtonAdd = styled("button")({
  border: "none",
  background: "#dd3333",
  fontSize: 16,
  color: "white",
  fontWeight: 600,
  transition: "all .3s ease",

  "&:hover": {
    boxShadow: "inset 0 0 0 100px rgba(0,0,0,.2)",
  },
});

const TypeButton = styled("button")({
  border: "none",
  background: "transparent",
  boxShadow: "0 0 0 1px #d5d5d5",
  fontSize: 14,
  padding: "10px 8px",
  color: "#666",
  "&.active": {
    boxShadow: "0 0 0 1px #dd3333",
  },
});

function RightProduct({ info }) {
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(1);
  const [listType, setListType] = useState([]);
  const [keyword, setKeyWord] = useState([]);
  const [type, setType] = useState("");

  useEffect(() => {
    info?.firstType?.length > 0 && setListType(info.firstType?.filter(Boolean));
    const newKeyword = [
      info?.label,
      renderLabelPrice(info?.discountPrice),
      renderRandomKeyword(),
      renderSpecialOffer(info?.price, info?.discountPrice),
    ];

    setKeyWord(newKeyword?.filter(Boolean));
  }, [info]);

  const handleAddToCart = () => {
    dispatch(addToCart({ info, amount, type }));
    notify("success", "Thêm giỏ hàng thành công");
  };

  useEffect(() => {
    listType?.length > 0 && setType(listType[0]);
  }, [listType]);

  return (
    <Box>
      <Box sx={{ cursor: "pointer" }}>
        <Breadcrumb component={"span"}>TRANG CHỦ</Breadcrumb>
        <Breadcrumb component={"span"}> / </Breadcrumb>
        <Breadcrumb component={"span"}>THÔNG TIN CHI TIẾT</Breadcrumb>
      </Box>
      <Typography mt={"12px"} color={"#dd3333"} fontWeight={600} fontSize={20}>
        {info?.name}
      </Typography>
      <Box mt={"12px"}>
        <TextWithBorderDot>
          Danh mục: {` ${info?.listCategory?.join(" - ")}`}
        </TextWithBorderDot>
        <TextWithBorderDot>
          Từ khóa: {` ${keyword?.join(", ")}`}
        </TextWithBorderDot>
      </Box>
      <Box mt={"20px"} display={"flex"} gap={2} alignItems={"center"}>
        <Box
          display={"flex"}
          alignItems={"flex-start"}
          color={"#dd3333"}
          sx={{ textDecoration: "line-through" }}
        >
          <Typography fontSize={22}>{convertCurrency(info?.price)}</Typography>
          <Typography> ₫</Typography>
        </Box>
        <Box display={"flex"} alignItems={"flex-start"} color={"#dd3333"}>
          <Typography fontSize={22} fontWeight={600}>
            {convertCurrency(info?.discountPrice)}
          </Typography>
          <Typography fontSize={18} fontWeight={600}>
            {" "}
            ₫
          </Typography>
        </Box>
      </Box>
      <Box display={"flex"} mt={"20px"} gap={4}>
        <AmountWrap>
          <ButtonConfig onClick={() => amount > 1 && setAmount(amount - 1)}>
            -
          </ButtonConfig>
          <Typography fontSize={16}>{amount}</Typography>
          <ButtonConfig onClick={() => setAmount(amount + 1)}>+</ButtonConfig>
        </AmountWrap>
        <ButtonAdd onClick={handleAddToCart}>THÊM VÀO GIỎ HÀNG</ButtonAdd>
      </Box>
      {listType?.length > 0 && (
        <Box mt={"20px"}>
          <Typography>Phân loại:</Typography>
          <Box mt={"12px"} display={"flex"} gap={1} flexWrap={"wrap"}>
            {listType?.map((e, index) => (
              <TypeButton
                onClick={() => setType(e)}
                key={index}
                className={e == type ? "active" : ""}
              >
                {e}
              </TypeButton>
            ))}
          </Box>
        </Box>
      )}

      <Box display={"flex"} mt={"20px"} alignItems={"center"}>
        <Box
          display={"flex"}
          alignItems={"center"}
          gap={1}
          border={"2px solid rgba(0,0,0,.1)"}
          padding={"6px 14px"}
          color={"#dd3333"}
        >
          <IoMenu fontWeight={600} />
          <Typography fontWeight={600}>THÔNG TIN THÊM </Typography>
        </Box>
        <Box
          flex={1}
          height={"2px"}
          width={"100%"}
          bgcolor={"#dd3333"}
          sx={{ opacity: 0.2 }}
        />
      </Box>
      <Box mt={"12px"}>
        <Box
          component={"div"}
          fontSize={14}
          fontWeight={500}
          whiteSpace={"pre-line"}
          color={"#666"}
          dangerouslySetInnerHTML={{
            __html: info?.description,
          }}
        />
      </Box>
    </Box>
  );
}

export default RightProduct;
