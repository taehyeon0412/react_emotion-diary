import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { styled } from "styled-components";

//UTIL
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";
import { weatherList } from "../util/weather";

//COMPONENTS
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";

const DiaryPage = styled.div``;

const Article = styled.article``;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 50px;

  h4 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 30px;
    margin-top: 30px;
  }
`;

const EmotionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 200px;
  height: 200px;
  border-radius: 60px;

  background-color: ${({ emotion }) => {
    if (emotion === 1) {
      return `#64c964`;
    } else if (emotion === 2) {
      return `#9dd772`;
    } else if (emotion === 3) {
      return `#fdce17`;
    } else if (emotion === 4) {
      return `#fd8446`;
    } else if (emotion === 5) {
      return `#fd565f`;
    }
  }};

  span {
    font-size: 25px;
    color: white;
  }
`;

const WeatherWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10%;

  img {
    width: 70px;
    height: 50px;
  }

  h4 {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 30px;
    margin-top: 30px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  background-color: #ececec;
  border-radius: 5px;
  word-break: keep-all; //단어를 쪼개서 줄바꿈 금지
  overflow-wrap: break-word; // 텍스트를 끊어서 영역 안넘어가게 강제로 줄바꿈
  line-height: 2; //줄간격

  p {
    padding: 20px;
    text-align: left;
    font-size: 18px;
    font-family: "Yeon Sung";
  }
`;

//styled--------------------------------------------------------

function Diary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerText = `나의 일기장 상세보기`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate(`/`, { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <DiaryPage>로딩중입니다...</DiaryPage>;
  } else {
    const emotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    ); //emotion id 같은지 보기
    const weatherData = weatherList.find(
      (it) => parseInt(it.weather_id) === parseInt(data.weather)
    ); //weather id 같은지 보기

    return (
      <DiaryPage>
        <MyHeader
          headText={`${getStringDate(new Date(data.date))} 기록`}
          leftChild={
            <MyButton text={"뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <MyButton
              text={"수정하기"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />

        <Article>
          <Section>
            <h4>오늘의 감정</h4>
            <EmotionWrapper emotion={data.emotion}>
              <img src={emotionData.emotion_img} />
              <span>{emotionData.emotion_name}</span>
            </EmotionWrapper>
          </Section>
          {/* 감정박스 섹션 */}

          <Section>
            <WeatherWrapper>
              <h4>오늘의 일기</h4>
              <img src={weatherData.weather_img} />
            </WeatherWrapper>

            <ContentWrapper>
              <p>{data.content}</p>
            </ContentWrapper>
          </Section>
          {/* 일기 본문 섹션 */}
        </Article>
      </DiaryPage>
    );
  }
}

export default Diary;
