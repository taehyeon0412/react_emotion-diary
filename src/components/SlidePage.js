import { styled } from "styled-components";

//Swiper
// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Calendar from "./../pages/Calendar";
import DiaryHome from "./../pages/DiaryHome";

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  &:hover {
    cursor: pointer;
  }

  &.swiper-wrapper {
    transition-timing-function: linear;
  }
`;

export default () => {
  return (
    <StyledSwiper
      // install Swiper modules
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: false }}
      observeParents={true}
      observer={true}
    >
      <SwiperSlide>
        <Calendar />
      </SwiperSlide>

      <SwiperSlide>
        <DiaryHome />
      </SwiperSlide>
    </StyledSwiper>
  );
};
