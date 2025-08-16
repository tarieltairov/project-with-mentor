import styles from "./Header.module.scss";
import logo from "@assets/react.svg";
import cart from "@assets/images/svg/cart.svg";
import heart from "@assets/images/svg/heart.svg";

const pages = [
  {
    link: "",
    title: "Каталог",
  },
  {
    link: "",
    title: "О нас",
  },
  {
    link: "",
    title: "Отзывы",
  },
];

const pagesWithIcons = [
  {
    link: "/favorite",
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
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" />

      <nav>
        {pages.map((page, index) => (
          <a key={index} href={page.link}>
            {page.title}
          </a>
        ))}
      </nav>

      <div className={styles.iconsWrapper}>
        {pagesWithIcons.map((item, index) => (
          <img key={index} src={item.icon} alt="icon-btn" />
        ))}
      </div>
    </header>
  );
}
