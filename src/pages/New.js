import { styled } from "styled-components";
import { useEffect } from "react";

//COMPONENT
import DiaryEditor from "../components/DiaryEditor";

function New() {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerText = `새 일기`;
  }, []);

  return <DiaryEditor />;
}

export default New;
