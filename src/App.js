import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import "./css/App.css";
import { styled } from "styled-components";

//COMPONENTS
import MyButton from "./components/MyButton";

const Wrapper = styled.div`
  margin-top: 20px;
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
