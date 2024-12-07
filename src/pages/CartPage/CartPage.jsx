import React from 'react';
import './index.css';

function CartPage() {
  return (
    <main className="cart">
      <div className="wrapper">
        <div className="cart__container">
          {/* item */}
          <article className="cart__item">
            {/* item === 0 */}
            <div className="cart__empty">
              <div>Your cart is empty</div>
              <div>Please add Items</div>
            </div>
            {/* item !== 0 */}
            <section className="cart__card">
              <div className="image-container">
                <img src="" alt="" />
              </div>
              <div className="cart__card-text">
                <div className="cart__card-top">
                  <h2>name</h2>
                  <div>$ 0</div>
                  <div>Size: m</div>
                </div>
                <div className="cart__card-bot">
                  <div>Total: $ 0</div>
                  <div>
                    <div>Quantity: </div>
                    <input type="text" />
                  </div>
                </div>
              </div>
              <div className="cart__card-btn">
                <button>detail</button>
                <button>trash</button>
              </div>
            </section>
          </article>

          {/* info */}
          <article className="cart__info">
            <h1>Cart Info</h1>
            <div className="cart__price">
              <div className="cart__price-item">
                <div className="cart__price-card">
                  <div>name</div>
                  <div>$ 0</div>
                </div>
              </div>
              <div className="cart__payment">
                <button>Continue to payment</button>
              </div>
              <div className="cart__price-total">
                <div>Total:</div>
                <div>$ 0</div>
              </div>
            </div>
            <p>
              Payment methods available: The prices and shipping fees will not
              be confirmed until you reach the payment stage. You can return
              items within 30 days, and please read about the return fee and
              additional shipping charges for items not received regarding
              returns and refunds.
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
