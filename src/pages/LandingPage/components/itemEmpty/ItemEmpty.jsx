import React from 'react';
import './itemEmpty.style.css';
import { Link } from 'react-router-dom';

function ItemEmpty() {
  return (
    <div className="wrapper">
      <section className="item-empty">
        <div className="item-empty__content">
          <h1>No items found...</h1>
          <div className="item-empty__text">
            <p>We couldn't find any items matching your search</p>
            <Link to={'/'}>Back to Home</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ItemEmpty;
