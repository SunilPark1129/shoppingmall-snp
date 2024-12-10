import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

function PaymentForm({ handlePaymentInfoChange, handleInputFocus, cardValue }) {
  return (
    <section className="payment__section">
      <h2>Payment Methods</h2>
      <div className="payment__section-content">
        <div>
          <Cards
            cvc={cardValue.cvc}
            expiry={cardValue.expiry}
            focused={cardValue.focus}
            name={cardValue.name}
            number={cardValue.number}
          />
        </div>
        <label>
          Card Number
          <input
            type="tel"
            name="number"
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            maxLength={16}
            minLength={16}
            value={cardValue.number}
            autoComplete="off"
          />
        </label>
        <label>
          Name
          <input
            type="text"
            name="name"
            onChange={handlePaymentInfoChange}
            onFocus={handleInputFocus}
            required
            value={cardValue.name}
            autoComplete="off"
            maxLength={16}
          />
        </label>
        <div className="payment__flex">
          <label>
            Expiry
            <input
              type="text"
              name="expiry"
              placeholder="MM/DD"
              onChange={handlePaymentInfoChange}
              onFocus={handleInputFocus}
              required
              value={cardValue.expiry}
              maxLength={7}
            />
          </label>
          <label>
            cvc
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              onChange={handlePaymentInfoChange}
              onFocus={handleInputFocus}
              required
              maxLength={3}
              value={cardValue.cvc}
            />
          </label>
        </div>
      </div>
    </section>
  );
}

export default PaymentForm;
