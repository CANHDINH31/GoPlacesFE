import React, { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AuthLayout";
import { Box, Typography, Button, Chip, TextField } from "@mui/material";
import ConfirmDelete from "../components/common/ConfirmDelete";
import { notify } from "../utils/helpers/notify";
import { DataGrid } from "@mui/x-data-grid";
import ModalAddUser from "../components/screens/user/ModalAddUser";
import { deleteUser, listUser, updateUser } from "../utils/api/user";
import ModalDetailUser from "../components/screens/user/ModalDetailUser";
import ModalUpdate from "../components/common/ModalUpdate";

function UserManagement() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenBlock, setIsOpenBlock] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [idBlock, setIdBlock] = useState("");
  const [data, setData] = useState([]);
  const [infoUpdate, setInfoUpdate] = useState({});
  const [reasonBlock, setReasonBlock] = useState("");

  const columns = [
    {
      field: "name",
      headerName: "Họ tên",
      width: 150,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "password", headerName: "Mật khẩu", width: 100 },
    { field: "date", headerName: "Sinh nhật", width: 120 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },
    {
      field: "isBlock",
      headerName: "Trạng thái",
      width: 120,
      renderCell: (params) => {
        const label = params.row.isBlock == "0" ? "Hoạt động" : "Khóa";
        const color = params.row.isBlock == "0" ? "success" : "error";
        return <Chip label={label} color={color} />;
      },
    },
    {
      field: "reasonBlock",
      headerName: "Lý do khóa tài khoản",
      width: 200,
    },
    {
      field: "",
      headerName: "Hành động",
      width: 280,
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
          {params?.row?.isBlock == "0" ? (
            <Button
              color="secondary"
              variant="contained"
              size="small"
              onClick={() => handleOpenConfirmBlock(params.row.id)}
            >
              Khóa
            </Button>
          ) : (
            <Button
              color="success"
              variant="contained"
              size="small"
              onClick={() => handleActive(params.row.id)}
            >
              Mở
            </Button>
          )}
        </Box>
      ),
    },
  ];

  const getListUser = async () => {
    try {
      const res = await listUser();
      setData(
        res?.data?.data
          ?.map((e) => ({ id: e._id, ...e }))
          ?.filter((e) => e.role != "1")
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenConfirmDelete = (id) => {
    setIsOpenDelete(true);
    setIdDelete(id);
  };

  const handleOpenConfirmBlock = (id) => {
    setIsOpenBlock(true);
    setIdBlock(id);
  };

  const handleOpenConfirmUpdate = (data) => {
    setInfoUpdate(data);
    setIsOpenUpdate(true);
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(idDelete);
      getListUser();
      notify("success", "Xoá tài khoản thành công");
    } catch (error) {}
    setIsOpenDelete(false);
  };

  const handleBlock = async () => {
    try {
      await updateUser(idBlock, {
        isBlock: 1,
        reasonBlock,
      });
      getListUser();
      notify("success", "Khóa tài khoản thành công");
      handleCloseConfirmBlock();
    } catch (error) {}
  };

  const handleActive = async (id) => {
    try {
      await updateUser(id, {
        isBlock: 0,
        reasonBlock: "",
      });
      getListUser();
      notify("success", "Mỏ khóa thành công");
      handleCloseConfirmBlock();
    } catch (error) {}
  };

  const handleCloseConfirmBlock = () => {
    setIsOpenBlock(false);
    setIdBlock("");
    setReasonBlock("");
  };

  useEffect(() => {
    getListUser();
  }, []);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Quản lý tài khoản
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          <Button
            variant="contained"
            onClick={() => setIsOpenAdd(true)}
            size="small"
          >
            Thêm tài khoản
          </Button>
        </Box>
      </Box>
      <Box mt={4} height={"70vh"}>
        <DataGrid disableRowSelectionOnClick rows={data} columns={columns} />
      </Box>

      <ModalAddUser
        open={isOpenAdd}
        handleClose={() => setIsOpenAdd(false)}
        reloadData={getListUser}
      />

      <ModalDetailUser
        open={isOpenUpdate}
        handleClose={() => setIsOpenUpdate(false)}
        reloadData={getListUser}
        info={infoUpdate}
      />

      {/* Modal delete */}
      <ConfirmDelete
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleOk={handleDeleteUser}
      />

      {/* Modal Block */}
      <ModalUpdate
        open={isOpenBlock}
        handleClose={handleCloseConfirmBlock}
        title={"Hộp thoai xác nhận khóa tài khoản"}
        handleOk={handleBlock}
      >
        <Typography variant="subtitle2">Lý do:</Typography>
        <TextField
          size="small"
          fullWidth
          value={reasonBlock}
          onChange={(e) => setReasonBlock(e.target.value)}
        />
      </ModalUpdate>
    </AdminLayout>
  );
}

export default UserManagement;
