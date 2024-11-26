import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteAllCartItem, getCartQty } from '../cart/cartSlice';
import api from '../../utils/api';
import { showToastMessage } from '../common/uiSlice';

// Define initial state
const initialState = {
  orderList: [],
  orderNum: '',
  selectedOrder: {},
  error: '',
  loading: true,
  totalPageNum: 1,
  status: false,
};

// Async thunks
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/order', payload);
      dispatch(deleteAllCartItem());
      return response.data.orderNum;
    } catch (error) {
      dispatch(showToastMessage({ message: error.message, status: 'error' }));
      return rejectWithValue(error.message);
    }
  }
);

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get('/order/me');
      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getOrderList = createAsyncThunk(
  'order/getOrderList',
  async (query, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get('/order', { params: { ...query } });

      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ id, status, page, orderNum }, { dispatch, rejectWithValue }) => {
    try {
      // controller에서 getOrderList (method:GET)를 불러와서 사용할 예정이라
      // page와 orderNum을 params로 보낸다
      const response = await api.put(
        `/order/${id}?page=${page}&orderNum=${orderNum}`,
        {
          id,
          status,
        }
      );
      dispatch(
        showToastMessage({
          message: `The order has been changed to ${status}`,
          status: 'success',
        })
      );
      return response.data;
    } catch (error) {
      dispatch(showToastMessage({ message: error.message, status: 'error' }));
      rejectWithValue(error.message);
    }
  }
);

// Order slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    resetStatusOrder: (state) => {
      state.status = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        state.loading = true;
        state.status = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.orderNum = action.payload;
        state.status = true;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = false;
      })
      .addCase(getOrderList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload.data;
        state.totalPageNum = action.payload.totalPageNum;
        state.error = '';
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload.data;
        state.totalPageNum = action.payload.totalPageNum;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload.data;
        state.totalPageNum = action.payload.totalPageNum;
        state.error = '';
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedOrder, resetStatusOrder } = orderSlice.actions;
export default orderSlice.reducer;
