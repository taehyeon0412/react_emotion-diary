import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

//COMPONENTS
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";

const Wrapper = styled.div``;

const NewButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border: 1px solid rgba(189, 195, 199, 1);
  background-color: white;
  border-radius: 20px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 3px 20px 0px;
  transition-duration: 0.2s;

  &:active {
    margin-left: 3px;
    margin-top: 3px;
    box-shadow: none;
  }

  i {
    font-size: 40px;
    color: rgba(189, 195, 199, 1);
  }
`;

//styled-------------------------------------------------------

function DiaryHome() {
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  //diaryList의 데이터값은 APP의 DiaryStateContext에서 전달받는다.

  const [data, setData] = useState([]);

  //헤더 부분 날짜 계산
  const [currentDate, setCurrentDate] = useState(new Date());
  const headText = `${currentDate.getFullYear()}년 ${
    currentDate.getMonth() + 1
  }월의 기록`;
  //js에서는 1월이 0으로 시작해서 +1을 해줘야됨

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerText = `나만의 감정 일기장`;
  }, []);

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
    <Wrapper>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />

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

export default DiaryHome;
