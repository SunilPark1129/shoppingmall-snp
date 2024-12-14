import React from 'react';
import './index.css';
import { Link, Outlet } from 'react-router-dom';

function AdminPage() {
  return (
    <main className="admin">
      <aside className="admin__aside">
        <Link to={'/product'}>Product</Link>
        <Link to={'/Order'}>Order</Link>
      </aside>
      <div className="wrapper">
        <Outlet />
      </div>
    </main>
  );
}

export default AdminPage;
