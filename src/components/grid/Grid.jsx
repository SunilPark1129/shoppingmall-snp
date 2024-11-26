import Card from './Card';
import './style/grid.style.css';
import React from 'react';

function Grid({ productList, page, totalPageNum, name, category }) {
  return (
    <div className="grid">
      {productList.length > 0 &&
        productList.map((item, idx) => {
          let isLast = false;
          if (productList.length - 1 === idx) isLast = true;
          return (
            <Card
              item={item}
              key={item._id}
              isLast={isLast}
              page={page}
              totalPageNum={totalPageNum}
              name={name}
              category={category}
            />
          );
        })}
    </div>
  );
}

export default Grid;
