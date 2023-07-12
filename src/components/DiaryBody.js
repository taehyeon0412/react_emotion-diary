import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import React from "react";

//COMPONENTS
import MyButton from "./MyButton";

const Wrapper = styled.div`
  display: flex;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(178, 190, 195, 1);
  justify-content: space-between;
  background-color: rgba(178, 190, 195, 0.1);
  border-radius: 20px;
  margin-bottom: 10px;
`;

const EmotionDiv = styled.div`
  margin-left: 15px;
  cursor: pointer;
  min-width: 120px;
  height: 80px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
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
  img {
    width: 50%;
  }

  @media (max-width: 500px) {
    min-width: 80px;
  }
`;

const TextDiv = styled.div`
  cursor: pointer;
  flex-grow: 1;
  margin-left: 20px;
`;

const TextDivDate = styled.div`
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 5px;
`;

const TextDivText = styled.div`
  font-size: 18px;
  padding-right: 10px;
`;

/* const EditDiv = styled.div`
  min-width: 70px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`; */

//styled -------------------------------------------------------

function DiaryBody({ id, emotion, content, date }) {
  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  //일기 상세페이지 연결

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };
  //일기 Edit페이지 연결

  return (
    <Wrapper>
      <EmotionDiv emotion={emotion} onClick={goDetail}>
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </EmotionDiv>

      <TextDiv onClick={goDetail}>
        <TextDivDate>{strDate}</TextDivDate>
        <TextDivText>
          {content.length >= 25 ? content.slice(0, 25) + "..." : content}
        </TextDivText>
      </TextDiv>

      {/* <EditDiv>{<MyButton text={"수정하기"} onClick={goEdit} />}</EditDiv> */}
    </Wrapper>
  );
}

export default React.memo(DiaryBody);
