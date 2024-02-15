import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/product-list/ProductListSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
