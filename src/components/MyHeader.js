import { styled } from "styled-components";

const Wrapper = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e2e2e2;
  font-family: "Nanum Pen Script";
`;

const HeaderBtnLeft = styled.div`
  display: flex;
  width: 25%;
  justify-content: start;
`;

const HeaderBtnRight = styled.div`
  display: flex;
  width: 25%;
  justify-content: end;
`;

const HeaderText = styled.div`
  display: flex;
  width: 50%;
  font-size: 25px;
  justify-content: center;
`;

//styled----------------------------------------------------

function MyHeader({ headText, leftChild, rightChild }) {
  return (
    <Wrapper>
      <HeaderBtnLeft>{leftChild}</HeaderBtnLeft>
      <HeaderText>{headText}</HeaderText>
      <HeaderBtnRight>{rightChild}</HeaderBtnRight>
    </Wrapper>
  );
}

export default MyHeader;
