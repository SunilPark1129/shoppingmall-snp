import React from 'react';
import { resizeImage } from '../../../utils/resizeImage';
import { currencyFormat } from '../../../utils/number';

const ProductTable = ({
  header,
  data,
  deleteItem,
  openEditForm,
  setOpenSaleForm,
}) => {
  return (
    <table>
      <thead>
        <tr>
          {header.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item) => {
            const image = resizeImage(item.image[0].url, 200);

            return (
              <tr key={item.sku}>
                <td>{item.sku}</td>
                <td style={{ minWidth: '100px' }}>{item.name}</td>
                <td>{currencyFormat(item.price)}</td>
                <td>
                  {item.sale !== 0 && (
                    <div className="product-table__sale">{item.sale}%</div>
                  )}
                </td>
                <td>
                  {Object.keys(item.stock).map((size, index) => (
                    <div key={index}>
                      {size}:{item.stock[size]}
                    </div>
                  ))}
                </td>
                <td>
                  <img src={image} width={100} alt="image" />
                </td>
                <td>{item.status}</td>
                <td>
                  <div className="product-table__btn-box">
                    <button
                      className="product-table__btn product-table__btn--remove"
                      onClick={() => deleteItem(item._id)}
                    >
                      -
                    </button>
                    <button
                      className="product-table__btn product-table__btn--edit"
                      onClick={() => openEditForm(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="product-table__btn product-table__btn--sale"
                      onClick={() => setOpenSaleForm({ open: true, item })}
                    >
                      Sale
                    </button>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td>No Data to show</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default ProductTable;
