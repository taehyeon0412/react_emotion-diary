import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { DiaryStateContext } from "../App";

//COMPONENT
import DiaryEditor from "../components/DiaryEditor";

const Wrapper = styled.div``;

//styled---------------------------------------------------------

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);
  //conText에서 diaryList 데이터를 받아옴

  const [originData, setOriginData] = useState();

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerText = `일기 수정`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [diaryList, id, navigate]);
  //diaryList에서 현재 수정하는 데이터를 꺼내옴
  /* targetDiary가 있을경우 setOriginData에 넣어주고
  targetDiary가 없을경우 "/"으로 이동 뒤로가기시 페이지 이동못하게 replace해줌 */

  return (
    <Wrapper>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </Wrapper>
  );
}

export default Edit;

//DiaryEditor에 isEdit,originData props를 전달해줌
