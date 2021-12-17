import React from "react";
import { BrowserRouter } from "react-router-dom";

import AuthContextProvider from "./contexts/authContext";
import ProductsContextProvider from "./contexts/productsContext";
import BrandsContextProvider from "./contexts/brandsContext";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import Routing from "./Routing";

import "antd/dist/antd.css";
import "./App.css";
import CartContextProvider from "./contexts/cartContext";

const App = () => {
  return (
    <AuthContextProvider>
      <CartContextProvider>
      <BrandsContextProvider>
        <ProductsContextProvider>
          <BrowserRouter>
            <Header />
            <Routing />
            <Footer />
          </BrowserRouter>
        </ProductsContextProvider>
      </BrandsContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
};

export default App;


/*
crud 
фильтрация
пагинация
поиск
корзина
роутинг
админка
*/