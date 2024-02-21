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
import { selectLoggedInUser } from './features/Auth/authSlice';

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
]);
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
