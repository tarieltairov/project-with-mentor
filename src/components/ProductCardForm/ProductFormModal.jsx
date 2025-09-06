import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategories } from "@/store/actions/actions";

import styles from "./ProductFormModal.module.scss";

export function ProductFormModal({
  isOpen = false,
  handleClose,
  handleOk,
  product,
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    img: "",
  });

  const dispatch = useDispatch();

  const { categoriesLoading, categories } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (categories.length > 0 && !product) {
      setFormData((prev) => ({ ...prev, category: categories[0].id }));
    }
  }, [categories]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        img: product.img,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleOk(formData);
  };

  return isOpen && !categoriesLoading ? (
    <>
      <form
        onSubmit={handleSubmit}
        action=""
        className={styles.ProductFormModal}
      >
        <input
          type="text"
          name="name"
          placeholder="Наименование"
          required
          onChange={handleChange}
          defaultValue={product?.name}
        />
        <input
          type="number"
          name="price"
          placeholder="Цена"
          required
          onChange={handleChange}
          defaultValue={product?.price}
        />
        <input
          type="text"
          name="description"
          placeholder="Описание товара"
          required
          onChange={handleChange}
          defaultValue={product?.description}
        />

        <select
          name="category"
          id="category-select"
          placeholder="Выберите категорию"
          required
          onChange={handleChange}
          defaultValue={product?.category}
        >
          {categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>

        <input
          type="text"
          name="img"
          placeholder="Ссылка на картинку"
          required
          onChange={handleChange}
          defaultValue={product?.img}
        />

        <div className={styles.buttons}>
          <button onClick={handleClose}>Отмена</button>
          <button type="submit">Сохранить</button>
        </div>
      </form>
      <div className={styles.overlay}></div>
    </>
  ) : (
    <></>
  );
}
