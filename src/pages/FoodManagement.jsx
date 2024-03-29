import React, { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AuthLayout";
import { Box, Typography, Button } from "@mui/material";
import ConfirmDelete from "../components/common/ConfirmDelete";
import { notify } from "../utils/helpers/notify";
import { DataGrid } from "@mui/x-data-grid";
import ModalDetailBus from "../components/screens/bus/ModalDetailBus";
import { deleteFood, listFood } from "../utils/api/food";
import ModalAddFood from "../components/screens/food/ModalAddFood";
import ModalDetailFood from "../components/screens/food/ModalDetailFood";

function FoodManagement() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [data, setData] = useState([]);
  const [infoUpdate, setInfoUpdate] = useState({});

  const columns = [
    {
      field: "name",
      headerName: "Tên",
      width: 150,
    },
    { field: "description", headerName: "Mô tả", width: 200 },
    { field: "time", headerName: "Thời gian mở cửa", width: 150 },
    { field: "phone", headerName: "Số điện thoại", width: 200 },
    { field: "address", headerName: "Địa chỉ", width: 150 },
    { field: "price", headerName: "Giá tham khảo", width: 150 },
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

  const getListFood = async () => {
    try {
      const res = await listFood();
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

  const handleDeleteFood = async () => {
    try {
      await deleteFood(idDelete);
      getListFood();
      notify("success", "Xoá thành công");
    } catch (error) {}
    setIsOpenDelete(false);
  };

  useEffect(() => {
    getListFood();
  }, []);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Quản lý đồ ăn & đồ uống
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Button
            variant="contained"
            onClick={() => setIsOpenAdd(true)}
            size="small"
          >
            Thêm đồ ăn & đồ uống
          </Button>
        </Box>
      </Box>
      <Box mt={4} height={"70vh"}>
        <DataGrid disableRowSelectionOnClick rows={data} columns={columns} />
      </Box>

      <ModalAddFood
        open={isOpenAdd}
        handleClose={() => setIsOpenAdd(false)}
        reloadData={getListFood}
      />

      <ModalDetailFood
        open={isOpenUpdate}
        handleClose={() => setIsOpenUpdate(false)}
        reloadData={getListFood}
        info={infoUpdate}
      />

      {/* Modal delete */}
      <ConfirmDelete
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleOk={handleDeleteFood}
      />
    </AdminLayout>
  );
}

export default FoodManagement;
