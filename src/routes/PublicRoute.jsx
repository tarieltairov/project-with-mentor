import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export function PublicRoute() {
  const { isAuth } = useSelector((state) => state.auth);

  return isAuth ? <Navigate to="/" /> : <Outlet />;
}
