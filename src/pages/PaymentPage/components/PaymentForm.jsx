import React from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

function PaymentForm({ handlePaymentInfoChange, handleInputFocus, cardValue }) {
  return (
    <div>
      <div>
        <Cards
          cvc={cardValue.cvc}
          expiry={cardValue.expiry}
          focused={cardValue.focus}
          name={cardValue.name}
          number={cardValue.number}
        />
      </div>
      <input
        type="tel"
        name="number"
        placeholder="Card Number"
        onChange={handlePaymentInfoChange}
        onFocus={handleInputFocus}
        required
        maxLength={16}
        minLength={16}
        value={cardValue.number}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handlePaymentInfoChange}
        onFocus={handleInputFocus}
        required
        value={cardValue.name}
      />
      <div className="payment__address-row">
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
      </div>
    </div>
  );
}

export default PaymentForm;
