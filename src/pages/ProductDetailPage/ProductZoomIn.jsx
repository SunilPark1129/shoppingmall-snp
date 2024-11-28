import React, { useRef, useState } from 'react';

const initTPos = {
  x: 0,
  y: 0,
};

function ProductZoomIn({ item }) {
  const [isMoving, setIsMoving] = useState(false);
  const [tPos, setTPos] = useState(initTPos);
  const imgRef = useRef(null);

  function zoomInHandler(e) {
    const { layerX, layerY } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = e.target;
    const halfWidth = offsetWidth / 2;
    const halfHeight = offsetHeight / 2;

    const halfLeft = layerX - halfWidth;
    const halfTop = layerY - halfHeight;

    setTPos({ x: halfLeft * 2, y: halfTop * 2 });
    setIsMoving(true);
  }

  function zoomInLeaveHandler() {
    setTPos(initTPos);
    setIsMoving(false);
  }

  return (
    <div
      className="zoomin"
      onPointerMove={zoomInHandler}
      onPointerLeave={zoomInLeaveHandler}
    >
      <img
        ref={imgRef}
        src={item}
        alt={'img'}
        style={{
          left: `${-tPos.x}px`,
          top: `${-tPos.y}px`,
          transform: `scale(${isMoving ? 3 : 1})`,
        }}
      />
    </div>
  );
}

export default ProductZoomIn;
