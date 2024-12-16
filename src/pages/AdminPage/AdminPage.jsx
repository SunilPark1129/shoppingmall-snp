import React from 'react';
import './index.css';
import { Link, Outlet, useLocation } from 'react-router-dom';

function AdminPage() {
  const location = useLocation();
  const isActive = location.pathname === '/admin/product';
  return (
    <main className="admin">
      <div className="wrapper">
        <div className="container">
          <nav>
            <Link className={isActive ? 'isActive' : ''} to={'product'}>
              Product
            </Link>
            <Link className={!isActive ? 'isActive' : ''} to={'order'}>
              Order
            </Link>
          </nav>
          <Outlet />
        </div>
      </div>
    </main>
  );
}

export default AdminPage;
