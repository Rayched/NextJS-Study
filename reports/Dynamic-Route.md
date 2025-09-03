
### Dynamic Route

-  `/details`, `/details/movies` 같은 정적 `route`가 아님
- 예를 들어서 박스 오피스 App 만들었다고 가정했을 때
- 영화의 상세 정보 페이지의 URL은 다음과 같은 형식일 것이다.

``` plainText
Sample URL: /movies/:movieId
(1). 영화: A, 영화 Id(movieId): 123456
	=> /movies/123456
(2). 영화: B, 영화 Id(movieId): 789123
	=> /movies/789123
```

- URL이 고정되지 않고, 변수 `movieId`의 값에 따라 계속 변하는 Route <br/>
	=> **`Dynamic Route`**

- 