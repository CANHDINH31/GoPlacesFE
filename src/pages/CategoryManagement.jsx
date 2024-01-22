import React, { useState } from "react";
import AdminLayout from "../components/layout/AuthLayout";
import { Box, Button, TextField, Typography } from "@mui/material";
import ModalUpdate from "../components/common/ModalUpdate";
import { listCategory, updateCategory } from "../utils/api/category";
import { notify } from "../utils/helpers/notify";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";

function CategoryManagement() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const [idUpdate, setIdUpdate] = useState("");
  const [product, setProduct] = useState([]);

  const columns = [
    { field: "index", headerName: "Số thứ tự", width: 200 },
    { field: "name", headerName: "Tên ", width: 250 },
    {
      field: "proudct",
      headerName: "Số lượng sản phẩm",
      width: 250,
      renderCell: (params) => params?.row?.product?.length,
    },
    {
      field: "",
      headerName: "Hành động",
      width: 250,
      renderCell: (params) => (
        <Box display={"flex"} gap={1}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleOpenConfirmUpdate(params.row)}
          >
            Chi tiết
          </Button>
        </Box>
      ),
    },
  ];

  const productColumns = [
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 250,
      renderCell: (params) => (
        <Box
          component={"img"}
          src={params?.row?.img1 || "/img/noImage.jpg"}
          width={120}
          height={120}
          sx={{ objectFit: "cover", borderRadius: 2, border: "1px solid #ddd" }}
        />
      ),
    },
    { field: "name", headerName: "Tên ", width: 300 },

    {
      field: "",
      headerName: "Hành động",
      width: 300,
      renderCell: (params) => (
        <Box display={"flex"} gap={1}>
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={() => {
              const newProducts = product?.filter((i) => i.id != params.row.id);
              setProduct(newProducts);
            }}
          >
            Xóa
          </Button>
        </Box>
      ),
    },
  ];

  const handleOpenConfirmUpdate = (data) => {
    setName(data?.name);
    setIdUpdate(data?.id);
    setProduct(data?.product?.map((e) => ({ ...e, id: e?._id })));
    setIsOpenUpdate(true);
  };

  const handleResetUpdate = () => {
    setIsOpenUpdate(false);
    setIdUpdate("");
    setProduct([]);
    setName("");
  };

  const hanleUpdateCategory = async () => {
    try {
      if (name) {
        await updateCategory(idUpdate, {
          name,
          product: product?.map((e) => e?._id),
        });
        notify("success", "Cập nhật danh mục thành công");
      }
      getListCategory();
    } catch (error) {}
    handleResetUpdate();
  };

  const getListCategory = async () => {
    try {
      const res = await listCategory();
      setData(
        res.data?.map((e, index) => ({ id: e._id, ...e, index: index + 1 }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListCategory();
  }, []);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Quản lý danh mục
        </Typography>
      </Box>
      <Box mt={4}>
        <DataGrid rows={data} columns={columns} />
      </Box>

      {/* <Modal update */}
      <ModalUpdate
        open={isOpenUpdate}
        title={"Chi tiết danh mục"}
        handleClose={handleResetUpdate}
        maxWidth={"md"}
        handleOk={hanleUpdateCategory}
      >
        <Typography mt={1}>Tên danh mục:</Typography>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
        />

        <Typography mt={4}>Danh sách sản phẩm:</Typography>

        <Box height={400}>
          <DataGrid rows={product} columns={productColumns} rowHeight={150} />
        </Box>
      </ModalUpdate>
    </AdminLayout>
  );
}

export default CategoryManagement;
