import { styled } from "styled-components";

//Swiper
// import Swiper core and required modules
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import HomeCalendar from "./../pages/HomeCalendar";
import DiaryHome from "./../pages/DiaryHome";

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 100%;

  &.swiper-wrapper {
    transition-timing-function: linear;
  }
`;

export default () => {
  return (
    <StyledSwiper
      // install Swiper modules
      modules={Pagination}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: false }}
      observeParents={true}
      observer={true}
    >
      <SwiperSlide>
        <HomeCalendar />
      </SwiperSlide>

      <SwiperSlide>
        <DiaryHome />
      </SwiperSlide>
    </StyledSwiper>
  );
};
