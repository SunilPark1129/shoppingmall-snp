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
    <div>
      <div className="status-card gap-2">
        <div className="status-card__item status-card__item--top">
          <div className="status-card__img-box">
            <img src={image} alt={'cloth'} height={96} />
          </div>
          <div className="status-card__content">
            <div>
              <div>
                <strong>Order number: {orderItem.orderNum}</strong>
              </div>
              <div className="text-14">{orderItem.createdAt.slice(0, 10)}</div>
              <div>
                {orderItem.shipTo.address} {orderItem.shipTo.city}{' '}
                {orderItem.shipTo.zip}
              </div>

              <div>
                {orderItem.items[0].productId.name}
                {orderItem.items.length > 1 &&
                  `외 ${orderItem.items.length - 1}개`}
              </div>
              <div>$ {currencyFormat(orderItem.totalPrice)}</div>
            </div>
            <div md={2} className="vertical-middle status-card__status">
              <div className="text-align-center text-12">Order status</div>
              <div>{orderItem.status}</div>
            </div>
          </div>
        </div>
        {hasOpen && (
          <>
            <div className="status-card__detail">
              <div className="line"></div>
              {orderItem.items.map(
                ({ price, productId, qty, size, sale }, idx) => {
                  const { image, name } = productId;
                  const finalPrice = price * (1 - sale / 100);
                  return (
                    <div className="status-card__gap" key={idx}>
                      <div className="status-card__item">
                        <div className="status-card__img-box">
                          <img
                            src={resizeImage(image[0].url, 100)}
                            alt={name}
                          />
                        </div>
                        <div className="status-card__desc">
                          <div>{name}</div>
                          <div>Size: {size}</div>
                          <div>Qty: {qty}</div>
                          <div className="status-card__desc__sale">
                            <div
                              className={`${sale !== 0 && 'sale__org-price'}`}
                            >
                              ${currencyFormat(price)}
                              {sale !== 0 && (
                                <div className="sale__org-price__line"></div>
                              )}
                            </div>
                            {sale !== 0 && (
                              <div className="sale__price-box">
                                <div className="sale__price__sale">
                                  {sale}% OFF
                                </div>
                                <div className="sale__price__applied">
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
                    </div>
                  );
                }
              )}
            </div>
          </>
        )}
        <button className="status-card__btn" onClick={handleOpen}>
          {hasOpen ? <>Close</> : <>View Detail</>}
        </button>
      </div>
    </div>
  );
}

export default OrderStatusCard;
