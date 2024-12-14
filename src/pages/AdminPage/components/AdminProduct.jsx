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
    '#',
    'Sku',
    'Name',
    'Price',
    'Sale',
    'Stock',
    'Image',
    'Status',
    '',
  ];

  const [openSaleForm, setOpenSaleForm] = useState(false);

  //상품리스트 가져오기 (url쿼리 맞춰서)
  useEffect(() => {
    dispatch(getAdminProductList({ page: queryPage, name: queryName }));
  }, [query]);

  async function confirmDelete(id) {
    //아이템 삭제하기

    let page = queryPage;

    // 아이템을 지우고 현재 페이지에 더이상 아이템이 존재하지 않으면 페이지 -1 로 이동
    if (totalPageNum > 1 && productList.length === 1) {
      // 아이템을 지움
      await dispatch(deleteProduct({ id }));

      // query 계산
      page = page - 1;
      let query = `page=${page}`;
      if (queryName) query = query + `&name=${queryName}`;

      // query 이동
      navigate('?' + query);
    } else {
      // page를 보내면 해당 페이지로 새로운 product 아이템들을 서버에서 가져옴
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
    // Modal을 열기 전에 success를 초기화 해주기
    dispatch(clearError());
    //edit모드로 설정하고
    setMode('edit');
    // 아이템 수정다이얼로그 열어주기
    dispatch(setSelectedProduct(product));
    setShowDialog(true);
  };

  const handleClickNewItem = async () => {
    // Modal을 열기 전에 success를 초기화 해주기
    dispatch(clearError());
    //new 모드로 설정하고
    setMode('new');
    // 다이얼로그 열어주기
    setShowDialog(true);
  };

  const handlePageClick = ({ selected }) => {
    //  쿼리에 페이지값 바꿔주기
    let query = `page=${selected + 1}`;
    if (queryName) query = query + `&name=${queryName}`;
    navigate('?' + query);
  };

  return (
    <div className="locate-center">
      {loading && <Loading />}
      <div>
        <div className="mt-2">
          <SearchBox placeholder="Product Name" field={'name'} />
        </div>
        <button onClick={handleClickNewItem}>Add New Item +</button>

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

      {/* <NewItemDialog
        mode={mode}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        page={queryPage}
        name={queryName}
      /> */}

      {/* {openSaleForm.open && (
        <SaleForm
          openSaleForm={openSaleForm}
          setOpenSaleForm={setOpenSaleForm}
          page={queryPage}
          name={queryName}
        />
      )} */}

      {/* {confirmOption.open && (
        <ConfirmModal
          setConfirmOption={setConfirmOption}
          confirmOption={confirmOption}
        />
      )} */}
    </div>
  );
}

export default AdminProduct;
