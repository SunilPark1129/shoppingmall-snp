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

  // setup title
  let title;
  function getTitle() {
    if (name) {
      return `LOOKING FOR "${name.toUpperCase()}"`;
    }

    if (!title) {
      let gender = "WOMEN'S";
      if (category[0] === 'male') {
        gender = "MEN'S";
      }

      if (category.length === 1) {
        title = `${gender} CLOTHES`;
      } else {
        title = `${gender} ${category[1].toUpperCase()}`;
      }
    }

    return title;
  }
  title = getTitle();

  return (
    <main className="landing">
      <div className="wrapper">
        {!loading && productList.length === 0 && <ItemEmpty />}
        <header className="landing__header">
          <h1>{title}</h1>
        </header>
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
