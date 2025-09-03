
- `NextJS`에서 데이터 Fetch하는 방법에 대해 알아보자.
- 비교를 위해서, 기존 방식 (React에서 쓰던 방식 / Client Side)과 <br/>
	새로운 방식 (`NextJS` 버전 / Server Side) 두 가지 버전을 준비해봤다.

- 현재 수강 중인 강의에서 제공한 API 사용했다. <br/>
- **[`Nomadcoders - NextJS 시작하기`](https://nomadcoders.co/nextjs-for-beginners)**

---

### Data Fetch in Client Side

- `@tanstack/react-query`와 같은 외부 라이브러리는 사용하지 않음.
- `useState`, `useEffect`와 같은 React Hook 활용해서 Data Fetch

``` tsx
"use client"

import {useState, useEffect} from "react";

interface I_Movies {
	"adult": boolean;
	"backdrop_path": string;
	"genre_ids": number[];
	"id": number;
	"original_language": string;
	"original_title": string;
	"overview": string;
	"popularity": number;
	"poster_path": string;
	"release_date": string;
	"title": string;
	"video": false;
	"vote_average": number;
	"vote_count": number;
};

export default function MoviesPage(){
	const [isLoading, setLoading] = useState(true);
	const [Movies, setMovies] = useState<I_Movies[]>([]);
	
	const GetMovieData = async() => {
		const MovieData = await(await(
			await fetch("https://nomad-movies.nomadcoders.workers.dev/movies")
		).json());
		
		setMovies(MovieData);
		setLoading(false);
	};
	
	useEffect(() => {
		GetMovieData();
	}, []);
	
	return (
		<div>
			<h4>Movie's Data</h4>
			{
				isLoading ? "Loading..."
				: (
					<ul>
						{
							Movies?.map((movieData) => {
								return (
									<li key={movieData.id}>
										{movieData.title}
									</li>
								);
							})
						}
					</ul>
				)
			}
		</div>
	);
}
```

- Fetch는 항상 Client 측에서 진행된다. (브라우저가 API에 요청을 보내는 것)
- 이러한 방식은 API 키가 노출될 수도 있다는 문제점이 존재한다. <br/>
	개발자 콘솔의 `Network`로 들어가면 확인할 수 있다. <br/>
	예전에 개발했던 프로젝트 들어가서 확인해보니 진짜로 API Key 확인할 수 있었다.

- 보안 상의 이유로 DB와 통신하기도 어려워진다.

- 그리고 결국은 Client 측에서 Fetch 진행하기 때문에
- 사용자에게 데이터를 가져오고 있다는 걸 알려주기 위해서
- 화면에 `Loading` 상태를 출력해야 하기도 한다.

- 데이터를 가져오기 전까지는 사실상 빈 화면이기 때문이다.
- 이러한 방식은 Server Components에선 사용할 수 없다고 한다.

- 그러므로 이제 Server Components에서 Data Fetch하는 방법을 알아야 한다.

---

### Data Fetch in Server Side




