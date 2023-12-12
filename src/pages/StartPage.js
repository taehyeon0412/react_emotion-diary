import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Wrapper = styled.div`
  height: 95vh;
  position: absolute;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-family: "Nanum Pen Script";
  user-select: none;
  -webkit-user-drag: none;
  overflow: hidden;

  background-color: white;

  &.page {
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }

  @media (min-width: 650px) {
    width: 640px;
  }

  @media (max-width: 650px) {
    width: 90vw;
    height: 85vh;
  }
`;

const StartDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30%;
  height: 30%;
`;

function StartPage() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 800);

    return () => clearTimeout(timeout);
    // 페이지가 숨겨진 후에 컴포넌트가 언마운트되거나 업데이트되는 경우에 타임아웃이 계속 실행되지 않도록 하기위함
  }, []);

  return (
    <Wrapper className={`page ${visible ? "visible" : "hidden"}`}>
      <StartDiv>
        <img src={process.env.PUBLIC_URL + `favicon.ico`} />
      </StartDiv>
    </Wrapper>
  );
}

export default StartPage;
