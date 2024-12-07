import React, { useEffect } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCartList } from '../../features/cart/cartSlice';
import CartCard from './components/CartCard';
import OrderReceipt from './components/OrderReceipt';

function CartPage() {
  const dispatch = useDispatch();
  const { cartList, totalPrice } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  return (
    <main className="cart">
      <div className="wrapper">
        <h1>CART INFORMATION</h1>
        <div className="cart__content">
          {/* item */}
          <article className="cart__items">
            {cartList.length === 0 ? (
              <div className="cart__empty">
                <div>Your cart is empty</div>
                <span>Please add Items</span>
              </div>
            ) : (
              cartList.map((item) => <CartCard item={item} key={item._id} />)
            )}
          </article>

          {/* info */}
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
        </div>
      </div>
    </main>
  );
}

export default CartPage;
