// import Home from "../pages";
// import CategoryManagement from "../pages/CategoryManagement";
// import OrderManagement from "../pages/OrderManagement";
import Login from "../pages/Login";
import ProductManagement from "../pages/ProductManagement";

export const listRouter = [
  { path: "/", element: <ProductManagement /> },
  { path: "/login", element: <Login /> },
  // { path: "/", element: <CategoryManagement /> },
  // { path: "/", element: <OrderManagement /> },
  // { path: "/", element: <Home /> },
];
