import styles from "./ProductCard.module.scss";

export function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <img src={product.img} alt="" />
      <div className={styles.productCard__data}>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
      <p>{product.category}</p>
    </div>
  );
}
