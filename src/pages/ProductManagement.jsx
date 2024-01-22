import React, { useEffect, useState } from "react";
import AdminLayout from "../components/layout/AuthLayout";
import { Box, Typography, Button } from "@mui/material";
import ConfirmDelete from "../components/common/ConfirmDelete";
import { notify } from "../utils/helpers/notify";
import { deleteProduct, listProduct } from "../utils/api/product";
import { DataGrid } from "@mui/x-data-grid";
import ModalAddProduct from "../components/screens/admin/product/ModalAddProduct";
import ModalAddProductToCategory from "../components/screens/admin/product/ModalAddProductToCategory";
import ModalDetailProduct from "../components/screens/admin/product/ModalDetailProduct";

function ProductManagement() {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenAddToCategory, setIsOpenAddToCategory] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const [data, setData] = useState([]);
  const [listId, setListId] = useState([]);
  const [infoUpdate, setInfoUpdate] = useState({});

  const columns = [
    {
      field: "image",
      headerName: "Hình ảnh",
      width: 150,
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
    { field: "name", headerName: "Tên ", width: 200 },
    { field: "description", headerName: "Mô tả", width: 250 },
    { field: "price", headerName: "Giá gốc", width: 100 },
    { field: "discountPrice", headerName: "Giá khuyên mại", width: 150 },
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

  const getListProduct = async () => {
    try {
      const res = await listProduct();
      setData(res.data?.map((e) => ({ id: e._id, ...e })));
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

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(idDelete);
      getListProduct();
      notify("success", "Xoá sản phẩm thành công");
    } catch (error) {}
    setIsOpenDelete(false);
  };

  useEffect(() => {
    getListProduct();
  }, []);

  return (
    <AdminLayout>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography fontWeight={"bold"} fontSize={20}>
          Quản lý sản phẩm
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={1}>
          {listId?.length > 0 && (
            <Button
              variant="contained"
              onClick={() => setIsOpenAddToCategory(true)}
              size="small"
              color="success"
            >
              Thêm sản phẩm vào danh mục
            </Button>
          )}

          <Button
            variant="contained"
            onClick={() => setIsOpenAdd(true)}
            size="small"
          >
            Thêm sản phẩm
          </Button>
        </Box>
      </Box>
      <Box mt={4} height={"70vh"}>
        <DataGrid
          disableRowSelectionOnClick
          checkboxSelection
          rows={data}
          columns={columns}
          rowHeight={150}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setListId(newRowSelectionModel);
          }}
          rowSelectionModel={listId}
        />
      </Box>

      <ModalAddProduct
        open={isOpenAdd}
        handleClose={() => setIsOpenAdd(false)}
        reloadData={getListProduct}
      />

      <ModalDetailProduct
        open={isOpenUpdate}
        handleClose={() => setIsOpenUpdate(false)}
        reloadData={getListProduct}
        info={infoUpdate}
      />

      <ModalAddProductToCategory
        open={isOpenAddToCategory}
        handleClose={() => {
          setListId([]);
          setIsOpenAddToCategory(false);
        }}
        listId={listId}
      />

      {/* Modal delete */}
      <ConfirmDelete
        open={isOpenDelete}
        handleClose={() => setIsOpenDelete(false)}
        handleOk={handleDeleteProduct}
      />
    </AdminLayout>
  );
}

export default ProductManagement;
