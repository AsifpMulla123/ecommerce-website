import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignupPage from './Pages/SignupPage';
import CartPage from './Pages/CartPage';
import Checkout from './Pages/Checkout';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import Protected from './features/Auth/components/Protected';
import { fetchItemsByUserIdAsync } from './features/Cart/CartSlice';
import { checkAuthAsync, selectLoggedInUser, selectUserChecked } from './features/Auth/authSlice';
import PageNotFound from './Pages/PageNotFound';
import OrderSuccessPage from './Pages/OrderSuccessPage';
import UserOrder from './Pages/UserOrder';
import UserProfilePage from './Pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/Auth/components/Logout';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import AdminHome from './Pages/AdminHome';
import AdminProductDetailsPage from './Pages/AdminProductDetailsPage';
import ProtectedAdmin from './features/Auth/components/ProtectedAdmin';
import AdminProductDetailFormPage from './Pages/AdminProductDetailFormPage';
import AdminOrderPage from './Pages/AdminOrderPage';

// react alert
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Stripecheckout from './Pages/StripeCheckout';
const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT
};


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: <Protected><CartPage /></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout /></Protected>,
  },
  {
    path: "/product-detail/:id",
    element: <Protected><ProductDetailsPage /></Protected>,
  },
  {
    path: "/admin/product-detail/:id",
    element: <ProtectedAdmin><AdminProductDetailsPage /></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><AdminProductDetailFormPage /></ProtectedAdmin>,
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrderPage /></ProtectedAdmin>,
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminProductDetailFormPage /></ProtectedAdmin>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage />,
  },
  {
    path: "/my-orders",
    element: <Protected>
      <UserOrder />
    </Protected>,
  },
  {
    path: "/profile",
    element: <UserProfilePage />,
  },
  {
    path: "/stripe-checkout/",
    element: <ProtectedAdmin><Stripecheckout /></ProtectedAdmin>,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);
  useEffect(() => {
    dispatch(checkAuthAsync())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user])

  return (
    <>
      <div className="App">
        {userChecked && <Provider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </Provider>}
      </div>
    </>
  );
}

export default App;