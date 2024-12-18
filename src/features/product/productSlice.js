import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showToastMessage } from '../common/uiSlice';
import api from '../../utils/api';

const initialState = {
  productList: [],
  productListHome: [],
  selectedProduct: null,
  loading: true,
  page: 0,
  error: '',
  totalPageNum: 1,
  success: false,
};

export const getProductList = createAsyncThunk(
  'products/getProductList',
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get('/product', { params: { ...query } });
      response.data.page = query.page;

      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getProductListHome = createAsyncThunk(
  'products/getProductListHome',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/product/home');

      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getAdminProductList = createAsyncThunk(
  'products/getAdminProductList',
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get('/product', { params: { ...query } });
      response.data.page = query.page;

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
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/product', formData);
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
      if (page) {
        dispatch(getAdminProductList({ page, name }));
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
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
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
    setResetProduct: (state) => {
      Object.assign(state, { ...initialState });
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
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(getProductListHome.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductListHome.fulfilled, (state, action) => {
        state.loading = false;
        state.productListHome = action.payload;
        state.error = '';
      })
      .addCase(getProductListHome.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = [...state.productList, ...action.payload.data];
        state.totalPageNum = action.payload.totalPageNum;
        state.page = action.payload.page;
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
      })
      .addCase(getAdminProductList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAdminProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload.data;
        state.totalPageNum = action.payload.totalPageNum;
        state.page = action.payload.page;
        state.error = '';
      })
      .addCase(getAdminProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSelectedProduct,
  setFilteredList,
  clearError,
  setResetProduct,
} = productSlice.actions;
export default productSlice.reducer;
