import { styled } from "styled-components";

const EmotionItemDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  padding-top: 20px;
  padding-bottom: 20px;

  background-color: ${({ emotion, selected }) => {
    if (emotion === 1 && selected === true) {
      return `#64c964`;
    } else if (emotion === 2 && selected === true) {
      return `#9dd772`;
    } else if (emotion === 3 && selected === true) {
      return `#fdce17`;
    } else if (emotion === 4 && selected === true) {
      return `#fd8446`;
    } else if (emotion === 5 && selected === true) {
      return `#fd565f`;
    } else {
      return `#ececec`;
    }
  }};

  img {
    width: 50%;
    margin-bottom: 10px;
  }

  span {
    font-size: 18px;
    color: ${({ selected }) => {
      if (selected) {
        return `white`;
      } else {
        return `black`;
      }
    }};
  }
`;

function EmotionItem({
  emotion_id,
  emotion_img,
  emotion_name,
  onClick,
  emotion,
  selected,
}) {
  return (
    <EmotionItemDiv
      onClick={() => onClick(emotion_id)}
      emotion={emotion}
      selected={selected}
    >
      <img src={emotion_img} />
      <span>{emotion_name}</span>
    </EmotionItemDiv>
  );
}
//onClick 이벤트가 발생하면 emotion_id를 DiaryEditor로 전달한다
/* DiaryEditor에서 전달받은 emotion, selected을 사용하여 
클릭된 개체만 색깔을 바꿀 수 있게 만들어줌*/

export default EmotionItem;
