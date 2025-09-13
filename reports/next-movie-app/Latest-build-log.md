
### 최근 작업 내역

#### 개요

- 강의에서는 자체적으로 제공되는 API 사용했지만
- 필자는 이를 사용하지 않고, 예전에 React Movie App 개발할 때
- 사용했던 영화 진흥 위원회의 Open API 사용하였다.

- `Next Movie App`의 `Routing`은 다음과 같다.
- `/ (Home)`, `/movies/[movieId]`

- Home 화면에는 영화 진흥 위원회의 '일일 박스오피스 API' 사용해서
- 현재 극장에서 상영 중인 영화 중 매출액 Top 10을 보여준다.

- 다만 영화 진흥 위원회 API, Kobis API는
- `영화 포스터`, `영화 줄거리`, `영화 스틸컷` 등의 데이터를 제공하지 않기에
- 한국 영상 자료원 Open API, KMDb API를 사용해서
- `Kobis`에서 제공되지 않던 나머지 자료들을 받아왔다.

---

#### `Home, Fetch 설명`

- Home 화면에서 사용되는 `fetch` 함수는 총 두 가지이다.
- 하나는 `Kobis, 일일 박스오피스 data`를 `fetch`하는 함수
- 다른 하나는 `Kmdb, 영화 상세정보 data`를 `fetch`하는 함수이다.

- 전자의 경우에는 그냥 날짜만 제대로 설정하면 상관이 없지만
- 후자는 영화 제목, 개봉일, 감독 명 등 영화의 상세정보가 필요했다.

- 이러한 점을 반영한 `Home`의 `fetch` 함수는 아래와 같이 실행된다.

``` ts
//KMDb, 영화 상세정보 data fetch function
//영화 포스터, 줄거리, 스틸컷, 예고편 등의 data return
import {I_KMDbResult, I_KobisResult} from "./movieapp-types";

type I_KMDbDataProps = {
	movieNm?: string;
	openDt?: string;
};

interface I_MoviesData {
	rank?: string;
	movieId?: string;
	movieNm?: string;
	openDt?: string;
	plots?: string;
	audiAcc?: string;
	posters?: string[];
	stills?: string[];
	vods?: string[];
};

interface I_DetailData {
	posters?: string[];
	plots?: string;
	stills?: string[];
	vods?: string[];
};

async function GetKMDbData({movieNm, openDt}: I_KMDbDataProps){
	const URL = "KMDb API URL";
	const Key = "KMDb API Key";
	
	const DetailFetch = await fetch(
		`${URL}&ServiceKey=${Key}&title=${movieNm}&releaseDts=${openDt}`
	);
	
	const Resp = await DetailFetch.json() as I_KMDbResult;
	
	const Details = await Resp.Data[0].Result[0];
	
	const Vods = await Details.vods.vod.map((data) => data.vodUrl);
	
	const DetailData: I_DetailData = {
		posters: GetDetail.posters.split("|"),
		plots: GetDetail.plots.plot[0].plotText,
		stills: GetDetail.stlls.split("|"),
		vods: Vods
	};
	
	return DetailsData;
};

async function GetMoviesData(){
	//일일 박스오피스 data fetch
	const URL = "Kobis API URL";
	const Key = "Kobis api key";
	const TargetDt = "20250912"; //임의 날짜
	
	const MoviesFetch = await fetch(
		`${URL}?key=${Key}&targetDt=${TargetDt}`
	);
	
	const Resp = await MoviesFetch.json() as I_KobisResult;
	
	/**
		*일일 박스오피스, data (movieNm, openDt / 영화제목, 개봉일)
		*각 영화의 포스터, 줄거리, 스틸컷 등의
		* Kobis API에서 제공되지 않는 나머지 data를 받아옴
		* Kobis data + Kmdb data인 새로운 movie data return
	*/
	const Movies = Resp.boxOfficeResult.dailyBoxOfficeList.map(async(data) => {
		const KmdbData = await GetKMDBData(
			{movieNm: data.movieNm, openDt: data.openDt}
		).then();
		
		const Format: I_MoviesData = {
			rank: data.rank, //박스오피스 순위
			movieId: data.movieCd, //영화 id (movies page 필요)
			movieNm: data.movieNm, //영화 제목
			openDt: data.openDt, //영화 개봉일
			audiAcc: data.audiAcc, //누적 관객 수
			posters: KmdbData.posters, //영화 포스터's
		};
		
		return Format;
	});
	
	const Result = Promise.all(Movies).then((value) => value);
	
	return Result;
};
```

``` plainText
* 전체 실행 과정
1. GetMoviesData() 함수 실행
- 해당 함수는 제일 먼저, Kobis api 통해 일일 박스오피스 정보를 받아온다.
- 일일 박스오피스 정보를 받아오면, 각 영화의 제목(movieNm), 개봉일(openDt)
  참고하는, 'GetKMDbData()' 함수가 실행된다. 
  (array.map 통해 각 영화 별로 반복 실행됨)

2. GetKMDbData() 함수 실행
- 해당 함수는 Kobis API에선 제공되지 않는 데이터를 
  다른 API를 사용해서 받아오는 용도의 fetch 함수이다.
- /movies 페이지의 fetch 함수에서도 실행하는 것을 전제로 했기에
  최종적으로 아래 네 종류의 data를 return한다.
- 'poster(영화 포스터)', 'plots(줄거리)', 'stills(스틸컷)', 'vods(예고편)'

3. GetMoviesData() 복귀
- GetKMDbData() 함수 실행 종료, poster data return 받았다.
- 이후 기존 boxoffice data에서 필요한 부분 (movieCd, movieNm, openDt,..)
  그리고 GetKMDBData()가 가져온 poster data 합쳐서
- 새로운 형태의 Movies data가 담긴 배열이 return된다.

- 물론 이건 어디까지나 실제 data가 아닌 이걸 return한다는 약속
  Promise이기 때문에 'Promise.all()' 통해 병렬실행해서
- 최종적으로 Home 화면에 필요한 data가 return 된다.
```


---

#### `Promise.all()` / `3.4 Parallel Request`

- `JavaScript`에서 여러 `비동기 async` 작업을 동시에 실행하고
- 모든 작업이 완료될 때까지 기다렸다가, 결과를 배열 형태로 반환하는 함수

- 여러 Promise가 모두 이행될 때까지 기다렸다가
- 그 결과를 한꺼번에 받아볼 수 있게 하는 함수

---

