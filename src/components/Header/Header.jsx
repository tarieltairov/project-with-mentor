import styles from "./Header.module.scss";
import logo from "@assets/react.svg";
import cart from "@assets/images/svg/cart.svg";
import heart from "@assets/images/svg/heart.svg";
import { NavLink, useNavigate } from "react-router-dom";

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

const pagesWithIcons = [
  {
    link: "/favourite",
    badge: 0,
    icon: heart,
  },
  {
    link: "/cart",
    badge: 0,
    icon: cart,
  },
];

export function Header() {
  const navigate = useNavigate();

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
          <img
            key={index}
            src={item.icon}
            alt="icon-btn"
            onClick={() => navigate(item.link)}
          />
        ))}
      </div>
    </header>
  );
}
