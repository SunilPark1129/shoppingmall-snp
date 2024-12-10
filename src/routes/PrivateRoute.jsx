import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function PrivateRoute({ permissionLevel }) {
  const location = useLocation();
  // permissionlevel -> admin || customer
  const isAuthenticated = useSelector((store) => store.user.user);

  return isAuthenticated ? (
    <Outlet permissionLevel={permissionLevel} />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

export default PrivateRoute;
