import React, { useEffect, useState } from 'react';
import PaymentForm from './PaymentForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../../features/order/orderSlice';
import { cc_expires_format } from '../../../utils/number';

function PaymentInfo() {
  const dispatch = useDispatch();
  const { cartList, totalPrice } = useSelector((state) => state.cart);
  const [cardValue, setCardValue] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // when cart is empty -> kick
    if (cartList.length === 0) {
      navigate('/cart');
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { firstName, lastName, contact, address, city, zip } = e.target;

    const payload = {
      cardValue,
      shipTo: { address: address.value, city: city.value, zip: zip.value },
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        contact: contact.value,
      },
      totalPrice,
      orderList: cartList.map((item) => {
        return {
          productId: item.productId._id,
          price: item.productId.price,
          qty: item.qty,
          size: item.size,
          sale: item.productId.sale,
        };
      }),
    };

    dispatch(createOrder(payload));
    navigate('/success');
  }

  const handlePaymentInfoChange = (event) => {
    const { name, value } = event.target;
    if (name === 'expiry') {
      let newValue = cc_expires_format(value);
      setCardValue((prev) => ({ ...prev, [name]: newValue }));
      return;
    }
    setCardValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (e) => {
    setCardValue({ ...cardValue, focus: e.target.name });
  };
  return (
    <form onSubmit={handleSubmit} className="payment__form">
      <section className="payment__section">
        <h2>Shipping Address</h2>
        <div className="payment__section-content">
          <div className="payment__flex">
            <label>
              Last Name
              <input type="text" required autoComplete="off" name="lastName" />
            </label>
            <label>
              First Name
              <input type="text" required autoComplete="off" name="firstName" />
            </label>
          </div>

          <label>
            Mobile
            <input
              type="text"
              placeholder="xxx-xxx-xxxxx"
              required
              autoComplete="off"
              name="contact"
            />
          </label>

          <label>
            Address
            <input
              type="text"
              placeholder="Apartment, studio, or floor"
              required
              autoComplete="off"
              name="address"
            />
          </label>

          <div className="payment__flex">
            <label>
              City
              <input type="text" required autoComplete="off" name="city" />
            </label>
            <label>
              Zip
              <input type="text" required autoComplete="off" name="zip" />
            </label>
          </div>
        </div>
      </section>

      <PaymentForm
        handleInputFocus={handleInputFocus}
        cardValue={cardValue}
        handlePaymentInfoChange={handlePaymentInfoChange}
      />

      <button className="payment__submit" type="submit">
        Checkout
      </button>
    </form>
  );
}

export default PaymentInfo;
