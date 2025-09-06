import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import "./styles/global.scss";
import { MainLayout } from "./layouts/MainLayout";
// import { Login } from "./pages/Login";
import { PublicRoute } from "./routes/PublicRoute";
import { PrivateRoute } from "./routes/PrivateRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { Auth } from "./pages/Auth";
import { Catalog } from "./pages/Catalog";
import { Cart } from "./pages/Cart";
import { AdminPage } from "./pages/AdminPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Публичные роуты */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Auth />} />
          </Route>

          <Route element={<MainLayout />}>
            {/* Приватные роуты  */}
            <Route element={<PrivateRoute allowedRoles={["user", "admin"]} />}>
              <Route element={<p>главная страница</p>} path="/" />
              <Route element={<Catalog />} path="/catalog" />
              <Route element={<p>О нас</p>} path="/about" />
              <Route element={<p>Отзывы</p>} path="/reviews" />
              <Route element={<p>Избранные</p>} path="/favourite" />
              <Route element={<Cart />} path="/cart" />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route element={<AdminPage />} path="/admin" />
            </Route>
          </Route>

          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </BrowserRouter>
    </Provider>

    // <BrowserRouter>
    //   <Header />
    //   <Routes>
    // <Route element={<p>главная страница</p>} path="/" />
    //     <Route element={<p>Каталог</p>} path="/catalog" />
    //     <Route element={<p>О нас</p>} path="/about" />
    //     <Route element={<p>Отзывы</p>} path="/reviews" />
    //     <Route element={<p>Избранные</p>} path="/favourite" />
    //     <Route element={<p>Корзина</p>} path="/cart" />
    //   </Routes>
    //   <footer>footer</footer>
    // </BrowserRouter>
  );
}

export default App;
