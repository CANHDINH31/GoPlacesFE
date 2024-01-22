import React, { useEffect, useState } from "react";
import { Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import ModalUpdate from "../../common/ModalUpdate";
import { notify } from "../../../utils/helpers/notify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../utils/firebase";
import ImgUpload from "../../common/ImgUpload";
import { updateHotel } from "../../../utils/api/hotel";
import { hotelType } from "./ModalAddHotel";

function ModalDetailHotel({ open, handleClose, reloadData, info }) {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(1);
  const [timeCheckin, setTimeCheckin] = useState("");
  const [timeCheckout, setTimeCheckout] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState();
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");

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
    setType(1);
    setTimeCheckin("");
    setTimeCheckout("");
    setAddress("");
    setPhone(0);
    setPrice("");
    setRating("");
  };

  const hanldeUpdateHotel = async () => {
    try {
      await updateHotel(info?._id, {
        url1,
        url2,
        url3,
        url4,
        name,
        description,
        type: Number(type),
        timeCheckin,
        timeCheckout,
        address,
        phone,
        price,
        rating: Number(rating),
      });
      notify("success", "Thêm khách sạn thành công");
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
    setType(Number(info?.type));
    setTimeCheckin(info?.timeCheckin);
    setTimeCheckout(info?.timeCheckout);
    setAddress(info?.address);
    setPhone(info?.phone);
    setPrice(info?.price);
    setRating(info?.rating);
  }, [info]);

  return (
    <ModalUpdate
      open={open}
      title={"Thông tin khách sạn"}
      maxWidth={"lg"}
      handleClose={handleReset}
      handleOk={hanldeUpdateHotel}
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
          <Typography variant="subtitle2">Name:</Typography>
          <TextField
            size="small"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Description:</Typography>
          <TextField
            size="small"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Type:</Typography>
          <Select
            size="small"
            fullWidth
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {hotelType?.map((e) => (
              <MenuItem value={e.value} key={e.value}>
                {e.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Rating:</Typography>
          <TextField
            size="small"
            fullWidth
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Time Check In:</Typography>
          <TextField
            size="small"
            fullWidth
            value={timeCheckin}
            onChange={(e) => setTimeCheckin(e.target.value)}
            type="time"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Time Check Out:</Typography>
          <TextField
            size="small"
            fullWidth
            value={timeCheckout}
            onChange={(e) => setTimeCheckout(e.target.value)}
            type="time"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Address:</Typography>
          <TextField
            size="small"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Phone:</Typography>
          <TextField
            size="small"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Price:</Typography>
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

export default ModalDetailHotel;
