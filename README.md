# 작업 일정 관리 시스템 (Facility & Logistics Operations Dashboard)

사업장별 일반 건물 시설 설비, 물류 입출고 자재 및 인프라 작업 내역을 통합적으로 관리할 수 있는 대시보드 웹 애플리케이션입니다.  
본 프로젝트는 **HTML5/JS 표준 버전에 더해 인스웨이브 웹스퀘어5(WebSquare5) 버전**을 동일한 구조로 제공합니다.

---

## 📁 프로젝트 파일 구조

- **HTML5 Standard Version**:
  - [`index.html`](file:///Users/jeonhyochul/work/Example/index.html) / [`work_schedule.html`](file:///Users/jeonhyochul/work/Example/work_schedule.html): 대시보드 메인 레이아웃 HTML
  - [`app.js`](file:///Users/jeonhyochul/work/Example/app.js): 데이터 바인딩, 셀 단위 즉시 편집, 검색 및 필터 제어 로직
  - [`style.css`](file:///Users/jeonhyochul/work/Example/style.css): 대시보드 디자인 시스템 & 스타일시트
- **WebSquare5 Enterprise Version**:
  - [`work_schedule_websquare.xml`](file:///Users/jeonhyochul/work/Example/work_schedule_websquare.xml): 웹스퀘어5 규격 XForms XML (DataCollection `dlt_schedule`, GridView `grd_schedule`, `scwin` 컨트롤러 포함)
  - [`websquare.html`](file:///Users/jeonhyochul/work/Example/websquare.html): 웹스퀘어5 UI 실행기 및 XML 소스코드 / DataList Inspector 대시보드

---

## 📌 주요 기능

- **통합 관리 테이블 (`w2:gridView`)**: Site(서울본사, 판교센터 등), 구역/Zone, 작업유형, 작업구분, 작업대상(설비/자재/시설), 작업 내용 컬럼 지원
- **그리드 텍스트 모드 & 셀 단위 클릭 편집 (Single Cell Editing)**:
  - 기본 읽기 모드는 세련된 텍스트 및 뱃지(Chip Tag) 표기
  - 셀 클릭 시 해당 셀만 즉시 편집 모드로 전환
- **작업유형/구분 연동 동적 "작업대상" 드롭다운**:
  - `PM/BM/CM/점검` ➔ **설비** (냉난방 공조기, 엘리베이터, 부스터 펌프, 자가발전기 등)
  - `자재입출고` ➔ **자재** (물류 박스, 파렛트, 포장재, LED 모듈 등)
  - `시설/인프라` ➔ **시설** (주차 정산기, 소방 스프링클러, 통신 랙 등)
  - 드롭다운 내 실시간 검색, 체크박스 선택, **체크된 항목 최상단 정렬** 지원
- **작업 내용 `<textarea>` 멀티라인 편집**:
  - `Enter` 키로 자유로운 줄바꿈 지원 (바깥 영역 클릭 시 자동 저장)
- **실시간 검색 및 필터링 / CSV 다운로드**:
  - 검색어 실시간 필터 및 CSV 내보내기 기능 제공
- **WebSquare5 DataCollection (`dlt_schedule`) 연동**:
  - `scwin.onpageload`, `scwin.btnSearch_onclick`, `scwin.btnAddRow_onclick` 등 웹스퀘어5 표준 스크립트 구조 준수

---

## 🚀 실행 방법

### 1. 표준 HTML5 버전 실행
```bash
open index.html
```

### 2. WebSquare5 버전 실행 (브라우저 시뮬레이터 & XML 뷰어)
```bash
open websquare.html
```

---

## 🛠️ 기술 스택

- **HTML5/JS Native**: HTML5, Vanilla JavaScript (ES6+), CSS3 (Custom Properties)
- **WebSquare5 Enterprise**: WebSquare XML (XForms), DataCollection (`w2:dataList`), `scwin` Controller Script, `w2:gridView`
