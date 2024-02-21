import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddTocart, deleteItemFromCart, fetchItemsByUserId, Updatecart } from './CartAPI';

const initialState = {
  status: "idle",
  items: [],
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
  async (userId) => {
    const response = await fetchItemsByUserId(userId);

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

export const counterSlice = createSlice({
  name: 'cart',
  initialState,

  reducers: {
    increment: (state) => {

      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
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
      })
      .addCase(updateItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)   //last scene--> 3:43:40
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(item => item.id === action.payload.id)   //last scene--> 3:43:40
        state.items.splice(index, 1);
      })
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;


export const selectItems = (state) => state.cart.items;

export default counterSlice.reducer;
