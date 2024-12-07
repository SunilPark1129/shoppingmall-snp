import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCartItem, updateQty } from '../../../features/cart/cartSlice';
import { resizeImage } from '../../../utils/resizeImage';
import { currencyFormat } from '../../../utils/number';
import ConfirmModal from '../../../components/modal/ConfirmModal';
import TrashIcon from '../../../assets/icons/TrashIcon';
import ShirtIcon from '../../../assets/icons/ShirtIcon';
import { useNavigate } from 'react-router-dom';

function CartCard({ item }) {
  // 해당 아이템의 디테일 페이지로 이동
  const productDetailLink = `/product/${item.productId._id}`;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [confirmOption, setConfirmOption] = useState({
    open: false,
    isWarning: false,
    message: '',
    cb: () => {},
  });

  const handleQtyChange = (id, value) => {
    dispatch(updateQty({ id, value }));
  };

  const deleteCart = (id) => {
    setConfirmOption({
      open: true,
      isWarning: true,
      message: 'Would you like to remove this item from the cart?',
      cb: () => confirmDelete(id),
    });
  };

  function confirmDelete(id) {
    dispatch(deleteCartItem(id));
  }

  const price = item.productId.price * (1 - item.productId.sale / 100);

  return (
    <>
      <section className="cart__card">
        <div className="image-container">
          <img
            src={resizeImage(item.productId.image[0].url, 200)}
            alt={item.productId.name}
          />
        </div>
        <div className="cart__card-text">
          <div className="cart__card-top">
            <h2>{item.productId.name}</h2>
            {item.productId.sale ? (
              <div className="cart__card-price">
                <div className="sale__org-price">
                  $ <span>{currencyFormat(item.productId.price)}</span>
                  <div className="sale__org-line"></div>
                </div>

                <div className="sale__price-box">
                  <div className="sale__price-sale">
                    {item.productId.sale}% OFF
                  </div>
                  <div className="sale__price-applied">
                    $<span>{currencyFormat(price)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  $ <span>{currencyFormat(item.productId.price)}</span>
                  <div className="sale__org-price__line"></div>
                </div>
              </div>
            )}
            <div>Size: {item.size.toUpperCase()}</div>
            <div className="cart__card-qty">
              <div>Quantity: </div>
              <select
                onChange={(event) =>
                  handleQtyChange(item._id, event.target.value)
                }
                required
                defaultValue={item.qty}
              >
                {new Array(10).fill('').map((_, idx) => (
                  <option key={idx} value={idx + 1}>
                    {idx + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="cart__card-bot">
            <div>Total: $ {currencyFormat(price * item.qty)}</div>
          </div>
        </div>
        <div className="cart__card-btn">
          <button
            title="go to detail page"
            onClick={() => navigate(productDetailLink)}
          >
            <ShirtIcon />
          </button>
          <button onClick={() => deleteCart(item._id)} title="delete item">
            <TrashIcon />
          </button>
        </div>
      </section>
      {confirmOption.open && (
        <ConfirmModal
          setConfirmOption={setConfirmOption}
          confirmOption={confirmOption}
        />
      )}
    </>
  );
}

export default CartCard;
