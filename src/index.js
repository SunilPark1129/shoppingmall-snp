import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import './styles/variables.css';
import reportWebVitals from './reportWebVitals';
import store from './features/store';
import { Provider } from 'react-redux';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Layout from './layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import PrivateRoute from './routes/PrivateRoute';
import CartPage from './pages/CartPage/CartPage';
import AdminPage from './pages/AdminPage/AdminPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import Loading from './components/Loading';

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
        element: <ProductDetailPage />,
      },
      {
        element: <PrivateRoute permissionLevel="customer" />,
        children: [
          { path: '/cart', element: <CartPage /> },
          { path: '/payment', element: <PaymentPage /> },
        ],
      },
      {
        element: <PrivateRoute permissionLevel="admin" />,
        children: [{ path: '/admin', element: <AdminPage /> }],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
