import React, { useEffect } from 'react';
import './style/landing.style.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Banner from './components/banner/Banner';
import { getProductList } from '../../features/product/productSlice';
import Grid from '../../components/grid/Grid';
import Skeleton from '../../components/common/Skeleton';

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const name = query.get('name');
  const category = query.getAll('category');
  const page = query.get('page') || 1;

  const { loading, productList, totalPageNum } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProductList({ page, name, category }));
  }, [query]);

  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지값 바꿔주기
    let query = `page=${selected + 1}`;
    if (name) query = query + `&name=${name}`;
    if (category.length !== 0) {
      category.forEach((item) => {
        query = query + `&category=${item}`;
      });
    }
    navigate('?' + query);
  };

  if (loading)
    return (
      <main className="landing">
        <div className="landing__container">
          <Skeleton />
        </div>
      </main>
    );

  return (
    <main className="landing">
      {category.length === 0 && <Banner />}
      <div className="landing__container">
        <Grid productList={productList} />
      </div>
    </main>
  );
}

export default LandingPage;
