import { styled } from "styled-components";

const Button = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 20px;
  padding: 10px 20px 10px 20px;
  font-size: 18px;
  white-space: nowrap;
  font-family: "Nanum Pen Script", cursive;

  background-color: ${(props) =>
    props.type === "positive"
      ? "#64c964"
      : props.type === "negative"
      ? "#fd565f"
      : "#ececec"};
  color: ${(props) => (props.type === "default" ? `black` : `white`)};
`;

function MyButton({ text, type, onClick }) {
  const btnType = ["positive", "negative", "default"].includes(type)
    ? type
    : "default";
  /* type의 잘못된 값을 보정하기 위해 배열안에 있는 타입이 아닌경우
default로 강제로 바꿔준다. */

  return (
    <Button type={btnType} onClick={onClick}>
      {text}
    </Button>
  );
}

export default MyButton;
