import { styled } from "styled-components";

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

//styled------------------------------------------------------------

function Calendar() {
  const currentDate = new Date();
  const selectedDate = new Date();
  const date = ["sun", "Mon", "Thu", "Wed", "Thr", "Fri", "Sat"];

  return (
    <Wrapper>
      <TodayDiv>
        <TodayCurText>
          <p>{currentDate.toLocaleString("en-US", { month: "long" })}</p>
          <p>{currentDate.getDate()}</p>
        </TodayCurText>
        <p>{currentDate.getFullYear()}</p>
      </TodayDiv>

      <WeekdayDiv>
        {date.map((i) => (
          <Weekday key={i}>{i}</Weekday>
        ))}
      </WeekdayDiv>
    </Wrapper>
  );
}

export default Calendar;
