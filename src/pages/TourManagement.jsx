import React, { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AuthLayout";
import { Box, Typography, Button } from "@mui/material";
import ConfirmDelete from "../components/common/ConfirmDelete";
import { notify } from "../utils/helpers/notify";
import { DataGrid } from "@mui/x-data-grid";
import { deleteTour } from "../utils/api/tour";
import ModalAddTour from "../components/screens/tour/ModalAddTour";
import { listTour } from "../utils/api/tour";
import ModalDetailTour from "../components/screens/tour/ModalDetailTour";

function TourManagement() {
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
    { field: "startDate", headerName: "Ngày khởi hành", width: 150 },
    { field: "endDate", headerName: "Ngày kết thúc", width: 150 },
    { field: "transport", headerName: "Vận chuyển", width: 200 },
    { field: "numberPeople", headerName: "Số lượng người", width: 150 },
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

  const getListTour = async () => {
    try {
      const res = await listTour();
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

  const handleDeleteTour = async () => {
    try {
      await deleteTour(idDelete);
      getListTour();
      notify("success", "Xoá tour thành công");
    } catch (error) {}
    setIsOpenDelete(false);
  };

  useEffect(() => {
    getListTour();
  }, []);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Quản lý tour du lịch
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Button
            variant="contained"
            onClick={() => setIsOpenAdd(true)}
            size="small"
          >
            Thêm tour du lịch
          </Button>
        </Box>
      </Box>
      <Box mt={4} height={"70vh"}>
        <DataGrid disableRowSelectionOnClick rows={data} columns={columns} />
      </Box>

      <ModalAddTour
        open={isOpenAdd}
        handleClose={() => setIsOpenAdd(false)}
        reloadData={getListTour}
      />

      <ModalDetailTour
        open={isOpenUpdate}
        handleClose={() => setIsOpenUpdate(false)}
        reloadData={getListTour}
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

export default TourManagement;
