import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addProductToCart,
  getCategories,
  getProducts,
} from "@/store/actions/actions";
import { ProductCard } from "@/components/ProductCard";
import { productsPerPage } from "@/shared/constants";

import styles from "./Catalog.module.scss";

export function Catalog() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);

  const { productsLoading, products, total } = useSelector(
    (state) => state.products
  );
  const { categoriesLoading, categories } = useSelector(
    (state) => state.categories
  );
  const { user } = useSelector((state) => state.auth);

  // прокидывание запросов c query params
  useEffect(() => {
    dispatch(
      getProducts({
        name_like: search,
        _sort: sort,
        _limit: productsPerPage,
        _page: page,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort, page]);

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

  const handleSortingButtonClick = (key, asc) => {
    setSort(`${asc ? "" : "-"}${key}`);
  };

  const handleAddToCart = (productId) => {
    const findedProduct = user.cart.find(
      (el) => el.productId == productId
    );

    let newCart = user.cart;

    if (findedProduct) {
      newCart = newCart.map((el) => {
        if (el.productId == productId) {
          return { ...el, count: el.count + 1 };
        } else {
          return el;
        }
      });
    } else {
      newCart = [...newCart, { productId: productId, count: 1 }];
    }

    dispatch(addProductToCart({ ...user, cart: newCart }));
  };

  return (
    <>
      <div className={styles.buttons}>
        <input
          placeholder="введите название товара"
          onChange={(e) => setSearch(e.target.value)}
        />

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
        <div>
          <button onClick={() => handleSortingButtonClick("price", true)}>
            Сортировать по цене по возрастанию
          </button>
          <button onClick={() => handleSortingButtonClick("price", false)}>
            Сортировать по цене по убывания
          </button>
        </div>
      </div>

      <div className={styles.catalog}>
        {products.length > 0 &&
          products.map((el) => (
            <ProductCard
              key={el.id}
              product={el}
              handleAddToCart={() => handleAddToCart(el.id)}
            />
          ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page <= 1}
        >
          {"<"}
        </button>
        <p>
          {page}/{total / productsPerPage}
        </p>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page >= total / productsPerPage}
        >
          {">"}
        </button>
      </div>
    </>
  );
}
