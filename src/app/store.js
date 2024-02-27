import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product-list/ProductListSlice';
import authReducer from "../features/Auth/authSlice"
import cartReducer from '../features/Cart/CartSlice'
import orderReducer from '../features/order/OrderSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer
  },
},window._REDUX_DEVTOOLS_EXTENSION_ && Window._REDUX_DEVTOOLS_EXTENSION_());
