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
      <PaymentInfo />
      <OrderReceipt cartList={cartList} totalPrice={totalPrice} />
    </main>
  );
}

export default PaymentPage;
