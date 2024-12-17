import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function PrivateRoute({ permissionLevel }) {
  // permissionlevel -> admin || customer
  const user = useSelector((state) => state.user.user);
  const isAuthenticated =
    user?.level === permissionLevel || user?.level === 'admin';

  return isAuthenticated ? (
    <Outlet permissionLevel={permissionLevel} />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
