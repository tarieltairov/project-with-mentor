import { useSelector } from "react-redux";
import styles from "./ProductCard.module.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function ProductCard({
  product,
  handleAddToCart,
  handleClickOnCartPageAdd,
  handleClickOnCartPageRemove,
  total,
}) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    if (user.cart && user.cart.length) {
      const inCart = user.cart.find((item) => item?.productId === product.id);
      setIsInCart(inCart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className={styles.productCard}>
      <img src={product.img} alt="" />
      <div className={styles.productCard__data}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
      <p>{product.category}</p>
      {handleAddToCart && (
        <button onClick={isInCart ? goToCart : handleAddToCart}>
          {isInCart ? "Перейти" : "Добавить"} в корзину
        </button>
      )}
      {handleClickOnCartPageAdd && handleClickOnCartPageRemove && (
        <>
          <button onClick={handleClickOnCartPageRemove}>Уменьшить</button>
          <button onClick={handleClickOnCartPageAdd}>Увеличить</button>
        </>
      )}
      {total && <p>Количество: {total}</p>}
      {total && <p>Общая цена: {total * product.price}</p>}
    </div>
  );
}
