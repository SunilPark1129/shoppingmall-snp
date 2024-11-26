import React from 'react';
import './style/skeleton.style.css';

const temp = new Array(8).fill();
function Skeleton() {
  return (
    <div className="landing-content">
      {temp.map((_, idx) => (
        <div key={idx} className="skeleton__card">
          <div className="skeleton__img-box">
            <div className="skeleton__img"></div>
          </div>
          <div className="skeleton__info">
            <div></div>
            <div></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Skeleton;
