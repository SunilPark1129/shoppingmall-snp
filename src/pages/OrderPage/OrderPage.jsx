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
      <div className="no-order-box">
        <div>There are no ongoing orders</div>
      </div>
    );
  }
  return (
    <div className="status-card-container">
      {orderList.map((item) => (
        <OrderStatusCard
          orderItem={item}
          className="status-card-container"
          key={item._id}
        />
      ))}
    </div>
  );
}

export default OrderPage;
