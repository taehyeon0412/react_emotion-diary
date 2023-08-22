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

![home.gif](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/54070a27-b7f4-4fb5-a3d4-61b50cb76e95/home.gif)

**2. New 페이지**  ****`/New`

![Newpage.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/69749aad-a2a9-4b8e-bc07-e71a98f8f00f/Newpage.png)

**3. Edit 페이지** `/edit/:id`

![Editpage.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/dfe8481e-8aeb-44c2-80f9-2f4207804287/Editpage.png)

![EditDelete.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/89c33b06-3539-42af-b4e7-902925d48791/EditDelete.png)

**4. Diary 페이지** `/diary/:id`

![Diarypage.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2660b3c4-f945-46e1-a17d-523648832c51/Diarypage.png)

## **📝 기능**

> 일기를 쓰면 해당 날짜의 달력에 감정 표시 기능
> 

![해당날짜 감정표시.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/69b2be82-5da6-4941-8e60-329ee66d127d/%ED%95%B4%EB%8B%B9%EB%82%A0%EC%A7%9C_%EA%B0%90%EC%A0%95%ED%91%9C%EC%8B%9C.png)
