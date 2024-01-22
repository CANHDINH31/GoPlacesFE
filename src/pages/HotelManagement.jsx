import React, { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AuthLayout";
import { Box, Typography, Button } from "@mui/material";
import ConfirmDelete from "../components/common/ConfirmDelete";
import { notify } from "../utils/helpers/notify";
import { DataGrid } from "@mui/x-data-grid";
import ModalAddHotel from "../components/screens/hotel/ModalAddHotel";
import { deleteHotel, listHotel } from "../utils/api/hotel";
import ModalDetailHotel from "../components/screens/hotel/ModalDetailHotel";

function HotelManagement() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [data, setData] = useState([]);
  const [infoUpdate, setInfoUpdate] = useState({});

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 150,
    },
    { field: "description", headerName: "Description", width: 200 },
    { field: "rating", headerName: "Rating", width: 150 },
    { field: "timeCheckin", headerName: "Time Checkin", width: 150 },
    { field: "timeCheckout", headerName: "Time Checkout", width: 200 },
    { field: "address", headerName: "Address", width: 150 },
    {
      field: "",
      headerName: "Hành động",
      width: 200,
      renderCell: (params) => (
        <Box display={"flex"} gap={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleOpenConfirmUpdate(params.row)}
          >
            Chi tiết
          </Button>
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={() => handleOpenConfirmDelete(params.row.id)}
          >
            Xóa
          </Button>
        </Box>
      ),
    },
  ];

  const getListHotel = async () => {
    try {
      const res = await listHotel();
      setData(res?.data?.data?.map((e) => ({ id: e._id, ...e })));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenConfirmDelete = (id) => {
    setIsOpenDelete(true);
    setIdDelete(id);
  };

  const handleOpenConfirmUpdate = (data) => {
    setInfoUpdate(data);
    setIsOpenUpdate(true);
  };

  const handleDeleteHotel = async () => {
    try {
      await deleteHotel(idDelete);
      getListHotel();
      notify("success", "Xoá hotel thành công");
    } catch (error) {}
    setIsOpenDelete(false);
  };

  useEffect(() => {
    getListHotel();
  }, []);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Quản lý khách sạn
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Button
            variant="contained"
            onClick={() => setIsOpenAdd(true)}
            size="small"
          >
            Thêm khách sạn
          </Button>
        </Box>
      </Box>
      <Box mt={4} height={"70vh"}>
        <DataGrid disableRowSelectionOnClick rows={data} columns={columns} />
      </Box>

      <ModalAddHotel
        open={isOpenAdd}
        handleClose={() => setIsOpenAdd(false)}
        reloadData={getListHotel}
      />

      <ModalDetailHotel
        open={isOpenUpdate}
        handleClose={() => setIsOpenUpdate(false)}
        reloadData={getListHotel}
        info={infoUpdate}
      />

      {/* Modal delete */}
      <ConfirmDelete
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleOk={handleDeleteHotel}
      />
    </AdminLayout>
  );
}

export default HotelManagement;
