import React, { useEffect } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../features/order/orderSlice';
import OrderStatusCard from './components/OrderStatusCard';

function OrderPage() {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  if (orderList?.length === 0) {
    return (
      <main className="order">
        <div className="wrapper">
          <div className="content">
            <div className="order__empty">
              <h1>There are no ongoing orders</h1>
            </div>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="order">
      <div className="wrapper">
        <div className="content">
          <h1>Your Order History</h1>
          <div className="order__grid">
            {orderList.map((item) => (
              <OrderStatusCard orderItem={item} key={item._id} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderPage;
