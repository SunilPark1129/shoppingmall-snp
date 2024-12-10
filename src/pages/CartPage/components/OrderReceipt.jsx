import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { currencyFormat } from '../../../utils/number';

function OrderReceipt({ cartList, totalPrice }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isPayment = location.pathname === '/payment';

  return (
    <article className="cart__info">
      <h2>Order History</h2>
      <div className="cart__price">
        <div className="cart__price-items">
          {cartList.length === 0 ? (
            <section>
              <div>There are no items added to your list</div>
              <div>$ 0</div>
            </section>
          ) : (
            cartList.map((item) => {
              const { name } = item.productId;
              const { qty, _id } = item;
              const price =
                item.productId.price * (1 - item.productId.sale / 100);

              return (
                <section className="cart__price-card" key={_id}>
                  <h3>
                    {name} *{qty}
                  </h3>
                  <div>$ {currencyFormat(price * qty)}</div>
                </section>
              );
            })
          )}
        </div>

        <div className="line"></div>

        <div className="cart__price-total">
          <div>TOTAL</div>
          <div>$ {totalPrice}</div>
        </div>
      </div>
      {cartList.length > 0 && !isPayment && (
        <button
          className="cart__price-btn"
          onClick={() => navigate('/payment')}
        >
          Continue to payment
        </button>
      )}
      <div className="cart__price__info">
        <p>
          *This website is a <span>demo created for project purposes</span>. The
          clothing featured here is from actual H&M collections. If you wish to
          purchase any items, please visit the official H&M website.{' '}
          <span>This demo website does not sell clothing</span>.
        </p>
        <p>
          <span>Payment methods available:</span> The prices and shipping fees
          will not be confirmed until you reach the payment stage. You can
          return items within 30 days, and please read about the return fee and
          additional shipping charges for items not received regarding returns
          and refunds.
        </p>
      </div>
    </article>
  );
}

export default OrderReceipt;
