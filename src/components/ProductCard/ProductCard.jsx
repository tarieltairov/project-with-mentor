import styles from "./ProductCard.module.scss";

export function ProductCard({
  product,
  handleAddToCart,
  handleClickOnCartPageAdd,
  handleClickOnCartPageRemove,
  total,
}) {
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
        <button onClick={handleAddToCart}>Добавить в корзину</button>
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
