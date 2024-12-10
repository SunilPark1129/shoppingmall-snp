import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import successImage from '../../assets/image/greenCheck.png';
import { Link } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import { resetStatusOrder } from '../../features/order/orderSlice';
import './index.css';

function SuccessPage() {
  const dispatch = useDispatch();
  const { orderNum, error, loading } = useSelector((state) => state.order);
  const [errorList, setErrorList] = useState([]);

  useEffect(() => {
    if (error) {
      const temp = [
        ...error.matchAll(/Insufficient stock for (.*?) in size (.*?)\./g),
      ];

      setErrorList(temp);
    }
  }, [error]);

  useEffect(() => {
    dispatch(resetStatusOrder());
  }, []);

  if (loading) return <Loading />;
  if (error)
    return (
      <main className="confirm-success">
        <div className="wrapper">
          <header>
            <h1>Order Failed</h1>
          </header>
          <div className="confirm-success__content">
            <div className="confirm-success__title">Reason:</div>
            <div className="confirm-success__fail">
              {errorList.map((item, idx) => {
                return (
                  <div className="confirm-success__error" key={idx}>
                    Insufficient stock for <span>{item[1]}</span> size in{' '}
                    <span>{item[2]}</span>.
                  </div>
                );
              })}
            </div>
          </div>
          <div className="confirm-success__link">
            Please return to the main page
            <Link to={'/cart'}>Go back to the cart page</Link>
          </div>
        </div>
      </main>
    );

  return (
    <main className="confirm-success">
      <div className="wrapper">
        <header>
          <img
            src={successImage}
            width={100}
            className="check-image"
            alt="greenCheck.png"
          />
          <h1>Your order has been completed!</h1>
        </header>
        <div className="confirm-success__content">
          <div className="confirm-success__title">
            Order number: <span>{orderNum}</span>
          </div>
          <div className="confirm-success__link">
            Please check your order confirmation in the My Orders section
            <Link to={'/order'}>Go to My Orders</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SuccessPage;
