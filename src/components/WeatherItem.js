import React from "react";
import { styled } from "styled-components";

const WeatherItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 5px;

  border: ${({ weather, selected }) => {
    if (weather === 1 && selected === true) {
      return `3px solid red`;
    } else if (weather === 2 && selected === true) {
      return `3px solid #f0932b`;
    } else if (weather === 3 && selected === true) {
      return `3px solid #f6e58d`;
    } else if (weather === 4 && selected === true) {
      return `3px solid #6ab04c`;
    } else if (weather === 5 && selected === true) {
      return `3px solid #686de0`;
    } else if (weather === 6 && selected === true) {
      return `3px solid #30336b`;
    } else if (weather === 7 && selected === true) {
      return `3px solid #7ed6df`;
    } else if (weather === 8 && selected === true) {
      return `3px solid #ff7979`;
    } else {
      return `3px solid white`;
    }
  }};

  img {
    width: 100%;
    /*  margin-bottom: 10px; */
  }

  span {
    font-size: 18px;
    color: ${({ selected }) => {
      if (selected) {
        return `white`;
      } else {
        return `black`;
      }
    }};
  }
`;

function WeatherItem({ weather_id, weather_img, onClick, weather, selected }) {
  return (
    <WeatherItemDiv
      onClick={() => onClick(weather_id)}
      weather={weather}
      selected={selected}
    >
      <img src={weather_img} />
    </WeatherItemDiv>
  );
}
//onClick 이벤트가 발생하면 weather_id를 DiaryEditor로 전달한다
/* DiaryEditor에서 전달받은 weather, selected을 사용하여 
클릭된 개체만 색깔을 바꿀 수 있게 만들어줌*/

export default React.memo(WeatherItem);
