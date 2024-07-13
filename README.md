# KHU SW Mileage with Klaytn (KIP-7)
2024년 1학기 블록체인 과목의 기말 대체 프로젝트인 "Klaytn - KIP7을 활용한 경희대학교 SW 마일리지" 프로젝트 학생 서비스 프로토타입 입니다.
- 프론트엔드: 컴퓨터 공학과 18학번 정의왕 (euiwang0323@gmail.com)
- 서버: 컴퓨터 공학과 18학번 김성환 (wjswp12347@khu.ac.kr)

최종 보고서: [SW 마일리지 토큰 서비스 최종 보고서.pdf](./SW%20마일리지%20토큰%20서비스%20최종%20보고서.pdf)

## Directory Architecture
프로젝트를 구성하는 디렉토리는 아래와 같은 구성으로 작성되었습니다.

### assets
프로젝트에 사용되는 에셋들을 관리하는 폴더입니다. 폰트, 이미지 파일 및 상수값이 존재합니다.

### components
프로젝트에 사용되는 단위 컴포넌트를 관리하는 폴더입니다. 이 프로젝트는 Chakra-UI 라이브러리를 이용하여 UI를 구성하였습니다. 자세한
내용은 [Chakra UI 공식 홈페이지](https://v2.chakra-ui.com/getting-started)를 참고하세요.

### feature
프로젝트에서 사용하는 API와 React-Query로 구성된 query, mutation Hook을 관리하는 폴더입니다.

### global
Global Type으로 선언된 내용들이 작성된 파일이 존재하는 폴더입니다.

### hooks
프로젝트 내부에서 사용되는 Hook을 관리하는 폴더입니다.

### pages
프로젝트를 구성하는 단위 페이지 컴포넌트를 관리하는 폴더입니다. 해당 폴더에는 "페이지" 파일만 존재합니다.

### store
전역으로 사용되는 상태와 로컬로 사용되는 상태가 관리되는 폴더입니다. 로컬로 관리되는 상태일 경우, 컴포넌트 내부 코드가 지나치게 길어질 경우만 분리시켰습니다.

### styles
프로젝트에서 사용되는 스타일 관련 파일들을 관리하는 폴더입니다.

## Setup

### 1. **Clone the repository**
```shell
    git clone https://github.com/JeongEuiWang/klay-sw-mileage.git
```
### 2. **Install Dependencies**
```shell
    npm install
```

### 3. **ENV Setting**
- env.development: 개발 환경에서 사용하는 환경 변수입니다.
- env.production: 프로덕션 환경에서 사용하는 환경 변수입니다.
```dotenv
REACT_APP_SERVER_URL=API 호출에 사용될 서버 요청 경로입니다.
REACT_APP_API_VERSION=v1/
REACT_APP_API_KLAYSCOPE_URL=Token Holder 페이지로 이동하기 위한 KlaytnScope URL입니다.
REACT_APP_API_PROVIDER_END_POINT=Caver를 통한 Node와의 연결을 위한 EndPoint입니다.
```

### 4. **Running**
```shell
    npm run start
```
