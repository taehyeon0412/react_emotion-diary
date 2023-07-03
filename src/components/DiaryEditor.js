import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

//COMPONENT

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";

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
  const [emotion, setEmotion] = useState();

  const onChange = (e) => {
    setDate(e.target.value);
  };
  //날짜 input 함수

  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };
  // 이모션 클릭 함수

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
            <DateInput type="date" value={date} onChange={onChange} />
          </DateDiv>
        </Section>

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
      </SectionWrapper>
    </Wrapper>
  );
}

export default DiaryEditor;
