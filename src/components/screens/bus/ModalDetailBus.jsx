import React, { useEffect, useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import ModalUpdate from "../../common/ModalUpdate";
import { notify } from "../../../utils/helpers/notify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../utils/firebase";
import ImgUpload from "../../common/ImgUpload";
import { updateBus } from "../../../utils/api/bus";

function ModalDetailBus({ open, handleClose, reloadData, info }) {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [route, setRoute] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
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
    setType("");
    setTimeStart("");
    setTimeEnd("");
    setAddress("");
    setPhone(0);
    setPrice("");
    setRating("");
    setRoute("");
  };

  const handleUpdateTour = async () => {
    try {
      await updateBus(info?._id, {
        url1,
        url2,
        url3,
        url4,
        name,
        description,
        type,
        timeStart,
        timeEnd,
        route,
        address,
        phone,
        price,
        rating: Number(rating),
      });
      notify("success", "Cập nhật phương tiện thành công");
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
    setType(info?.type);
    setRoute(info?.route);
    setTimeStart(info?.timeStart);
    setTimeEnd(info?.timeEnd);
    setAddress(info?.address);
    setPhone(info?.phone);
    setPrice(info?.price);
    setRating(info?.rating);
  }, [info]);

  return (
    <ModalUpdate
      open={open}
      title={"Thông tin phương tiện"}
      maxWidth={"lg"}
      handleClose={handleReset}
      handleOk={handleUpdateTour}
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
          <TextField
            size="small"
            fullWidth
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Route:</Typography>
          <TextField
            size="small"
            fullWidth
            value={route}
            onChange={(e) => setRoute(e.target.value)}
          />
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
          <Typography variant="subtitle2">Time Start:</Typography>
          <TextField
            size="small"
            fullWidth
            value={timeStart}
            onChange={(e) => setTimeStart(e.target.value)}
            type="time"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Time End:</Typography>
          <TextField
            size="small"
            fullWidth
            value={timeEnd}
            onChange={(e) => setTimeEnd(e.target.value)}
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

export default ModalDetailBus;
