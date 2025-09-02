import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ProductCard } from "@/components/ProductCard";
import { addProductToCart, getProducts } from "@/store/actions/actions";

import styles from "./Cart.module.scss";

export function Cart() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (user.cart.length > 0) {
      dispatch(getProducts({ id: user.cart.map((el) => el.productId) }));
    }
  }, [user]);

  const handleClickOnCartPageAdd = (productId) => {
    const newCart = user.cart.map((el) => {
      if (el.productId == productId) {
        return { ...el, count: el.count + 1 };
      } else {
        return el;
      }
    });

    dispatch(addProductToCart({ ...user, cart: newCart }));
  };

  const handleClickOnCartPageRemove = (productId) => {
    const newCart = user.cart
      .map((el) => {
        if (el.count !== 1) {
          if (el.productId == productId) {
            return { ...el, count: el.count - 1 };
          } else {
            return el;
          }
        }
      })
      .filter((el) => el);

    dispatch(addProductToCart({ ...user, cart: newCart }));
  };

  if (user.cart.length <= 0) {
    return <p>Добавьте что-то в корзину</p>;
  }

  return (
    <>
      <div className={styles.cart}>
        {products.length > 0 &&
          products.map((el) => (
            <ProductCard
              key={el.id}
              product={el}
              handleClickOnCartPageAdd={() => handleClickOnCartPageAdd(el.id)}
              handleClickOnCartPageRemove={() =>
                handleClickOnCartPageRemove(el.id)
              }
              total={user.cart.find((item) => item.productId == el.id)?.count}
            />
          ))}
      </div>
    </>
  );
}
