import React, { useState } from 'react';
import './slider.style.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Card from '../grid/Card';
import LeftIcon from '../../assets/icons/LeftIcon';
import RightIcon from '../../assets/icons/RightIcon';

function Slider({ data, sliderView }) {
  const [swiper, setSwiper] = useState(null);

  return (
    <Swiper
      modules={[Navigation, A11y]}
      slidesPerView={sliderView}
      onSwiper={(swiperInstance) => setSwiper(swiperInstance)}
      loop
      className="swiper"
    >
      {data &&
        data.map((item) => (
          <SwiperSlide key={item._id}>
            <Card item={item} name={null} category={null} imgFront={false} />
          </SwiperSlide>
        ))}
      <div className="swiper__btn-box">
        <button
          className="swiper__btn swiper__btn--prev"
          onClick={() => swiper && swiper.slidePrev()}
        >
          <LeftIcon />
        </button>
        <button
          className="swiper__btn swiper__btn--next"
          onClick={() => swiper && swiper.slideNext()}
        >
          <RightIcon />
        </button>
      </div>
    </Swiper>
  );
}

export default Slider;
