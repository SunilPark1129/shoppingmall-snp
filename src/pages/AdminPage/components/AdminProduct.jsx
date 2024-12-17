import React, { useEffect, useState } from 'react';
import {
  clearError,
  deleteProduct,
  getAdminProductList,
  setSelectedProduct,
} from '../../../features/product/productSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/common/Loading';
import SearchBox from '../../../components/searchBox/SearchBox';
import ReactPaginate from 'react-paginate';
import ProductTable from './ProductTable';
import NewItemDialog from './NewItemDialog';
import ConfirmModal from '../../../components/modal/ConfirmModal';

function AdminProduct() {
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const queryName = query.get('name');
  const queryPage = query.get('page') || 1;

  const dispatch = useDispatch();
  const { loading, productList, totalPageNum } = useSelector(
    (state) => state.product
  );

  const [showDialog, setShowDialog] = useState(false);
  const [mode, setMode] = useState('new');

  const [confirmOption, setConfirmOption] = useState({
    open: false,
    isWarning: false,
    message: 'Would you like to upload this item?',
  });

  const tableHeader = [
    'Sku',
    'Name',
    'Price',
    'Sale',
    'Stock',
    'Image',
    'Status',
    'Button',
  ];

  const [openSaleForm, setOpenSaleForm] = useState(false);

  useEffect(() => {
    dispatch(getAdminProductList({ page: queryPage, name: queryName }));
  }, [query]);

  async function confirmDelete(id) {
    let page = queryPage;

    if (totalPageNum > 1 && productList.length === 1) {
      await dispatch(deleteProduct({ id }));

      page = page - 1;
      let query = `page=${page}`;
      if (queryName) query = query + `&name=${queryName}`;

      navigate('?' + query);
    } else {
      dispatch(deleteProduct({ id, page, name: queryName }));
    }
  }

  const deleteItem = async (id) => {
    setConfirmOption({
      open: true,
      isWarning: true,
      message: 'Would you like to delete this item?',
      cb: () => confirmDelete(id),
    });
  };

  const openEditForm = (product) => {
    dispatch(clearError());
    setMode('edit');
    dispatch(setSelectedProduct(product));
    setShowDialog(true);
  };

  const handleClickNewItem = async () => {
    dispatch(clearError());
    setMode('new');
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }) => {
    let query = `page=${selected + 1}`;
    if (queryName) query = query + `&name=${queryName}`;
    navigate('?' + query);
  };

  return (
    <article className="admin__product">
      <h1>Product Management</h1>
      {loading && <Loading />}
      <div className="content">
        <div className="admin__top">
          <SearchBox placeholder="Product Name" field={'name'} />
          <button className="admin__product-add" onClick={handleClickNewItem}>
            Add New Item
          </button>
        </div>

        <ProductTable
          header={tableHeader}
          data={productList}
          deleteItem={deleteItem}
          openEditForm={openEditForm}
          setOpenSaleForm={setOpenSaleForm}
        />

        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          pageCount={totalPageNum}
          forcePage={queryPage - 1}
          previousLabel="<"
          renderOnZeroPageCount={null}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          className="list-style-none"
        />
      </div>

      <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        page={queryPage}
        name={queryName}
      />

      {/* {openSaleForm.open && (
        <SaleForm
          openSaleForm={openSaleForm}
          setOpenSaleForm={setOpenSaleForm}
          page={queryPage}
          name={queryName}
        />
      )} */}

      {confirmOption.open && (
        <ConfirmModal
          setConfirmOption={setConfirmOption}
          confirmOption={confirmOption}
        />
      )}
    </article>
  );
}

export default AdminProduct;
