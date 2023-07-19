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
import { useMemo } from "react";
import { styled } from "styled-components";

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(182, 113, 91);
  font-size: 30px;
  font-weight: 700;
  margin-top: 20px;
`;

const CalendarCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;

  &:hover {
    cursor: pointer;
  }

  &.disabled {
    color: #dcdad9;
  }

  &.selected {
    background-color: #efdbd4;
    color: #c0392b;
  }
`;

const CalendarCellText = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarBody = styled.div``;

//styled -----------------------------------------------------

export const RenderHeader = ({ currentMonth }) => {
  const monthString = useMemo(
    () => currentMonth.toLocaleString("en-US", { month: "long" }),
    [currentMonth]
  );

  return <CalendarHeader>{monthString}</CalendarHeader>;
};
//달의 이름 헤더

export const RenderCells = ({ currentMonth, selectedDate }) => {
  const monthStart = useMemo(() => startOfMonth(currentMonth), [currentMonth]);
  const monthEnd = useMemo(() => endOfMonth(monthStart), [monthStart]);
  const startDate = useMemo(() => startOfWeek(monthStart), [monthStart]);
  const endDate = useMemo(() => endOfWeek(monthEnd), [monthEnd]);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  /* while 반복문은  day가 endDate보다 커지면 종료된다. */

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const isSameMonthDay = isSameMonth(day, monthStart);
      const isSelectedDay = isSameDay(day, selectedDate);
      const key = day.toISOString();
      formattedDate = format(day, "d");

      days.push(
        <CalendarCell
          key={key}
          className={`${
            !isSameMonthDay ? "disabled" : isSelectedDay ? "selected" : "valid"
          }`}
        >
          <CalendarCellText>{formattedDate}</CalendarCellText>
        </CalendarCell>
      );

      day = addDays(day, 1);
      console.log("렌더링됨");
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
