import React, { useState } from "react";
import { Typography, TextField, Grid } from "@mui/material";
import ModalUpdate from "../../../common/ModalUpdate";
import { create } from "../../../../utils/api/product";
import { notify } from "../../../../utils/helpers/notify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../utils/firebase";
import ImgUpload from "./ImgUpload";

function ModalAddProduct({ open, handleClose, reloadData }) {
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [struct, setStruct] = useState("");
  const [nameFirstType, setNameFirstType] = useState("");
  const [firstType, setFirstType] = useState("");
  const [nameSecondType, setNameSecondType] = useState("");
  const [secondType, setSecondType] = useState("");

  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [img6, setImg6] = useState("");
  const [img7, setImg7] = useState("");
  const [img8, setImg8] = useState("");
  const [img9, setImg9] = useState("");
  const [img10, setImg10] = useState("");

  const [firstTypeUrl1, setFirstTypeUrl1] = useState("");
  const [firstTypeUrl2, setFirstTypeUrl2] = useState("");
  const [firstTypeUrl3, setFirstTypeUrl3] = useState("");
  const [firstTypeUrl4, setFirstTypeUrl4] = useState("");
  const [firstTypeUrl5, setFirstTypeUrl5] = useState("");
  const [firstTypeUrl6, setFirstTypeUrl6] = useState("");
  const [firstTypeUrl7, setFirstTypeUrl7] = useState("");
  const [firstTypeUrl8, setFirstTypeUrl8] = useState("");
  const [firstTypeUrl9, setFirstTypeUrl9] = useState("");
  const [firstTypeUrl10, setFirstTypeUrl10] = useState("");

  const [secondTypeUrl1, setSecondTypeUrl1] = useState("");
  const [secondTypeUrl2, setSecondTypeUrl2] = useState("");
  const [secondTypeUrl3, setSecondTypeUrl3] = useState("");
  const [secondTypeUrl4, setSecondTypeUrl4] = useState("");
  const [secondTypeUrl5, setSecondTypeUrl5] = useState("");
  const [secondTypeUrl6, setSecondTypeUrl6] = useState("");
  const [secondTypeUrl7, setSecondTypeUrl7] = useState("");
  const [secondTypeUrl8, setSecondTypeUrl8] = useState("");
  const [secondTypeUrl9, setSecondTypeUrl9] = useState("");
  const [secondTypeUrl10, setSecondTypeUrl10] = useState("");

  const images = [
    { src: img1, setSrc: setImg1 },
    { src: img2, setSrc: setImg2 },
    { src: img3, setSrc: setImg3 },
    { src: img4, setSrc: setImg4 },
    { src: img5, setSrc: setImg5 },
    { src: img6, setSrc: setImg6 },
    { src: img7, setSrc: setImg7 },
    { src: img8, setSrc: setImg8 },
    { src: img9, setSrc: setImg9 },
    { src: img10, setSrc: setImg10 },
  ];

  const firstTypeUrl = [
    { src: firstTypeUrl1, setSrc: setFirstTypeUrl1 },
    { src: firstTypeUrl2, setSrc: setFirstTypeUrl2 },
    { src: firstTypeUrl3, setSrc: setFirstTypeUrl3 },
    { src: firstTypeUrl4, setSrc: setFirstTypeUrl4 },
    { src: firstTypeUrl5, setSrc: setFirstTypeUrl5 },
    { src: firstTypeUrl6, setSrc: setFirstTypeUrl6 },
    { src: firstTypeUrl7, setSrc: setFirstTypeUrl7 },
    { src: firstTypeUrl8, setSrc: setFirstTypeUrl8 },
    { src: firstTypeUrl9, setSrc: setFirstTypeUrl9 },
    { src: firstTypeUrl10, setSrc: setFirstTypeUrl10 },
  ];

  const secondTypeUrl = [
    { src: secondTypeUrl1, setSrc: setSecondTypeUrl1 },
    { src: secondTypeUrl2, setSrc: setSecondTypeUrl2 },
    { src: secondTypeUrl3, setSrc: setSecondTypeUrl3 },
    { src: secondTypeUrl4, setSrc: setSecondTypeUrl4 },
    { src: secondTypeUrl5, setSrc: setSecondTypeUrl5 },
    { src: secondTypeUrl6, setSrc: setSecondTypeUrl6 },
    { src: secondTypeUrl7, setSrc: setSecondTypeUrl7 },
    { src: secondTypeUrl8, setSrc: setSecondTypeUrl8 },
    { src: secondTypeUrl9, setSrc: setSecondTypeUrl9 },
    { src: secondTypeUrl10, setSrc: setSecondTypeUrl10 },
  ];

  const setterImgFunctions = [
    setImg1,
    setImg2,
    setImg3,
    setImg4,
    setImg5,
    setImg6,
    setImg7,
    setImg8,
    setImg9,
    setImg10,
  ];

  const setterFirstTypeUrlFunctions = [
    setFirstTypeUrl1,
    setFirstTypeUrl2,
    setFirstTypeUrl3,
    setFirstTypeUrl4,
    setFirstTypeUrl5,
    setFirstTypeUrl6,
    setFirstTypeUrl7,
    setFirstTypeUrl8,
    setFirstTypeUrl9,
    setFirstTypeUrl10,
  ];

  const setterSecondTypeUrlFunctions = [
    setSecondTypeUrl1,
    setSecondTypeUrl2,
    setSecondTypeUrl3,
    setSecondTypeUrl4,
    setSecondTypeUrl5,
    setSecondTypeUrl6,
    setSecondTypeUrl7,
    setSecondTypeUrl8,
    setSecondTypeUrl9,
    setSecondTypeUrl10,
  ];

  const setImgByIndex = (setterFunc, index, url) => {
    const setter = setterFunc[index - 1];
    if (setter) {
      setter(url);
    }
  };

  const handleReset = () => {
    handleClose();
    setName("");
    setLabel("");
    setDiscountPrice("");
    setPrice("");
    setDescription("");
    setStruct("");
    setImg1("");
    setImg2("");
    setImg3("");
    setImg4("");
    setImg5("");
    setImg6("");
    setImg7("");
    setImg8("");
    setImg9("");
    setImg10("");
    setNameFirstType("");
    setFirstType("");
    setFirstTypeUrl1("");
    setFirstTypeUrl2("");
    setFirstTypeUrl3("");
    setFirstTypeUrl4("");
    setFirstTypeUrl5("");
    setFirstTypeUrl6("");
    setFirstTypeUrl7("");
    setFirstTypeUrl8("");
    setFirstTypeUrl9("");
    setFirstTypeUrl10("");
    setNameSecondType("");
    setSecondType("");
    setSecondTypeUrl1("");
    setSecondTypeUrl2("");
    setSecondTypeUrl3("");
    setSecondTypeUrl4("");
    setSecondTypeUrl5("");
    setSecondTypeUrl6("");
    setSecondTypeUrl7("");
    setSecondTypeUrl8("");
    setSecondTypeUrl9("");
    setSecondTypeUrl10("");
  };

  const handleAddProduct = async () => {
    try {
      await create({
        name,
        label,
        price: Number(price),
        discountPrice: Number(discountPrice),
        description,
        struct,
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
        img10,
        nameFirstType,
        firstType: firstType?.split(","),
        nameSecondType,
        secondType: secondType?.split(","),
        firstTypeUrl1,
        firstTypeUrl2,
        firstTypeUrl3,
        firstTypeUrl4,
        firstTypeUrl5,
        firstTypeUrl6,
        firstTypeUrl7,
        firstTypeUrl8,
        firstTypeUrl9,
        firstTypeUrl10,
        secondTypeUrl1,
        secondTypeUrl2,
        secondTypeUrl3,
        secondTypeUrl4,
        secondTypeUrl5,
        secondTypeUrl6,
        secondTypeUrl7,
        secondTypeUrl8,
        secondTypeUrl9,
        secondTypeUrl10,
      });
      notify("success", "Thêm sản phẩm thành công");
      reloadData();
    } catch (error) {}
    handleReset();
  };

  function handleUploadImg(event, index, lstFunc) {
    const file = event.target.files[0];
    const storageRef = ref(storage, `/files/${file.name + Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgByIndex(lstFunc, index, url);
        });
      }
    );
    event.target.value = null;
  }

  return (
    <ModalUpdate
      open={open}
      title={"Thêm sản phẩm"}
      maxWidth={"lg"}
      handleClose={handleReset}
      handleOk={handleAddProduct}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography>Tên sản phẩm:</Typography>
          <TextField
            fullWidth
            size="small"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Nhãn:</Typography>
          <TextField
            fullWidth
            size="small"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Giá gốc:</Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography>Giá khuyến mại:</Typography>
          <TextField
            fullWidth
            size="small"
            type="number"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </Grid>

        {images.map((img, index) => (
          <ImgUpload
            name={"Ảnh"}
            key={index}
            img={img.src}
            handleUploadImg={(e) =>
              handleUploadImg(e, index + 1, setterImgFunctions)
            }
            setImg={img.setSrc}
            index={index + 1}
          />
        ))}

        <Grid item xs={6}>
          <Typography>Mô tả:</Typography>
          <TextField
            fullWidth
            size="small"
            multiline
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Thông số máy:</Typography>
          <TextField
            fullWidth
            size="small"
            multiline
            rows={8}
            value={struct}
            onChange={(e) => setStruct(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Tên phân loại 1:</Typography>
          <TextField
            fullWidth
            size="small"
            value={nameFirstType}
            onChange={(e) => setNameFirstType(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Thêm loại 1: (ngăn cách nhau bởi dấu ,)</Typography>
          <TextField
            fullWidth
            size="small"
            value={firstType}
            onChange={(e) => setFirstType(e.target.value)}
          />
        </Grid>

        {firstTypeUrl.map((img, index) => (
          <ImgUpload
            name={"Phân loại 1 -"}
            key={index}
            img={img.src}
            handleUploadImg={(e) =>
              handleUploadImg(e, index + 1, setterFirstTypeUrlFunctions)
            }
            setImg={img.setSrc}
            index={index + 1}
          />
        ))}

        <Grid item xs={6}>
          <Typography>Tên phân loại 2:</Typography>
          <TextField
            fullWidth
            size="small"
            value={nameSecondType}
            onChange={(e) => setNameSecondType(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography>Thêm loại 2: (ngăn cách nhau bởi dấu ,)</Typography>
          <TextField
            fullWidth
            size="small"
            value={secondType}
            onChange={(e) => setSecondType(e.target.value)}
          />
        </Grid>

        {secondTypeUrl.map((img, index) => (
          <ImgUpload
            name={"Phân loại 2 -"}
            key={index}
            img={img.src}
            handleUploadImg={(e) =>
              handleUploadImg(e, index + 1, setterSecondTypeUrlFunctions)
            }
            setImg={img.setSrc}
            index={index + 1}
          />
        ))}
      </Grid>
    </ModalUpdate>
  );
}

export default ModalAddProduct;
