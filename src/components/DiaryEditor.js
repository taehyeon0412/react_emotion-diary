import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";

//COMPONENT

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const Wrapper = styled.div``;

const SectionWrapper = styled.div``;

const Section = styled.section`
  margin-top: 40px;

  h4 {
    font-size: 23px;
    margin-bottom: 20px;
    font-weight: 700;
  }
`;

const DateDiv = styled.div``;

const DateInput = styled.input`
  border: none;
  border-radius: 5px;
  background-color: #ececec;
  padding: 10px 20px 10px 20px;
  cursor: pointer;

  font-family: "Nanum Pen Script";
  font-size: 20px;
`;

const EmotionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 2%;
`;

const TextArea = styled.textarea`
  font-family: "Nanum Pen Script";
  font-size: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  resize: vertical; //높이만 조절가능
  border: none;
  border-radius: 5px;
  background-color: #ececec;
  padding: 20px;
  outline: none;
`;

const ControlBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

//styled ---------------------------------------------------------------

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_name: "완전 좋음",
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_name: "좋음",
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_name: "보통",
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_name: "나쁨",
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_name: "매우 나쁨",
  },
];
//감정 리스트 배열

const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
/*new Date().toISOString()을 하면
ex)2023-07-03T10:14:58.123Z 같이 나온다 그래서 slice를 해주어 자르면 원하는 값이 나옴   */

function DiaryEditor() {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const contentRef = useRef();
  const [content, setContent] = useState("");

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };
  //날짜 input onChange 함수

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };
  // 이모션 클릭 함수

  const onChangeText = (e) => {
    setContent(e.target.value);
  };
  // 본문 text onChange 함수

  const { onCreate } = useContext(DiaryDispatchContext);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus(); //length가 1보다 작으면 저장안되고 포커스
      return;
    }

    onCreate(date, content, emotion); //onCreate에 각각의 데이터를 보내줌
    navigate(`/`, { replace: true }); //replace:true를 하면 페이지 뒤로가기를 눌러도 새일기쓰기 페이지로 다시넘어오지 않는다
  };
  // 작성완료 하면 APP DiaryDispatchContext의 onCreate에 각각의 데이터를 보내주는 함수

  return (
    <Wrapper>
      <MyHeader
        headText={"새 일기쓰기"}
        leftChild={
          <MyButton text={`< 뒤로가기`} onClick={() => navigate(-1)} />
        }
      />

      <SectionWrapper>
        <Section>
          <h4>오늘은 언제인가요?</h4>
          <DateDiv>
            <DateInput type="date" value={date} onChange={onChangeDate} />
          </DateDiv>
        </Section>
        {/* 날짜 섹션 */}

        <Section>
          <h4>오늘의 감정</h4>
          <EmotionWrapper>
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                emotion={emotion}
                selected={it.emotion_id === emotion}
              />
            ))}
          </EmotionWrapper>
        </Section>
        {/* 감정 섹션 */}

        <Section>
          <h4>오늘의 일기</h4>
          <TextArea
            placeholder="오늘은 어땠나요?"
            ref={contentRef}
            value={content}
            onChange={onChangeText}
          />
        </Section>
        {/* 일기 본문 섹션 */}

        <Section>
          <ControlBox>
            <MyButton text={"취소하기"} onClick={() => navigate(-1)} />
            <MyButton
              text={"작성완료"}
              type="positive"
              onClick={handleSubmit}
            />
          </ControlBox>
        </Section>
        {/*컨트롤박스 섹션  */}
      </SectionWrapper>
    </Wrapper>
  );
}

export default DiaryEditor;
