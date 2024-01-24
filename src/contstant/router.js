import BusManagement from "../pages/BusManagement";
import FoodManagement from "../pages/FoodManagement";
import HotelManagement from "../pages/HotelManagement";
import Login from "../pages/Login";
import OrderManagement from "../pages/OrderManagement";
import TourManagement from "../pages/TourManagement";
import UserManagement from "../pages/UserManagement";

export const listRouter = [
  { path: "/food", element: <FoodManagement /> },
  { path: "/order", element: <OrderManagement /> },
  { path: "/bus", element: <BusManagement /> },
  { path: "/hotel", element: <HotelManagement /> },
  { path: "/tour", element: <TourManagement /> },
  { path: "/", element: <UserManagement /> },
  { path: "/login", element: <Login /> },
];
