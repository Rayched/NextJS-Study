
### `Route Group`

- `Route`, 논리적 그룹 (logical group) 만드는 기능
- `root layout` 거치지 않아도, 여러 레이아웃을 사용할 수 있으며 <br/>
	어떤 `layout` 사용하고, 어떤 `layout` 사용하지 않는 등 <br/>
	`layout` 선택적으로 사용할 수 있다.

- `Route Group` 사용하려면 아래와 같이 폴더 이름을 `(소괄호)` 묶어줘야 한다.

``` plainText
/app
└ /(home) '(소괄호)' 안의 폴더 이름은 원하는대로 설정 가능
	└ page.tsx ('/app' → '/app/(home)')
└ layout.tsx
└ /details
	└ page.tsx
	└ layout.tsx
```

- `Next App` 확인해보면, `page.tsx` 파일을 `/(home)`으로 옮겨도
- URL이 바뀌거나 하지는 않는다.

- `/details`는 폴더 이름을 따로 괄호로 묶어두지는 않았기에
- `"/details"` URL 입력해야만 해당 페이지로 접속 가능하지만

- `/(home)`은 폴더 이름을 `(소괄호)` 묶어뒀기 때문에
- 굳이 `"/home"`이라는 URL 입력할 필요가 없다. <br/>
	(
		`root layout`은 모든 route에 공통적으로 적용하는 <br/>
		레이아웃이기 때문에 `Route Group` 이동 X
	)

---

