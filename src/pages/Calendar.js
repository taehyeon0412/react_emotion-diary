import { styled } from "styled-components";
import { addMonths, format } from "date-fns";

//COMPONENT
import { RenderCells, RenderHeader } from "../components/CalendarItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  margin-bottom: 10px;
  margin-top: 10px;
  padding-top: 20px;
  border-radius: 20px;

  background-color: #fdfaf9;
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

const CalendarList = styled.div``;

const CalendarItem = styled.div``;

//styled------------------------------------------------------------

function Calendar() {
  const currentDate = new Date();
  const selectedDate = new Date();
  let currentMonth = new Date(format(currentDate, "yyyy")); //올해 첫번째 달
  const date = ["sun", "Mon", "Thu", "Wed", "Thr", "Fri", "Sat"];
  const month = []; //달력 렌더링

  for (let i = 0; i < 12; i++) {
    month.push(
      <CalendarItem key={Math.random()}>
        <RenderHeader currentMonth={currentMonth} />
        <RenderCells currentMonth={currentMonth} selectedDate={selectedDate} />
      </CalendarItem>
    );
    currentMonth = addMonths(currentMonth, 1); //currentMonth+1씩 증가해서 12월까지
  }
  //CalendarItem.js -RenderHeader,RenderCells

  return (
    <Wrapper>
      <TodayDiv>
        <TodayCurText>
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

      <CalendarList>{month}</CalendarList>
      {/*달력 body*/}
    </Wrapper>
  );
}

export default Calendar;
