import React, { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { styled } from "styled-components";
import { NewButton } from "./DiaryHome";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import moment from "moment";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-direction: column;
  height: 90vh;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 20px;

  background-color: #fdfaf9;
`;

const CalendarBody = styled(Calendar)`
  min-width: 95%;
  margin-top: 20px;
  height: 90vh;
  border: none;
  border-radius: 20px;
  font-family: "Nanum Pen Script";

  background-color: #fdfaf9;

  button {
    font-family: "Nanum Pen Script";
    font-weight: 700;
  }

  .react-calendar__viewContainer {
    height: 90%;
  }

  .react-calendar__navigation__label {
    font-size: 25px;

    @media (max-width: 650px) {
      font-size: 20px;
    }
  }

  .react-calendar__month-view__weekdays {
    font-size: 25px;

    @media (max-width: 650px) {
      font-size: 20px;
    }
  }

  //각 일자
  .react-calendar__tile {
    margin-top: 15px;
    text-align: center;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    font-size: 20px;

    @media (max-height: 850px) {
      height: 60px;
    }
  }

  //선택시
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    border-radius: 14px;
    background-color: rgba(248, 194, 145, 1);
  }

  //현재 날짜
  .react-calendar__tile--now {
    border-radius: 14px;
    background-color: rgba(178, 190, 195, 0.6);
  }
`;

const ImageDiv = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;

  img {
    width: 100%;
    height: 100%;
  }

  @media (max-height: 850px) {
    width: 20px;
    height: 20px;
    margin-top: 7px;
  }
`;
//styled--------------------------------------------------------

function HomeCalendar() {
  const [value, onChange] = useState(new Date());
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);

  //App의 date 데이터를 YYYY-MM-DD 형식으로 바꾸는 함수
  const getFormatDate = (diaryList) => {
    const dateValues = diaryList.map((item) => item.date); //App의 데이터 배열중에 date만 배열형태로 불러옴
    return dateValues.map((dateValue) =>
      moment(dateValue).format("YYYY-MM-DD")
    );
  };

  //App 날짜 데이터와 달력 날짜 비교 함수
  const findMatchedDate = (diaryListValue, calendarValue) => {
    return diaryListValue.find((date) => date === calendarValue);
  };

  //달력 클릭 함수
  const onClick = (value) => {
    const diaryListValue = getFormatDate(diaryList);
    const calendarValue = moment(value).format("YYYY-MM-DD");

    const matchedDate = findMatchedDate(diaryListValue, calendarValue);

    if (matchedDate) {
      const matchedItem = diaryList.find(
        (item) => moment(item.date).format("YYYY-MM-DD") === matchedDate
      );
      const matchedItemId = matchedItem?.id;
      const matchedItemEmotion = matchedItem?.emotion;

      console.log(
        `일치 date: ${matchedDate}, 일치한 아이템 id: ${matchedItemId}, 일치한 아이템 emotion:${matchedItemEmotion}`
      );
      navigate(`/diary/${matchedItemId}`);
    } else {
      console.log("일치하는것이 없음");
      navigate(`/New?selectedDate=${calendarValue}`);
    }

    /* matchedDate와  diaryList의 데이터가 일치하는지 확인하고 같다면 matchedItem에 넣어준다*/
  };

  //달력날짜 = 일기날짜 일때 이모티콘 나오게 하는 함수
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const matchedItem = diaryList.find(
        (item) => moment(item.date).format("YYYY-MM-DD") === formattedDate
      );

      if (matchedItem) {
        const emotionNumber = matchedItem.emotion;
        const emotionImagePath = `assets/emotion${emotionNumber}.png`;

        return (
          <ImageDiv>
            <img
              src={process.env.PUBLIC_URL + emotionImagePath}
              alt={`Emotion-${formattedDate}`}
            />
          </ImageDiv>
        );
      }
    }

    return null;
  };

  /*view === "month" 하는이유 :  달력은 "월", "주" 또는 "일"과 같은 다양한 보기를 가질 수 있어 
  시간에 대한 다양한 수준의 세분성을 표시할 수 있다.
   캘린더가 "월" 보기에 있을 때만 이모티콘이 나타가게 하기 위해서 if문을 써줌
    */

  //현재 날짜 이후로 선택안되게 하기
  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); //날짜비교만 할수있게 시간을 전부 0으로 설정
    return date > today; // 날짜가 현재보다 많으면 true를 반환함
  };

  return (
    <Wrapper>
      <CalendarBody
        onChange={onChange}
        value={value}
        locale="en"
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        tileDisabled={({ date }) => isDateDisabled(date)}
        onClickDay={onClick}
        tileContent={tileContent}
      />

      <NewButton
        onClick={() => {
          navigate("/New");
        }}
      >
        <i class="fa-duotone fa-plus fa-lg"></i>
      </NewButton>
    </Wrapper>
  );
}

export default HomeCalendar;