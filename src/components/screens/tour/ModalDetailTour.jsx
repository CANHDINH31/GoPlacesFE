import React, { useEffect, useState } from "react";
import { Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import ModalUpdate from "../../common/ModalUpdate";
import { notify } from "../../../utils/helpers/notify";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../../utils/firebase";
import ImgUpload from "../../common/ImgUpload";
import { updateTour } from "../../../utils/api/tour";
import { tourType } from "./ModalAddTour";

function ModalDetailTour({ open, handleClose, reloadData, info }) {
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [url4, setUrl4] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transport, setTransport] = useState("");
  const [numberPeople, setNumberPeople] = useState(0);
  const [place, setPlace] = useState("");
  const [priceA, setPriceA] = useState(0);
  const [priceC, setPriceC] = useState(0);
  const [schedule, setSchedule] = useState("");

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
    setStartDate("");
    setEndDate("");
    setTransport("");
    setNumberPeople(0);
    setPlace("");
    setPriceA(0);
    setPriceC(0);
    setSchedule("");
  };

  const handleAddTour = async () => {
    try {
      await updateTour(info?._id, {
        url1,
        url2,
        url3,
        url4,
        name,
        description,
        type: Number(type),
        startDate,
        endDate,
        transport,
        numberPeople: Number(numberPeople),
        place,
        priceA: Number(priceA),
        priceC: Number(priceC),
        schedule,
      });
      notify("success", "Cập nhật tour du lịch thành công");
      reloadData();
    } catch (error) {}
    handleReset();
  };

  useEffect(() => {
    setUrl1(info?.url1);
    setUrl2(info?.url2);
    setUrl3(info?.url3);
    setUrl4(info?.url4);
    setName(info?.name);
    setDescription(info?.description);
    setType(Number(info?.type));
    setStartDate(info?.startDate);
    setEndDate(info?.endDate);
    setTransport(info?.transport);
    setNumberPeople(info?.numberPeople);
    setPlace(info?.place);
    setPriceA(info?.priceA);
    setPriceC(info?.priceC);
    setSchedule(info?.schedule);
  }, [info]);

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

  return (
    <ModalUpdate
      open={open}
      title={"Thông tin tour du lịch"}
      maxWidth={"lg"}
      handleClose={handleReset}
      handleOk={handleAddTour}
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
          <Typography variant="subtitle2">Loại hình du lịch:</Typography>
          <Select
            size="small"
            fullWidth
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {tourType?.map((e) => (
              <MenuItem value={e.value} key={e.value}>
                {e.label}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Ngày khởi hành:</Typography>
          <TextField
            size="small"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Ngày kết thúc:</Typography>
          <TextField
            size="small"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Vận chuyển:</Typography>
          <TextField
            size="small"
            fullWidth
            value={transport}
            onChange={(e) => setTransport(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Số lượng người:</Typography>
          <TextField
            size="small"
            fullWidth
            value={numberPeople}
            onChange={(e) => setNumberPeople(e.target.value)}
            type="number"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Xuất phát:</Typography>
          <TextField
            size="small"
            fullWidth
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Giá vé người lớn:</Typography>
          <TextField
            size="small"
            fullWidth
            value={priceA}
            onChange={(e) => setPriceA(e.target.value)}
            type="number"
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="subtitle2">Giá vé trẻ em:</Typography>
          <TextField
            size="small"
            fullWidth
            value={priceC}
            onChange={(e) => setPriceC(e.target.value)}
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle2">Lịch trình:</Typography>
          <TextField
            size="small"
            fullWidth
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            multiline={true}
            rows={5}
          />
        </Grid>
      </Grid>
    </ModalUpdate>
  );
}

export default ModalDetailTour;
