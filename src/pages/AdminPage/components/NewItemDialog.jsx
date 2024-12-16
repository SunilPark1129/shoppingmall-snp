import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError,
  createProduct,
  editProduct,
  getProductList,
} from '../../../features/product/productSlice';
import { CATEGORY, SIZE, STATUS } from '../../../constants/product.constants';
import CloudinaryUploadWidget from '../../../components/cloudinary/CloudinaryUploadWidget';

const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET;

const InitialFormData = {
  name: '',
  sku: '',
  stock: {},
  image: [],
  description: '',
  category: [],
  status: 'active',
  price: 0,
};

const NewItemDialog = ({ mode, showDialog, setShowDialog, page, name }) => {
  const { error, success, selectedProduct } = useSelector(
    (state) => state.product
  );
  const [formData, setFormData] = useState(
    mode === 'new' ? InitialFormData : selectedProduct
  );

  const [stock, setStock] = useState([]);
  const dispatch = useDispatch();
  const [stockError, setStockError] = useState(false);

  const [confirmOption, setConfirmOption] = useState({
    open: false,
    isWarning: false,
    message: 'Would you like to upload this item?',
    cb: () => {},
  });

  // Cloudinary
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  });

  useEffect(() => {
    if (success) {
      dispatch(getProductList({ page, name }));
      handleClose();
    }
  }, [success]);

  useEffect(() => {
    if (error || !success) {
      dispatch(clearError());
    }
    if (showDialog) {
      if (mode === 'edit') {
        setFormData(selectedProduct);
        const sizeArray = Object.keys(selectedProduct.stock).map((size) => [
          size,
          selectedProduct.stock[size],
        ]);
        setStock(sizeArray);
      } else {
        // mode === new
      }
    }
  }, [showDialog]);

  const handleClose = () => {
    setFormData(InitialFormData);
    setStockError(false);
    setStock([]);
    setShowDialog(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (stock.length === 0) {
      setStockError(true);
      return;
    }

    setConfirmOption({
      open: true,
      isWarning: false,
      message: 'Would you like to upload this item?',
      cb: handleConfirm,
    });
  };

  const handleConfirm = async () => {
    const totalStock = stock.reduce((total, item) => {
      return { ...total, [item[0]]: parseInt(item[1]) };
    }, {});

    if (mode === 'new') {
      // make new product
      dispatch(createProduct({ ...formData, stock: totalStock }));
    } else {
      // edit product
      dispatch(
        editProduct({ ...formData, stock: totalStock, id: selectedProduct._id })
      );
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const addStock = () => {
    setStock((prev) => [...prev, ['', '', Date.now()]]);
  };

  const deleteStock = (idx) => {
    const newStock = stock.filter((_, index) => index !== idx);
    setStock(newStock);
  };

  const handleSizeChange = (value, index) => {
    const newStock = [...stock];
    newStock[index][0] = value;
    setStock(newStock);
  };

  const handleStockChange = (value, index) => {
    setStockError(false);
    const newStock = [...stock];
    newStock[index][1] = value;
    setStock(newStock);
  };

  const deleteImgHandler = (target) => {
    const image = formData.image.filter(({ id }) => id !== target);
    setFormData((prev) => ({ ...prev, image }));
  };

  const onHandleCategory = (event) => {
    if (formData.category.includes(event.target.value)) {
      const newCategory = formData.category.filter(
        (item) => item !== event.target.value
      );
      setFormData((prev) => ({
        ...prev,
        category: [...newCategory],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        category: [...formData.category, event.target.value],
      }));
    }
  };

  const uploadImage = (url) => {
    setFormData((prev) => ({
      ...prev,
      image: [...prev.image, { url, id: Date.now() }],
    }));
  };

  return (
    <>
      {/* show={showDialog} onHide={handleClose} */}
      <div>
        <div>
          {mode === 'new' ? (
            <div>Create New Product</div>
          ) : (
            <div>Edit Product</div>
          )}
        </div>
        {error && (
          <div className="error-message">
            <div variant="danger">{error}</div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Sku
              <input
                onChange={handleChange}
                type="string"
                placeholder="Enter Sku"
                required
                value={formData.sku}
                autoComplete="off"
              />
            </label>

            <label>
              Name
              <input
                onChange={handleChange}
                type="string"
                placeholder="Name"
                required
                value={formData.name}
                autoComplete="off"
              />
            </label>
          </div>

          <label>
            Description
            <input
              type="string"
              placeholder="Description"
              onChange={handleChange}
              value={formData.description}
              required
            />
          </label>

          <label>
            Stock
            {stockError && (
              <span className="error-message">Please add stock</span>
            )}
            <button type="button" onClick={addStock}>
              Add +
            </button>
            <div>
              {stock.map((item, index) => {
                let key = item[2];
                if (!key) key = item[0];
                return (
                  <div key={key}>
                    <div>
                      <select
                        onChange={(event) =>
                          handleSizeChange(event.target.value, index)
                        }
                        required
                        defaultValue={item[0] ? item[0].toLowerCase() : ''}
                      >
                        <option value="" disabled hidden>
                          Please Choose...
                        </option>
                        {SIZE.map((item, index) => (
                          <option
                            value={item.toLowerCase()}
                            disabled={stock.some(
                              (size) => size[0] === item.toLowerCase()
                            )}
                            key={index}
                          >
                            {item}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input
                        onChange={(event) =>
                          handleStockChange(event.target.value, index)
                        }
                        type="number"
                        placeholder="number of stock"
                        value={item[1]}
                        min={0}
                        required
                      />
                    </div>
                    <div>
                      <button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteStock(index)}
                      >
                        -
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </label>

          <div>
            <label>
              Image
              <CloudinaryUploadWidget
                uwConfig={uwConfig}
                uploadImage={uploadImage}
              />
            </label>
            {formData.image.length > 0 && (
              <div className="upload-image-box">
                {formData.image.map(({ url, id }) => (
                  <div
                    className="image-container"
                    alt="uploadedimage"
                    key={id}
                    onClick={() => deleteImgHandler(id)}
                  >
                    <img
                      id="uploadedimage"
                      src={url}
                      className="upload-image mt-2"
                    />
                    <div className="image-container__delete">삭제</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label>
              <label>
                Price
                <input
                  value={formData.price}
                  required
                  onChange={handleChange}
                  type="number"
                  placeholder="0"
                  min={0}
                  step={'.01'}
                />
              </label>
            </label>

            <label>
              <label>
                Category
                <select
                  multiple
                  onChange={onHandleCategory}
                  value={formData.category}
                  required
                >
                  {CATEGORY.map((item, idx) => (
                    <option key={idx} value={item.toLowerCase()}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </label>

            <label>
              <label>
                Status
                <select
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  {STATUS.map((item, idx) => (
                    <option key={idx} value={item.toLowerCase()}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </label>
          </div>
          {mode === 'new' ? (
            <button type="submit">Submit</button>
          ) : (
            <button type="submit">Edit</button>
          )}
        </form>
      </div>
      {/* {confirmOption.open && (
        <ConfirmModal
          setConfirmOption={setConfirmOption}
          confirmOption={confirmOption}
        />
      )} */}
    </>
  );
};

export default NewItemDialog;
