export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
//일기 수정하기 날짜

const d = new Date();

export const getStringDateToday = new Date(
  d.getTime() - d.getTimezoneOffset() * 60000
)
  .toISOString()
  .slice(0, 10);
//새일기쓰기 현재 날짜 불러오기

/*new Date().toISOString()을 하면
  ex)2023-07-03T10:14:58.123Z 같이 나온다 그래서 slice를 해주어 자르면 원하는 값이 나옴   */

/* UTC timezone 기준으로 포멧되기 때문에 "날짜" 가 하루 앞당겨진 일자로
표현되기 때문에   */
