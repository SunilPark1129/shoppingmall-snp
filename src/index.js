import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import './styles/variables.css';
import reportWebVitals from './reportWebVitals';
import store from './features/store';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Layout from './layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import PrivateRoute from './routes/PrivateRoute';
import CartPage from './pages/CartPage/CartPage';
import AdminPage from './pages/AdminPage/AdminPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import ProductDetail from './pages/ProductDetailPage/ProductDetailPage';
import Loading from './components/common/Loading';
import OrderPage from './pages/OrderPage/OrderPage';
import SuccessPage from './pages/ConfirmationPage/SuccessPage';
import AdminOrder from './pages/AdminPage/components/AdminOrder';
import AdminProduct from './pages/AdminPage/components/AdminProduct';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        element: <PrivateRoute permissionLevel="customer" />,
        children: [
          { path: 'cart', element: <CartPage /> },
          {
            path: 'payment',
            element: <PaymentPage />,
          },
          { path: 'order', element: <OrderPage /> },
          { path: 'success', element: <SuccessPage /> },
        ],
      },
      {
        element: <PrivateRoute permissionLevel="admin" />,
        children: [
          {
            path: '/admin',
            element: <AdminPage />,
            children: [
              { path: 'product', element: <AdminProduct /> },
              // order page is not updated -> may adding in future
              // { path: 'order', element: <AdminOrder /> },
            ],
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
