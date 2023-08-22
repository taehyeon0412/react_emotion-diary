## **🛠사용 기술 및 라이브러리**

- react-router-dom(useNavigate, useParams)
- useContext,useReducer
- useEffect,useState
- styled-components(createGlobalStyle)
- react-modal
- font-fontawesome
- moment(날짜 라이브러리)
- react-calendar
- react-swiper
- firebase(배포)
- 최적화
    - React.memo,useCallback
    - 동적 렌더링 도구 크롬 React Developer Tools
    - 렌더링 최적화 테스트 도구 Lighthouse
    
    ---
    
    -React Developer Tools에 있는 
    Highlight updates when components render 기능을 이용하여
    동적으로 렌더링 시 필요 없는 연산에 대해 최적화를 진행하였습니다.
    
    -React.memo, useCallback을 사용하여 최적화하고 useEffect를 이용하여 확인을 하며 진행하였습니다.
    

## Route

- `/`   Home 페이지
- `/DiaryHome`   swiper index 0 Home 페이지
- `/Calendar`   swiper index 1 Home 페이지
- `/New`    New 페이지
- `/edit/:id`   Edit 페이지
- `/diary/:id`   Diary 페이지

## 🎨 UI

**1. Home, swiper index 0번, 1번 페이지**

`/` , `/DiaryHome` , `/Calendar`

![home](https://github.com/taehyeon0412/react_emotion-diary/assets/71374539/f5434352-b487-4097-b6ee-5c3a5800d343)



**2. New 페이지**  ****`/New`



**3. Edit 페이지** `/edit/:id`





**4. Diary 페이지** `/diary/:id`



## **📝 기능**

> 일기를 쓰면 해당 날짜의 달력에 감정 표시 기능
> 


