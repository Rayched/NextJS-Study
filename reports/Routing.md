
### 기존 방식 (`React`만 사용했을 때)

- 기존에 `React`로 Routing은 `React-router` 라이브러리를 활용해서 구현하였다.

``` tsx
function Routers(){
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/details/:dataId" element={<Details />}/>
			</Routes>
		</BrowserRouter>
	);
}
```

- `react-router-dom`의 `<Route />`에 `URL`과 해당 URL에 접근했을 때 
- 랜더링할 컴포넌트를 정의하는 등의 형식으로 Routing을 구현했었다.

- `Next.js`는 이러한 방식을 사용하지 않는 것 같다.
- 현재 기본 페이지만 존재하는 상태에서 새로운 페이지를 추가하고자 한다면

- `/app` 폴더 내부에 추가하려는 페이지의 이름으로 된 폴더를 만들고
- 해당 폴더 안에 `page.jsx / page.tsx` 파일을 추가하면
- 새로운 페이지 추가가 완료된다.

``` plainText
/app
└ /details
	└ page.tsx
└ layout.tsx
└ page.tsx
```

- 페이지를 새로 추가하면 이런 식의 형태를 가지게 될 것이다.

- 폴더 명은 새로 추가한 페이지로 접속하기 위한 URL이 되고
- `/details/page.tsx`는 해당 URL로 접속 시 랜더링되는 컴포넌트이다.

<img src="refImgs/nextjs_route_sample1.gif" />

---

- 그리고 당연하게도 `Nested Routing`도 가능하다.
- `/details`의 하위 페이지로 `/movies` 추가한다고 치면 아래와 같이 작성하면 된다.

``` plainText
/app
└ /details
	└ page.tsx
	└ /movies
		└ page.tsx
└ layout.tsx
└ page.tsx
```


- 이번에는 `/app`에서 `/search` 폴더를 추가하되
- `page.tsx` 파일은 정의하지 않은 상태로 `/search` 접근을 시도해보자.
- 아래 이미지와 같은 에러 메시지가 출력되는 것을 확인할 수 있다.

<img src="refImgs/nextjs_404errors.png" />

- 앞에서 말했던 것처럼, 페이지 폴더 명은 `URL` 값이고
- `page.tsx` 파일은 페이지 접속 시 랜더링되는 컴포넌트, 웹페이지 파일이다.

- `/search` 폴더 내부에, 웹 브라우저가 랜더링할 컴포넌트인
- `page.tsx` 파일이 존재하지 않기 때문에 발생한 에러이다.

- 즉, 페이지를 새로 추가할 때는 폴더만이 아니라 페이지 파일
- `page.tsx / page.jsx`를 무조건 추가해줘야 한다.

---

