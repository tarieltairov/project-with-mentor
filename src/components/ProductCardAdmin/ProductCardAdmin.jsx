import React from "react";

import styles from "./ProductCardAdmin.module.scss";

export function ProductCardAdmin({ product, handleDelete, handleEdit }) {
  return (
    <div className={styles.productCardAdmin}>
      <img src={product.img} alt="" />
      <div className={styles.productCard__data}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
      <p>{product.category}</p>
      <div className={styles.buttons}>
        <button onClick={handleEdit}>Редактировать</button>
        <button onClick={handleDelete}>Удалить</button>
      </div>
    </div>
  );
}

export default ProductCardAdmin;
