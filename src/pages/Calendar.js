import { styled } from "styled-components";
import { addMonths, format } from "date-fns";
import { useEffect, useRef } from "react";

//COMPONENT
import { RenderCells, RenderHeader } from "../components/CalendarItem";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 150px auto;
  overflow: hidden;
  flex-direction: column;
  height: 100vh;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 20px;

  background-color: #fdfaf9;
`;

const Header = styled.div`
  position: fixed;
  padding-top: 20px;
  padding-bottom: 5px;
  border-radius: 20px 20px 0px 0px;
  top: 5;
  z-index: 99;
  background-color: #fdfaf9;

  @media (min-width: 650px) {
    width: 600px;
  }

  @media (max-width: 650px) {
    width: 80vw;
  }
`;

const TodayDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 30px;
  margin-left: 20px;
  margin-right: 20px;
  color: rgb(182, 113, 91);
`;

const TodayCurText = styled.div`
  display: flex;
  gap: 10px;

  &:hover {
    cursor: pointer;
    color: rgba(248, 194, 145, 1);
  }
`;

const WeekdayDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(7, auto);
  gap: 1%;
  margin-left: 5px;
  margin-right: 5px;
`;

const Weekday = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efdbd4;
  border-radius: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-size: 18px;
  font-weight: 700;
`;

const Body = styled.div`
  margin-top: 130px;
  overflow-y: auto;
  height: 75vh;

  -ms-overflow-style: none; // IE에서 스크롤바 감춤
  &::-webkit-scrollbar {
    display: none !important; // 윈도우 크롬 등
  }
`;

const CalendarList = styled.div``;

const CalendarItem = styled.div``;

//styled------------------------------------------------------------

function Calendar() {
  const currentDate = new Date();
  const selectedDate = new Date();
  let currentMonth = new Date(format(currentDate, "yyyy")); //올해 첫번째 달
  const date = ["sun", "Mon", "Thu", "Wed", "Thr", "Fri", "Sat"];
  const month = []; //달력 렌더링
  const monthRef = useRef(null);

  //달력body 함수
  for (let i = 0; i < 12; i++) {
    month.push(
      <CalendarItem
        key={Math.random()}
        ref={
          format(currentMonth, "MM") === format(selectedDate, "MM")
            ? monthRef
            : null // 오늘날짜가 속해있는 달에 포커스가 잡히게 조건문으로 ref를 사용함
        }
      >
        <RenderHeader currentMonth={currentMonth} />
        <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} />
      </CalendarItem>
    );
    currentMonth = addMonths(currentMonth, 1); //currentMonth+1씩 증가해서 12월까지
  }
  //CalendarItem.js -RenderHeader,RenderCells

  //렌더링시 포커스를 넣어주는 함수
  useEffect(() => {
    if (monthRef.current !== null) {
      monthRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  //오늘 날짜 누르면 해당월로 이동하는 함수
  const scrollCurrentMonth = () => {
    if (monthRef.current !== null) {
      monthRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Wrapper>
      <Header>
        <TodayDiv>
          <TodayCurText onClick={scrollCurrentMonth}>
            <p>{currentDate.toLocaleString("en-US", { month: "long" })}</p>
            <p>{currentDate.getDate()}</p>
          </TodayCurText>
          <p>{currentDate.getFullYear()}</p>
        </TodayDiv>
        {/* 오늘 날짜 */}

        <WeekdayDiv>
          {date.map((i) => (
            <Weekday key={i}>{i}</Weekday>
          ))}
        </WeekdayDiv>
        {/* 월~일 요일 */}
      </Header>

      <Body>
        <CalendarList>{month}</CalendarList>
      </Body>
      {/*달력 body*/}
    </Wrapper>
  );
}

export default Calendar;
