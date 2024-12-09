import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { showToastMessage } from '../common/uiSlice';
import { currencyFormat } from '../../utils/number';

const initialState = {
  loading: false,
  error: '',
  cartList: [],
  selectedItem: {},
  cartItemCount: 0,
  totalPrice: 0,
};

// Async thunk actions
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ id, size }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.post('/cart', { productId: id, size, qty: 1 });
      dispatch(getCartList());
      return response.data.cartItemQty;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCartList = createAsyncThunk(
  'cart/getCartList',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get('/cart');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.delete(`/cart/${id}`);

      dispatch(getCartList());
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const deleteAllCartItem = createAsyncThunk(
  'cart/deleteAllCartItem',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await api.delete(`/cart/all`);
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const updateQty = createAsyncThunk(
  'cart/updateQty',
  async ({ id, value }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cart/updateQty/${id}`, { qty: value });
      return response.data.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const getCartQty = createAsyncThunk(
  'cart/getCartQty',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get('/cart/getCartQty');
      return response.data.qty;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initialCart: (state) => {
      state.cartItemCount = 0;
    },
    // You can still add reducers here for non-async actions if necessary
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.cartItemCount = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCartList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCartList.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.cartList = action.payload;
        state.cartItemCount = action.payload.length;
        const total = action.payload.reduce((total, item) => {
          const price = item.productId.price * (1 - item.productId.sale / 100);
          return total + price * item.qty;
        }, 0);
        state.totalPrice = Number(currencyFormat(total));
      })
      .addCase(getCartList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCartQty.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartQty.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.cartItemCount = action.payload;
      })
      .addCase(getCartQty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateQty.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQty.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';

        // 전체가격 계산
        let total = 0;
        for (let i = 0; i < state.cartList.length; i++) {
          // 아이템 업데이트 해주기
          const newQty = action.payload[i].qty;
          state.cartList[i].qty = newQty;

          const price =
            state.cartList[i].productId.price *
            (1 - state.cartList[i].productId.sale / 100);
          total += price * newQty;
        }
        state.totalPrice = Number(currencyFormat(total));
      })
      .addCase(updateQty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteAllCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllCartItem.fulfilled, (state) => {
        state.loading = false;
        state.error = '';
        state.cartList = [];
        state.selectedItem = {};
        state.cartItemCount = 0;
        state.totalPrice = 0;
      })
      .addCase(deleteAllCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
export const { initialCart } = cartSlice.actions;
