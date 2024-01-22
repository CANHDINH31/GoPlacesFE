import Login from "../pages/Login";
import UserManagement from "../pages/UserManagement";

export const listRouter = [
  { path: "/", element: <UserManagement /> },
  { path: "/login", element: <Login /> },
];
