import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { styled } from "styled-components";

const CalendarHeader = styled.div``;

const CalendarCell = styled.div``;

const CalendarCellText = styled.span``;

const Row = styled.div``;

const CalendarBody = styled.div``;

//styled -----------------------------------------------------

export const RenderHeader = ({ currentMonth }) => {
  return (
    <CalendarHeader>
      {currentMonth.toLocaleString("en-US", { month: "long" })}
    </CalendarHeader>
  );
};
//달의 이름 헤더

export const RenderCells = ({ currentMonth, selectedDate }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  /* while 반복문은  day가 endDate보다 커지면 종료된다. */

  /* console.log(isSameMonth(day, monthStart)); */ //day가 monthStart 날짜와 같은 달에 속하는지 여부 조건부로 렌더링 적용
  /* console.log(isSameDay(day, selectedDate)); */ //day가 selectedDate와 동일한지 확인. day와 selectedDate의 일, 월, 연도가 같으면 true를 반환

  const sameMonth = isSameMonth(day, monthStart).toString();
  const sameDay = isSameDay(day, selectedDate).toString();

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");

      days.push(
        <CalendarCell
          /* samemonth={sameMonth}
          sameday={sameDay} */
          key={Math.random()}
        >
          <CalendarCellText>{formattedDate}</CalendarCellText>
        </CalendarCell>
      );

      day = addDays(day, 1);
    }

    rows.push(<Row key={Math.random()}>{days}</Row>);
    days = [];
  }

  return <CalendarBody>{rows}</CalendarBody>;
};

/*
 date-fns의 메소드
ex) currentDate : 2022년 6월 1일 [Wed Jun 01 2022 21:18:49 GMT+0900 (Korean Standard Time)]
1. monthStart : 오늘이 속한 달의 시작일 [1 : Wed Jun 01 2022 00:00:00 GMT+0900 (Korean Standard Time)]
2. monthEnd :  오늘이 속한 달의 마지막일 [30 : Thu Jun 30 2022 23:59:59 GMT+0900 (Korean Standard Time)]
3. startDate : monthStart가 속한 주의 시작일 [5/29 : Sun May 29 2022 00:00:00 GMT+0900 (Korean Standard Time) ]
4. endDate : monthEnd가 속한 주의 마지막일 [7/2 : Sat Jul 02 2022 23:59:59 GMT+0900 (Korean Standard Time)]
*/
