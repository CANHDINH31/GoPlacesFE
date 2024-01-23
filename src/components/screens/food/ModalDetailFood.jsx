import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import ModalUpdate from "../../common/ModalUpdate";
import { notify } from "../../../utils/helpers/notify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../utils/firebase";
import ImgUpload from "../../common/ImgUpload";
import { updateFood } from "../../../utils/api/food";

function ModalDetailFood({ open, handleClose, reloadData, info }) {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState();
  const [price, setPrice] = useState("");

  const images = [
    { src: url1, setSrc: setUrl1 },
    { src: url2, setSrc: setUrl2 },
    { src: url3, setSrc: setUrl3 },
    { src: url4, setSrc: setUrl4 },
  ];

  const setterImgFunctions = [setUrl1, setUrl2, setUrl3, setUrl4];

  const setImgByIndex = (setterFunc, index, url) => {
    const setter = setterFunc[index - 1];
    if (setter) {
      setter(url);
    }
  };

  const handleReset = () => {
    handleClose();
    setUrl1("");
    setUrl2("");
    setUrl3("");
    setUrl4("");
    setName("");
    setDescription("");
    setTime("");
    setAddress("");
    setPhone(0);
    setPrice("");
  };

  const handleUpdateFood = async () => {
    try {
      await updateFood(info?._id, {
        url1,
        url2,
        url3,
        url4,
        name,
        description,
        time,
        address,
        phone,
        price,
      });
      notify("success", "Cập nhật thành công");
      reloadData();
    } catch (error) {}
    handleReset();
  };

  function handleUploadImg(event, index, lstFunc) {
    const file = event.target.files[0];
    const storageRef = ref(storage, `/goPlaces/${file.name + Date.now()}`);
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

  useEffect(() => {
    setUrl1(info?.url1);
    setUrl2(info?.url2);
    setUrl3(info?.url3);
    setUrl4(info?.url4);
    setName(info?.name);
    setDescription(info?.description);
    setTime(info?.time);
    setAddress(info?.address);
    setPhone(info?.phone);
    setPrice(info?.price);
  }, [info]);

  return (
    <ModalUpdate
      open={open}
      title={"Thông tin đồ ăn & đô uống"}
      maxWidth={"lg"}
      handleClose={handleReset}
      handleOk={handleUpdateFood}
    >
      <Grid container spacing={2}>
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
        <Grid item xs={3}>
          <Typography variant="subtitle2">Tên:</Typography>
          <TextField
            size="small"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Mô tả:</Typography>
          <TextField
            size="small"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle2">Thời gian mở cửa:</Typography>
          <TextField
            size="small"
            fullWidth
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Grid>

        <Grid item xs={3}>
          <Typography variant="subtitle2">Địa chỉ:</Typography>
          <TextField
            size="small"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Số điện thoại:</Typography>
          <TextField
            size="small"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Giá:</Typography>
          <TextField
            size="small"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Grid>
      </Grid>
    </ModalUpdate>
  );
}

export default ModalDetailFood;
