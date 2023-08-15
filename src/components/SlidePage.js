import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

//Swiper
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
  const navigate = useNavigate();
  const [activeSlideIndex, setActiveSlideIndex] = useState(() => {
    const path = window.location.pathname;
    return path === "/DiaryHome" ? 1 : 0;
  });
  //이전에 있던 activeSlideIndex을 기억하기 위해 초기값을 넣어준다

  //swiper의 인덱스 상태에 따라 url에 각각 넣어주기
  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.activeIndex);
    const path = swiper.activeIndex === 0 ? "/Calendar" : "/DiaryHome";
    navigate(path);
  };

  //swiper 인덱스 상태에 따라 초기화면 보여주기
  useEffect(() => {
    const path = window.location.pathname;
    const initialIndex = path === "/DiaryHome" ? 1 : 0;
    setActiveSlideIndex(initialIndex);
    console.log("swiper 인덱스 번호 ", activeSlideIndex);
    console.log(path);
  }, [handleSlideChange]);

  return (
    <StyledSwiper
      modules={Pagination}
      spaceBetween={50}
      slidesPerView={1}
      pagination={{ clickable: false }}
      observeParents={true}
      observer={true}
      onSlideChange={handleSlideChange}
      initialSlide={activeSlideIndex}
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

/* window: 브라우저 창을 나타내는 전역 개체를 나타냅니다. 브라우저 환경과 관련된 다양한 속성 및 메서드에 대한 액세스를 제공합니다.
location: 웹 페이지의 현재 URL 정보를 나타내는 window 객체의 속성입니다.
pathname: 현재 URL의 경로 부분을 구체적으로 나타내는 location 개체의 속성입니다. 여기에는 도메인 이름 뒤와 쿼리 매개변수 또는 조각 앞에 오는 URL 부분이 포함됩니다.

예를 들어 현재 URL이 https://example.com/DiaryHome인 경우 window.location.pathname은 /DiaryHome을 반환합니다. */
