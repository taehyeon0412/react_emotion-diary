import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import "./css/App.css";
import { styled } from "styled-components";

//COMPONENTS
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

const Wrapper = styled.div`
  min-height: 100vh;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 650px) {
    width: 640px;
  }

  @media (max-width: 650px) {
    width: 90vw;
  }
`;

function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        {/* 헤더 시작 */}

        <MyHeader
          headText={"App"}
          leftChild={
            <MyButton
              text={"왼쪽 버튼"}
              onClick={() => alert("왼쪽 버튼을 클릭")}
            />
          }
          rightChild={
            <MyButton
              text={"오른쪽 버튼"}
              onClick={() => alert("오른쪽 버튼을 클릭")}
            />
          }
        />
        {/* 헤더 끝 */}

        <MyButton
          text={`버튼`}
          onClick={() => alert("버튼클릭")}
          type={`default`}
        />
        <MyButton
          text={`버튼`}
          onClick={() => alert("버튼클릭")}
          type={`positive`}
        />
        <MyButton
          text={`버튼`}
          onClick={() => alert("버튼클릭")}
          type={`negative`}
        />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/new" element={<New />} />

          <Route path="/edit" element={<Edit />} />

          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;

//SPA이면서 CSR방식
