import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './style/productDetail.style.css';
import { addToCart } from '../../features/cart/cartSlice';
import { getProductDetail } from '../../features/product/productSlice';
import { resizeImage } from '../../utils/resizeImage';
import { currencyFormat } from '../../utils/number';
import Loading from '../../components/common/Loading';
import ProductZoomIn from './ProductZoomIn';

const sizes = ['xs', 's', 'm', 'l', 'xl'];

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { selectedProduct, loading } = useSelector((state) => state.product);
  const [size, setSize] = useState('');
  const { id } = useParams();
  const [sizeError, setSizeError] = useState(false);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedImg, setSelectedImg] = useState(0);
  const [imgList, setImgList] = useState([]);
  const [imgHide, setImgHide] = useState(false);

  const addItemToCart = () => {
    //사이즈를 아직 선택안했다면 에러
    if (!size) {
      setSizeError(true);
      return;
    }
    // 아직 로그인을 안한유저라면 로그인페이지로
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }
    // 카트에 아이템 추가하기
    dispatch(addToCart({ id, size }));
  };
  const selectSize = (value) => {
    if (value) setSizeError(false);
    // 사이즈 추가하기
    setSize(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      const temp = selectedProduct.image.filter(
        (_, idx) => idx !== selectedImg
      );
      setImgList(temp);
    }
  }, [selectedImg, selectedProduct]);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [id, dispatch]);

  function imgClickHandler(targetId) {
    const findIndex = selectedProduct.image.findIndex(
      ({ id }) => id === targetId
    );
    setSelectedImg(findIndex);
  }

  if (loading || !selectedProduct)
    return (
      <div
        className="position-relative m-auto"
        style={{ maxWidth: '1320px', height: '100vh' }}
      >
        <Loading />
      </div>
    );
  return (
    <div className="product">
      <div className="wrapper">
        <div className="product__content">
          <div className="product__img">
            <ProductZoomIn item={selectedProduct.image[selectedImg].url} />
            {selectedProduct.image.length > 1 && (
              <div className="product__img-list">
                <>
                  <button
                    className="product__img-hide"
                    onClick={() => setImgHide((prev) => !prev)}
                  >
                    {imgHide ? 'SHOW' : 'HIDE'}
                  </button>
                  {!imgHide &&
                    imgList.map(({ url, id }) => (
                      <img
                        src={resizeImage(url, 600)}
                        key={id}
                        alt="image"
                        onClick={() => imgClickHandler(id)}
                      />
                    ))}
                </>
              </div>
            )}
          </div>
          <div className="product__text">
            <div className="product__text-info">
              <h1>{selectedProduct.name}</h1>
              <div
                className={`${selectedProduct.sale !== 0 && 'sale__org-price'}`}
              >
                $ <span>{currencyFormat(selectedProduct.price)}</span>
                {selectedProduct.sale !== 0 && (
                  <div className="sale__org-line"></div>
                )}
              </div>
              {selectedProduct.sale !== 0 && (
                <div className="sale__price-box">
                  <div className="sale__price-sale">
                    {selectedProduct.sale}% OFF
                  </div>
                  <div className="sale__price-applied">
                    $
                    <span>
                      {currencyFormat(
                        selectedProduct.price * (1 - selectedProduct.sale / 100)
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="line"></div>
            <div className="product__text-info">
              <p>{selectedProduct.description}</p>
            </div>
            <div className="product__size">
              {sizeError ? (
                <div className="product__size-text product__size-text--warning">
                  {sizeError && 'Please select a size'}
                </div>
              ) : (
                <div className="product__size-text">
                  {size ? 'Selected Size' : 'Select Size'}{' '}
                  <span>{size.toUpperCase()}</span>
                </div>
              )}
              <div className="product__size-box">
                {sizes.map((item) => {
                  const stockQty = selectedProduct.stock[item];
                  const hasSelected = item === size;

                  return (
                    <button
                      disabled={!stockQty}
                      className={`product__size-item ${
                        hasSelected && 'active'
                      }`}
                      onClick={() => selectSize(item)}
                      key={item}
                    >
                      <div>{item.toUpperCase()}</div>
                      <div>{stockQty ?? 0}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            <button className="product__btn" onClick={addItemToCart}>
              Add to cart
            </button>
            <em style={{ fontWeight: 'bold', color: 'red' }}>
              This website is a demo created for project purposes. The clothing
              featured here is from actual H&M collections. If you wish to
              purchase any items, please visit the official H&M website. This
              demo website does not sell clothing.
            </em>
            <div className="product__policy">
              SHIPPING POLICY: SnP offers shipping to customers who are 13 years
              or older and have a valid US shipping and billing address. Certain
              items, such as oversized coats and seasonal accessories, are
              eligible for standard shipping only. If another shipping method is
              selected, the order may be adjusted or canceled, with a refund
              provided. PAYMENT: SnP accepts various payment options, including
              Visa, MasterCard, Discover, American Express, Apple Pay, and
              PayPal. For additional information, please refer to our support
              pages.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
