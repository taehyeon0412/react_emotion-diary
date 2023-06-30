import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

//COMPONENT
import MyButton from "./MyButton";

const Wrapper = styled.div`
  margin-top: 20px;
`;

const Select = styled.select`
  border: 0;
  border-radius: 5px;
  background-color: #ececec;

  cursor: pointer;
  font-family: "Nanum Pen Script";
  font-size: 18px;
  text-align: center;
`;

const Menu_wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 10px;
`;

const Left_col = styled.div`
  display: flex;
  gap: 10px;
`;

const Right_col = styled.div`
  flex-grow: 1; //남은 자리 모두 차지

  button {
    width: 100%;
  }
`;

//styled--------------------------------------------------------

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </Select>
  );
};
/* onChange가 가르키는 것은 setSortType이므로 onchange가 실행되면 
sortType의 value를 바꾸는것과 같다*/

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];
//일기 정렬 옵션

const filterOptionList = [
  {
    value: "all",
    name: "전부다",
  },
  {
    value: "good",
    name: "좋은 감정만",
  },
  {
    value: "bad",
    name: "안좋은 감정만",
  },
];
//감정 필터 옵션

function DiaryList({ diaryList }) {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState(`latest`); //정렬
  const [filter, setFilter] = useState(`all`); //감정필터

  const changeOptionDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === `latest`) {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    //sort 비교 정렬

    const filterCallBack = (item) => {
      if (filter === `good`) {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    //filter 비교 정렬

    const copyList = JSON.parse(JSON.stringify(diaryList));
    /* diaryList의 값을 문자열->배열로 다시 바꿔 copyList에 넣어서 
    diaryList의 기존배열이 안깨지게 함 */

    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    //sort 비교와 filter 비교를 합쳐서 filter.sort로 해줌

    return sortedList;
  };
  //select 옵션 변경 로직

  return (
    <Wrapper>
      <Menu_wrapper>
        <Left_col>
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </Left_col>

        <Right_col>
          <MyButton
            type={`positive`}
            text={`새 일기쓰기`}
            onClick={() => navigate(`/new`)}
          />
        </Right_col>
      </Menu_wrapper>

      {changeOptionDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </Wrapper>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};
//리스트가 없거나 안받아와질때 오류가 나지않게 빈배열을 준다

export default DiaryList;

/* 
받는 데이터
id: 
emotion: 
content: 
date:  
*/
