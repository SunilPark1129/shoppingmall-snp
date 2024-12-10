import React, { useEffect } from 'react';
import './index.css';
import OrderReceipt from '../CartPage/components/OrderReceipt';
import { getCartList } from '../../features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import PaymentInfo from './components/PaymentInfo';

function PaymentPage() {
  const dispatch = useDispatch();
  const { cartList, totalPrice } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartList());
  }, []);

  return (
    <main className="payment">
      <div className="wrapper">
        <h1>PAYMENT</h1>
        <div className="payment__container">
          <PaymentInfo />
          <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
        </div>
      </div>
    </main>
  );
}

export default PaymentPage;
