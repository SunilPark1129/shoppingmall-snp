import React, { useState } from 'react';
import { resizeImage } from '../../../utils/resizeImage';
import { currencyFormat } from '../../../utils/number';

function OrderStatusCard({ orderItem }) {
  const [hasOpen, setHasOpen] = useState(false);
  const image = resizeImage(orderItem.items[0]?.productId?.image[0].url, 100);

  function handleOpen() {
    setHasOpen((prev) => !prev);
  }

  return (
    <section className="order__card">
      <div className="order__card-front">
        {!hasOpen && (
          <div className="image-container">
            <img src={image} alt="cloth" />
          </div>
        )}
        <div className="content">
          <div className="order__card-title">
            <div className="order__card-number">
              <strong>Order number: {orderItem.orderNum}</strong>
            </div>
            <div className="order__card-date">
              Date: {orderItem.createdAt.slice(0, 10)}
            </div>
            <div className="order__card-address">
              Ship to:{orderItem.shipTo.address} {orderItem.shipTo.city}{' '}
              {orderItem.shipTo.zip}
            </div>
            <div className="order__card-product">
              <span>{orderItem.items[0].productId.name}</span>
              {orderItem.items.length > 1 &&
                ` and ${orderItem.items.length - 1} more`}
            </div>
            <div>Total: $ {currencyFormat(orderItem.totalPrice)}</div>
          </div>
          <div className="order__card-right">
            <div className="order__card-status">
              <div>Order Status</div>
              <div>{orderItem.status}</div>
            </div>
            <button className="order__card-btn" onClick={handleOpen}>
              {hasOpen ? <>Close</> : <>View Detail</>}
            </button>
          </div>
        </div>
      </div>
      {hasOpen && (
        <div className="order__card-grid">
          {orderItem.items.map(({ price, productId, qty, size, sale }, idx) => {
            const { image, name } = productId;
            const finalPrice = price * (1 - sale / 100);
            return (
              <div className="order__detail" key={idx}>
                <div className="image-container">
                  <img src={resizeImage(image[0].url, 100)} alt={name} />
                </div>
                <div>
                  <div>{name}</div>
                  <div>Size: {size}</div>
                  <div>Qty: {qty}</div>
                  <div>
                    <div className={`${sale !== 0 && 'sale__org-price'}`}>
                      ${currencyFormat(price)}
                      {sale !== 0 && <div className="sale__org-line"></div>}
                    </div>
                    {sale !== 0 && (
                      <div className="sale__price-box">
                        <div className="sale__price-sale">{sale}% OFF</div>
                        <div className="sale__price-applied">
                          $
                          <span>
                            {currencyFormat(price * (1 - sale / 100))}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>Total: ${currencyFormat(finalPrice * qty)}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default OrderStatusCard;
