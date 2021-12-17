import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Auth from "./components/Auth/Auth";
import BrandsList from "./components/BrandsList/BrandsList";
import Cart from './components/cart/Cart'  
import DetailsProduct from "./components/DetailsProduct/DetailsProduct";
import EditProduct from "./components/EditProduct/EditProduct";
import Home from "./components/Home/Home";
import ProductsList from "./components/ProductsList/ProductsList";
import { useAuth } from "./contexts/authContext";
import AdminPage from "./pages/AdminPage";
import Error404 from "./pages/Error404";

const Routing = () => {
  let PUBLIC_ROUTES = [
    {
      link: "/",
      element: <Home />,
      id: 1,
    },
    {
      link: "/products",
      element: <ProductsList />,
      id: 2,
    },
    {
      link: "/auth",
      element: <Auth />,
      id: 3,
    },
    {
      link: "/brands",
      element: <BrandsList />,
      id: 4,
    },
    {
      link: "/products/:id",
      element: <DetailsProduct />,
      id: 5,
    },
    {
      link: "/cart",
      element: <Cart/>
    }
  ];
  const ADMIN_ROUTES = [
      {
          link: "/admin",
          element: <AdminPage />,
          id: 1
      },
      {
        link: "/edit/:id",
        element: <EditProduct />,
        id: 2
      }
  ]

  const {user} = useAuth()
  return (
    <Routes>
      {PUBLIC_ROUTES.map((item) => (
        <Route path={item.link} element={item.element} />
      ))}
      { user ? ADMIN_ROUTES.map((item) => (
        <Route path={item.link} element={user.email ==="tarieltairov1@gmail.com" ? item.element : <Navigate replace to="*" /> } />
      )): null}
      <Route path="*" element={<Error404/>}/>
    </Routes>
  );
};

export default Routing;
