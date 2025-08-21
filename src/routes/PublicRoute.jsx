import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute() {
  const { isAuth } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  return isAuth || token ? <Navigate to="/" /> : <Outlet />;
}
