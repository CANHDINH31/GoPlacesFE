import React, { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AuthLayout";
import { Box, Typography, Button, Select, MenuItem } from "@mui/material";
import ConfirmDelete from "../components/common/ConfirmDelete";
import { notify } from "../utils/helpers/notify";
import { DataGrid } from "@mui/x-data-grid";
import { listTour } from "../utils/api/tour";
import { listOrder, deleteOrder } from "../utils/api/order";
import ModalDetailOrder from "../components/screens/order/ModalDetailOrder";
import moment from "moment";

function OrderManagement() {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [data, setData] = useState([]);
  const [arrayTour, setArrayTour] = useState([]);
  const [tourId, setTourId] = useState("");
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [infoUpdate, setInfoUpdate] = useState({});

  const columns = [
    {
      field: "user",
      headerName: "Họ tên người đặt",
      width: 200,
      renderCell: (params) => <span>{params?.row?.user?.name}</span>,
    },
    {
      field: "priceA",
      headerName: "Giá vé người lớn",
      width: 150,
      renderCell: (params) => <span>{params?.row?.tour?.priceA}</span>,
    },
    {
      field: "numberPriceA",
      headerName: "Số lượng vé người lớn",
      width: 150,
    },
    {
      field: "priceC",
      headerName: "Giá vé trẻ em",
      width: 150,
      renderCell: (params) => <span>{params?.row?.tour?.priceC}</span>,
    },
    {
      field: "numberPriceC",
      headerName: "Số lượng vé trẻ em",
      width: 150,
    },
    {
      field: "createdAt",
      headerName: "Thời gian đặt",
      width: 200,
      renderCell: (params) => (
        <span>
          {moment(params?.row?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
        </span>
      ),
    },

    {
      field: "action",
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

  const handleOpenConfirmUpdate = (data) => {
    setInfoUpdate(data);
    setIsOpenUpdate(true);
  };

  const handleOpenConfirmDelete = (id) => {
    setIsOpenDelete(true);
    setIdDelete(id);
  };

  const handleDeleteTour = async () => {
    try {
      await deleteOrder(idDelete);
      getListOrder(tourId);
      notify("success", "Xoá thành công");
    } catch (error) {}
    setIsOpenDelete(false);
  };

  const getListTour = async () => {
    try {
      const res = await listTour();
      setArrayTour(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getListOrder = async (id) => {
    try {
      const res = await listOrder(id);
      setData(res?.data?.data?.map((e) => ({ id: e?._id, ...e })));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListTour();
  }, []);

  useEffect(() => {
    tourId && getListOrder(tourId);
  }, [tourId]);

  console.log(data);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Quản lý book tour
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Typography variant="subtitle2" whiteSpace={"nowrap"}>
            Chọn tour:
          </Typography>
          <Select
            size="small"
            fullWidth
            value={tourId}
            sx={{ minWidth: 300 }}
            onChange={(e) => setTourId(e.target.value)}
          >
            {arrayTour?.map((e) => (
              <MenuItem value={e?._id} key={e?._id}>
                {e.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Box mt={4} height={"70vh"}>
        <DataGrid disableRowSelectionOnClick rows={data} columns={columns} />
      </Box>

      <ModalDetailOrder
        open={isOpenUpdate}
        handleClose={() => setIsOpenUpdate(false)}
        reloadData={() => getListOrder(tourId)}
        info={infoUpdate}
      />

      {/* Modal delete */}
      <ConfirmDelete
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleOk={handleDeleteTour}
      />
    </AdminLayout>
  );
}

export default OrderManagement;
