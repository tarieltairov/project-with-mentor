import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCategories, getProducts } from "@/store/actions/actions";
import { ProductCard } from "@/components/ProductCard";

import styles from "./Catalog.module.scss";

export function Catalog() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(null);

  const { productsLoading, products } = useSelector((state) => state.products);
  const { categoriesLoading, categories } = useSelector(
    (state) => state.categories
  );

  // прокидывание запросов c query params
  useEffect(() => {
    dispatch(getProducts({ name_like: search, _sort: sort }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sort]);

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
          products.map((el) => <ProductCard key={el.id} product={el} />)}
      </div>
    </>
  );
}
