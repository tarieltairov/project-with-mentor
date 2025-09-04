import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/store/slices/authSlice";
import logo from "@assets/react.svg";
import cart from "@assets/images/svg/cart.svg";
import heart from "@assets/images/svg/heart.svg";

import styles from "./Header.module.scss";

const pages = [
  {
    link: "/catalog",
    title: "Каталог",
  },
  {
    link: "/about",
    title: "О нас",
  },
  {
    link: "/reviews",
    title: "Отзывы",
  },
];

export function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return null;
  }

  const pagesWithIcons = [
    {
      link: "/favourite",
      badge: 0,
      icon: heart,
    },
    {
      link: "/cart",
      badge: user?.cart?.length,
      icon: cart,
    },
  ];

  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" onClick={() => navigate("/")} />

      <nav>
        {pages.map((page, index) => (
          <NavLink
            className={({ isActive }) => (isActive ? styles.active : "")}
            key={index}
            to={page.link}
          >
            {page.title}
          </NavLink>
        ))}
      </nav>

      <div className={styles.iconsWrapper}>
        {pagesWithIcons.map((item, index) => (
          <div className={styles.iconWrapper} key={index}>
            {!!item.badge && <span className={styles.badge}>{item.badge}</span>}
            <img
              src={item.icon}
              alt="icon-btn"
              onClick={() => navigate(item.link)}
            />
          </div>
        ))}
      </div>

      <div>
        {user && (
          <p>
            {user.name} <br /> {user.lastName}
          </p>
        )}
        <button onClick={() => dispatch(logout())}>Выйти</button>
      </div>
    </header>
  );
}
