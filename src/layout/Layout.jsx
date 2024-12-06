import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithToken } from '../features/user/userSlice';

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      dispatch(loginWithToken(token));
    }
  }, []);

  useEffect(() => {
    if (user) {
      // dispatch(getCartQty());
    }
  }, [user]);

  return (
    <div className="layout">
      <Navbar user={user} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
