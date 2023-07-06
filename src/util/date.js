export const getStringDate = (date) => {
  return date.toISOString().slice(0, 10);
};
/*new Date().toISOString()을 하면
  ex)2023-07-03T10:14:58.123Z 같이 나온다 그래서 slice를 해주어 자르면 원하는 값이 나옴   */
