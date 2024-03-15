import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddTocart, deleteItemFromCart, fetchItemsByUserId, resetCart, Updatecart } from './CartAPI';

const initialState = {
  status: "idle",
  items: [],
  cartLoaded: false
};

export const AddTocartAsync = createAsyncThunk(
  'cart/AddTocart',
  async (item) => {
    const response = await AddTocart(item);

    return response.data;
  }
);
export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async () => {
    const response = await fetchItemsByUserId();
    return response.data;
  }
);
export const updateItemAsync = createAsyncThunk(
  'cart/Updatecart',
  async (update) => {
    const response = await Updatecart(update);
    return response.data;
  }
);
export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async () => {
    const response = await resetCart();
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    increment: (state) => {

      state.value += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddTocartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddTocartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.cartLoaded = true;
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartLoaded = true;
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = []
      })
  },
});

export const { increment } = counterSlice.actions;


export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;
export default counterSlice.reducer;
