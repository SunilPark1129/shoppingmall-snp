import React, { useEffect, useRef } from 'react';
import './style/landing.style.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Banner from './components/banner/Banner';
import {
  getProductList,
  setResetProduct,
} from '../../features/product/productSlice';
import Grid from '../../components/grid/Grid';
import Skeleton from '../../components/common/Skeleton';

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const name = query.get('name');
  const category = query.getAll('category');
  const mounted = useRef(null);

  const { loading, productList, page, totalPageNum } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (mounted.current) {
      dispatch(getProductList({ page: 1, name, category }));
    } else {
      mounted.current = true;
    }

    return () => {
      dispatch(setResetProduct());
    };
  }, [query]);

  return (
    <main className="landing">
      {category.length === 0 && <Banner />}
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
    </main>
  );
}

export default LandingPage;
