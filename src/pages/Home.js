import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

//COMPONENTS
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

function Home() {
  const diaryList = useContext(DiaryStateContext);
  //diaryList의 데이터값은 APP의 DiaryStateContext에서 전달받는다.

  const [data, setData] = useState([]);

  //헤더 부분 날짜 계산
  const [currentDate, setCurrentDate] = useState(new Date());
  const headText = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월`;
  //js에서는 1월이 0으로 시작해서 +1을 해줘야됨

  const increaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      )
    );
  };

  const decreaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
      )
    );
  };
  //버튼 onClick

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime(); //마지막 날짜에 시,분,초까지 입력해야 마지막날짜에 오류가 없음

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, currentDate]);

  /* 첫번째 날짜와 마지막 날짜를 구하고 그사이에 있는 일기만 나타나게함*/
  /* diaryList,currentDate가 변화하는 순간에만 랜더링 되야되기 때문에 useEffect를 사용함 */

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default Home;
