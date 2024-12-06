import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/card.style.css';
import { currencyFormat } from '../../utils/number';
import { resizeImage } from '../../utils/resizeImage';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { getProductList } from '../../features/product/productSlice';
import { useDispatch } from 'react-redux';

const smWidth = '400';
const lgWidth = '800';

function Card({ item, isLast, page, totalPageNum, name, category, imgFront }) {
  const lastIdxRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const isVisible = useInfiniteScroll(lastIdxRef, { threshold: 1.0 });

  useEffect(() => {
    if (isLast && isVisible && totalPageNum > page) {
      dispatch(getProductList({ page: page + 1, name, category }));
    }
  }, [isVisible]);

  // 세일 값
  const sale = currencyFormat(1 - item.sale / 100);

  // 이미지 최적화하기
  const image = item.image[0].url;

  const moblieImg = resizeImage(image, smWidth);
  const desktopImg = resizeImage(image, lgWidth);
  let moblieImg2 = '';
  let desktopImg2 = '';

  // 두번째 이미지가 있다면 두번째도 새로운 이미지 스트링 만들기
  if (item.image[1]) {
    const image = item.image[1].url;

    moblieImg2 = resizeImage(image, smWidth);
    desktopImg2 = resizeImage(image, lgWidth);
  }

  // 이미지 element의 옵션
  const firstImg = {
    src: moblieImg,
    srcSet: `${moblieImg} ${smWidth}w, ${desktopImg} ${lgWidth}w`,
    sizes: `(max-width: 400px) ${smWidth}px, ${lgWidth}px`,
    alt: 'img',
  };

  const secondImg = moblieImg2 && {
    src: moblieImg2,
    srcSet: `${moblieImg2} ${smWidth}w, ${desktopImg2} ${lgWidth}w`,
    sizes: `(max-width: 400px) ${smWidth}px, ${lgWidth}px`,
    alt: 'img',
  };

  return (
    <div
      className="card"
      onClick={() => showProduct(item._id)}
      ref={lastIdxRef}
    >
      <div className="image-container">
        {item?.image.length === 1 ? (
          imgFront ? (
            <img {...firstImg} />
          ) : (
            <img {...secondImg} />
          )
        ) : imgFront ? (
          <React.Fragment>
            <img {...firstImg} />
            <img {...secondImg} />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <img {...secondImg} />
            <img {...firstImg} />
          </React.Fragment>
        )}
      </div>
      <div className="card__info">
        <div className="card__info-name">{item?.name}</div>
        <div className="card__info-price">
          <div className={`${item.sale !== 0 && 'sale__org-price'}`}>
            $ <span>{currencyFormat(item?.price)}</span>
            {item.sale !== 0 && <div className="sale__org-line"></div>}
          </div>
          {item.sale !== 0 && (
            <div className="sale__price-box">
              <div className="sale__price-applied">
                $ <span>{currencyFormat(item?.price * sale)}</span>
              </div>
              <div className="card__info-saled">{item.sale}% off</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
