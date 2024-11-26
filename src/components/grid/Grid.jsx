import Card from './Card';
import './style/grid.style.css';
import React from 'react';

function Grid({ productList }) {
  return (
    <div className="grid">
      {productList.length > 0 &&
        productList.map((item) => <Card item={item} key={item._id} />)}
    </div>
  );
}

export default Grid;
