import { useState } from "react";
import { styled } from "styled-components";

const Wrapper = styled.div``;

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};
//일기 정렬 옵션

/* onChange가 가르키는 것은 setSortType이므로 onchange가 실행되면 
sortType의 value를 바꾸는것과 같다*/

function DiaryList({ diaryList }) {
  const [sortType, setSortType] = useState(`latest`);

  const changeOptionDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === `latest`) {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));
    /* diaryList의 값을 문자열->배열로 다시 바꿔 copyList에 넣어서 
    diaryList의 기존배열이 안깨지게 함 */
    const sortedList = copyList.sort(compare);

    return sortedList;
  };
  //sort 비교 일기 정렬

  return (
    <Wrapper>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />

      {changeOptionDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </Wrapper>
  );
}

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
