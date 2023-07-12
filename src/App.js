import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import { styled } from "styled-components";
import React, { useEffect, useReducer } from "react";

//PAGES
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const Wrapper = styled.div`
  height: 95vh;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: "Nanum Pen Script";

  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 650px) {
    width: 640px;
  }

  @media (max-width: 650px) {
    width: 90vw;
  }
`;

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case `INIT`: {
      return action.data;
    }
    case `CREATE`: {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break; // 브레이크를 걸지않으면 default까지 수행되므로 create가 수행되면 브레이크 하게함
    }
    case `REMOVE`: {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case `EDIT`: {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }

    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

/* useState 대신 useReducer를 이용해서 여러가지 케이스를 한꺼번에 할 수있음 */

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
//사용하기 위해서는 컴포넌트 전체를 Context.Provider로 감싸준다

//----------------------------------------------------------

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  //useReducer(reducer, []);   []는 기초데이터값

  useEffect(() => {
    const localData = localStorage.getItem(`diary`);
    if (localData) {
      const diaryList = JSON.parse(localData);

      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);
  //localStorage에 있는값을 처음 시작 시 불러온다.

  //CREATE
  const onCreate = (date, content, emotion, weather) => {
    dispatch({
      type: "CREATE",
      data: {
        id: new Date().getTime() + Math.random(), //id가 안겹치게 하기 위해 현재의 밀리초 시간에서 랜덤한 값을 더해줌
        date: new Date(date).getTime(),
        content,
        emotion,
        weather,
      },
    });
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  //EDIT
  const onEdit = (targetId, date, content, emotion, weather) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
        weather,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      {/* 각각의 요소에 데이터 제공 */}
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path="/new" element={<New />} />

              <Route path="/edit/:id" element={<Edit />} />

              <Route path="/diary/:id" element={<Diary />} />

              <Route path="/" element={<Home />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

//SPA이면서 CSR방식
