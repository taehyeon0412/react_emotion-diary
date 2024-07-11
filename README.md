## **🛠사용 기술 및 라이브러리**

- react-router-dom(useNavigate, useParams)
- Context API
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

![home](https://github.com/taehyeon0412/react_emotion-diary/assets/71374539/2890c120-27cb-494c-8934-42912b7c37f1)



**2. New 페이지**  `/New`

![Newpage](https://github.com/taehyeon0412/react_emotion-diary/assets/71374539/6f517d9d-4c96-4029-a908-030a6e67e7f7)



**3. Edit 페이지** `/edit/:id`

![Editpage](https://github.com/taehyeon0412/react_emotion-diary/assets/71374539/163dcf1c-1a38-4221-9ef9-16c44c147cb7)
<br/>
![EditDelete](https://github.com/taehyeon0412/react_emotion-diary/assets/71374539/c73f0b56-d2a0-4374-8dba-eadbe17c6618)



**4. Diary 페이지** `/diary/:id`

![Diarypage](https://github.com/taehyeon0412/react_emotion-diary/assets/71374539/31bd2634-e009-4c55-8e8c-793af817febb)

## **📝 기능**

> 일기를 쓰면 해당 날짜의 달력에 감정 표시 기능

![해당날짜 감정표시](https://github.com/taehyeon0412/react_emotion-diary/assets/71374539/d30291ef-7b84-45d7-8dae-5c0ff1a31dea)
<br/>
<br/>
<br/>
<br/>
## 💡 성장 경험

### 데이터의 효율적인 전달

useContext를 통해 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있다는 것을 배웠습니다.

useState, useEffect와 조합하여 효율적으로 개발을 할 수 있게 이해도를 높였습니다.

### 공통 컴포넌트 모듈화

웹사이트에 사용되는 input, button, header와 같은 컴포넌트를 모듈화하여 범용적으로 사용할 수 있게 하였습니다. 동일한 코드를 중복적으로 사용할 필요 없이 효율적으로 개발을 할 수 있게 되었습니다.

### 최적화 경험 및 도구에 대한 이해

성능 이슈를 해결하는 문제를 해결했습니다.
문제 해결을 위해 코드를 리팩토링하고, 불필요한 부분들을 최적화하여 크롬 LightHouse를 통해 높은 점수를 받을 수 있었습니다
