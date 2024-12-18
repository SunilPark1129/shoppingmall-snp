import React, { useState } from 'react';
import { resizeImage } from '../../../utils/resizeImage';
import { currencyFormat } from '../../../utils/number';
import { useDispatch } from 'react-redux';
import {
  getAdminProductList,
  saleProduct,
} from '../../../features/product/productSlice';
import ConfirmModal from '../../../components/modal/ConfirmModal';

function SaleForm({ openSaleForm, setOpenSaleForm, page, name }) {
  const dispatch = useDispatch();

  const [confirmOption, setConfirmOption] = useState({
    open: false,
    isWarning: false,
    message: 'Would you like to upload this item?',
    cb: () => {},
  });

  const [sale, setSale] = useState(0);
  const { item } = openSaleForm;
  if (sale > 100) {
    setSale(100);
  } else if (sale < 0) {
    setSale(0);
  }

  function confirmSubmit() {
    setConfirmOption({
      open: true,
      isWarning: false,
      message: 'Would you like to update sale?',
      cb: handleSubmit,
    });
  }

  async function handleSubmit() {
    await dispatch(saleProduct({ id: item._id, sale }));
    dispatch(getAdminProductList({ page, name }));
    setOpenSaleForm({ open: false });
  }
  return (
    <>
      <div className="sale">
        <div className="container">
          <div className="image-container">
            <img src={resizeImage(item.image[0].url, 200)} alt={item.name} />
          </div>
          <div className="sale__text">
            <div className="sale__title">{item.name}</div>
            <div className="sale__price">${item.price}</div>
            <label>
              Sale:{' '}
              <input
                type="number"
                placeholder="0"
                value={sale}
                onChange={(e) => setSale(e.target.value)}
                max={100}
                min={0}
                step={1}
              />
              %
            </label>
            <div className="sale__total">
              Calc: $
              <strong>
                {currencyFormat(item.price - (item.price * sale) / 100)}
              </strong>
            </div>
            <div className="sale__btn-box">
              <button onClick={confirmSubmit}>Update</button>
              <button onClick={() => setOpenSaleForm({ open: false })}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="sale__bg"
        onClick={() => setOpenSaleForm({ open: false })}
      ></div>
      {confirmOption.open && (
        <ConfirmModal
          setConfirmOption={setConfirmOption}
          confirmOption={confirmOption}
        />
      )}
    </>
  );
}

export default SaleForm;
