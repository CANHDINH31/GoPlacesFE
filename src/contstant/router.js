import Login from "../pages/Login";
import TourManagement from "../pages/TourManagement";
import UserManagement from "../pages/UserManagement";

export const listRouter = [
  { path: "/tour", element: <TourManagement /> },
  { path: "/", element: <UserManagement /> },
  { path: "/login", element: <Login /> },
];
