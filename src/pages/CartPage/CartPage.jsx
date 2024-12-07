import React from 'react';
import './index.css';

function CartPage() {
  const items = true;
  return (
    <main className="cart">
      <div className="wrapper">
        <h1>CART INFORMATION</h1>
        <div className="cart__content">
          {/* item */}
          <article className="cart__items">
            {items ? (
              <div className="cart__empty">
                <div>Your cart is empty</div>
                <span>Please add Items</span>
              </div>
            ) : (
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
                      <div className="cart__card-qt">Quantity: </div>
                      <input type="text" />
                    </div>
                  </div>
                </div>
                <div className="cart__card-btn">
                  <button>detail</button>
                  <button>trash</button>
                </div>
              </section>
            )}
          </article>

          {/* info */}
          <article className="cart__info">
            <h2>Order History</h2>
            <div className="cart__price">
              <div className="cart__price-items">
                <section className="cart__price-card">
                  <h3>name</h3>
                  <div>$ 0</div>
                </section>
              </div>

              <div className="line"></div>

              <div className="cart__price-total">
                <div>TOTAL</div>
                <div>$ 0</div>
              </div>
            </div>
            <button className="cart__price-btn">Continue to payment</button>
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
