import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

//COMPONENT

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";
import WeatherItem from "./WeatherItem";
import { DiaryDispatchContext } from "../App";
import DiaryModal from "./DiaryModal";

//Util
import { getStringDate, getStringDateToday } from "../util/date";
import { emotionList } from "./../util/emotion";
import { weatherList } from "./../util/weather";

const Wrapper = styled.div``;

const SectionWrapper = styled.div``;

const Section = styled.section`
  margin-top: 25px;

  h4 {
    font-size: 23px;
    margin-bottom: 20px;
    font-weight: 700;
  }

  &:first-child {
    margin-top: 20px;
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

const WeatherWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
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
  margin-bottom: 60px;
`;

//styled ---------------------------------------------------------------

function DiaryEditor({ isEdit, originData }) {
  const navigate = useNavigate();
  const [date, setDate] = useState(getStringDateToday);
  const [emotion, setEmotion] = useState(3);
  const [weather, setWeather] = useState(1);
  const contentRef = useRef();
  const [content, setContent] = useState("");

  const onChangeDate = useCallback((e) => {
    setDate(e.target.value);
  }, []);
  //날짜 input onChange 함수

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);
  // 이모션 클릭 함수

  const handleClickWeather = useCallback((weather) => {
    setWeather(weather);
  }, []);
  //날씨 클릭 함수

  const onChangeText = useCallback((e) => {
    setContent(e.target.value);
  }, []);
  // 본문 text onChange 함수

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus(); //length가 1보다 작으면 저장안되고 포커스
      return;
    }

    if (!isEdit) {
      onCreate(date, content, emotion, weather); //onCreate에 각각의 데이터를 보내줌
    } else {
      onEdit(originData.id, date, content, emotion, weather); //onEdit에 각각의 데이터를 보내줌
    }

    navigate(`/`, { replace: true }); //replace:true를 하면 페이지 뒤로가기를 눌러도 새일기쓰기 페이지로 다시넘어오지 않는다
  };
  // 작성완료 하면 APP DiaryDispatchContext의 onCreate,onEdit에 각각의 데이터를 보내주는 함수

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setWeather(originData.weather);
      setContent(originData.content);
    }
  }, [isEdit, originData]);
  //isEdit일때만 작동하는 useEffect를 만들고
  //Edit페이지에서 isEdit,originData props를 받아와 데이터로 넣는다

  return (
    <Wrapper>
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
        leftChild={
          <MyButton text={`< 뒤로가기`} onClick={() => navigate(-1)} />
        }
        rightChild={isEdit && <DiaryModal originData={originData} />}
      />

      <SectionWrapper>
        <Section>
          <h4>오늘은 언제인가요?</h4>
          <DateDiv>
            <DateInput
              type="date"
              value={date}
              onChange={onChangeDate}
              max={getStringDateToday}
            />
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
          <h4>오늘의 날씨</h4>
          <WeatherWrapper>
            {weatherList.map((it) => (
              <WeatherItem
                key={it.weather_id}
                {...it}
                onClick={handleClickWeather}
                weather={weather}
                selected={it.weather_id === weather}
              />
            ))}
          </WeatherWrapper>
        </Section>
        {/* 날씨 섹션 */}

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

export default React.memo(DiaryEditor);
