import React, { useEffect } from 'react';
import './style/landing.style.css';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductList,
  getProductListHome,
  setResetProduct,
} from '../../features/product/productSlice';
import Grid from '../../components/grid/Grid';
import Skeleton from '../../components/common/Skeleton';
import ItemEmpty from './components/itemEmpty/ItemEmpty';
import Home from './components/home/Home';

function LandingPage() {
  const dispatch = useDispatch();
  const [query] = useSearchParams();
  const name = query.get('name');
  const category = query.getAll('category');

  const { loading, productList, productListHome, page, totalPageNum } =
    useSelector((state) => state.product);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!name && category.length === 0) {
      if (productListHome.length === 0) {
        dispatch(getProductListHome());
      }
    } else {
      dispatch(getProductList({ page: 1, name, category }));
    }

    return () => {
      dispatch(setResetProduct());
    };
  }, [query]);

  if (!name && category.length === 0) {
    return <Home loading={loading} productListHome={productListHome} />;
  }

  return (
    <main className="landing">
      <div className="wrapper">
        {!loading && productList.length === 0 && <ItemEmpty />}
        <div className="landing__container">
          <Grid
            productList={productList}
            name={name}
            category={category}
            page={page}
            totalPageNum={totalPageNum}
          />
          {loading && <Skeleton />}
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
