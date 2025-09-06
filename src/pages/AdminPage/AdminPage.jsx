import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ProductCardAdmin } from "@/components/ProductCardAdmin";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getCategories,
  getProducts,
} from "@/store/actions/actions";

import styles from "./AdminPage.module.scss";
import { ProductFormModal } from "@/components/ProductCardForm";

export function AdminPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [productEdit, setProductEdit] = useState(null);

  const { productsLoading, products, total } = useSelector(
    (state) => state.products
  );
  const { categoriesLoading, categories } = useSelector(
    (state) => state.categories
  );

  // прокидывание запросов c query params
  useEffect(() => {
    dispatch(
      getProducts({
        _limit: 2,
        _page: page,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  if (productsLoading || categoriesLoading) {
    <p>Загрузка...</p>;
  }

  const handleCategoryButtonClick = (categoryId) => {
    dispatch(
      getProducts({
        category: categoryId,
      })
    );
  };

  const pages = Math.ceil(total / 2);

  return (
    <>
      <div className={styles.buttons}>
        <div className={styles.categories}>
          {categories.length > 0 &&
            categories.map((el, idx) => (
              <button
                onClick={() => handleCategoryButtonClick(el.id)}
                key={idx}
              >
                {el.name}
              </button>
            ))}
        </div>
        <button onClick={() => setCreateModalOpen(true)}>
          Добавить продукт
        </button>
      </div>

      <div className={styles.catalog}>
        {products.length > 0 &&
          products.map((el) => (
            <ProductCardAdmin
              key={el.id}
              product={el}
              handleDelete={() => {
                setPage(1);
                dispatch(deleteProduct(el.id));
              }}
              handleEdit={() => {
                setProductEdit(el);
                setCreateModalOpen(true);
              }}
            />
          ))}
      </div>

      <div className={styles.paginationWrapper}>
        <div className={styles.pagination}>
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page <= 1}
          >
            {"<"}
          </button>
          <p>
            {page}/{pages}
          </p>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page >= pages}
          >
            {">"}
          </button>
        </div>
      </div>

      <ProductFormModal
        isOpen={createModalOpen}
        handleClose={() => {
          setProductEdit(null);
          setCreateModalOpen(false);
        }}
        handleOk={(formData) => {
          dispatch(
            productEdit
              ? editProduct({ ...formData, id: productEdit.id })
              : createProduct(formData)
          );
          setPage(1);
          setProductEdit(null);
          setCreateModalOpen(false);
        }}
        product={productEdit}
      />
    </>
  );
}
