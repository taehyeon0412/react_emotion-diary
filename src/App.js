import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import { styled } from "styled-components";
import React, { useReducer, useRef } from "react";

//PAGES
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

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
  return newState;
};

/* useState 대신 useReducer를 이용해서 여러가지 케이스를 한꺼번에 할 수있음 */

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
//사용하기 위해서는 컴포넌트 전체를 Context.Provider로 감싸준다

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/new" element={<New />} />

              <Route path="/edit" element={<Edit />} />

              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

//SPA이면서 CSR방식
