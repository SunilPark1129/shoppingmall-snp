import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ permissionLevel }) {
  // will work on it later
  // isAuthenticated = permissionLevel === redux.selete.user
  // permissionlevel -> admin || customer
  const isAuthenticated = true;

  return isAuthenticated ? (
    <Outlet permissionLevel={permissionLevel} />
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
