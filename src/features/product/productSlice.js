import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToastMessage } from '../common/uiSlice';
import api from '../../utils/api';

// 비동기 액션 생성
export const getProductList = createAsyncThunk(
  'products/getProductList',
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get('/product', { params: { ...query } });

      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  'products/getProductDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get('/product/detail', { params: { id } });
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/product', formData);
      dispatch(
        showToastMessage({
          message: 'Product creation completed',
          status: 'success',
        })
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async ({ id, page, name }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(`/product/${id}`);
      dispatch(
        showToastMessage({
          message: 'Product deletion completed',
          status: 'success',
        })
      );
      if (page) {
        dispatch(getProductList({ page, name }));
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ id, ...formData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/product/${id}`, formData);
      dispatch(
        showToastMessage({
          message: 'Product update completed',
          status: 'success',
        })
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saleProduct = createAsyncThunk(
  'products/saleProduct',
  async ({ id, sale }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.put(`/product/sale/${id}`, { sale });
      dispatch(
        showToastMessage({
          message: 'sale update completed',
          status: 'success',
        })
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 슬라이스 생성
const productSlice = createSlice({
  name: 'products',
  initialState: {
    productList: [],
    selectedProduct: null,
    loading: true,
    error: '',
    totalPageNum: 1,
    success: false,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilteredList: (state, action) => {
      state.filteredList = action.payload;
    },
    clearError: (state) => {
      state.error = '';
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = true; // 상품 생성을 성공하면 다이얼로그를 닫고, 실패시 실패메시지를 다이어로그에 보여주고 닫지 않음
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getProductList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload.data;
        state.totalPageNum = action.payload.totalPageNum;
        state.error = '';
      })
      .addCase(getProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = true;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(saleProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(saleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.success = true;
      })
      .addCase(saleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getProductDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.error = '';
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedProduct, setFilteredList, clearError } =
  productSlice.actions;
export default productSlice.reducer;
