# 작업 일정 관리 시스템 (Work Schedule Management Dashboard)

반도체 및 유틸리티 설비(UT ID) 점검 및 예방보전 작업 내역을 관리할 수 있는 웹 대시보드 애플리케이션입니다.

## 📌 주요 기능

- **와이어프레임 완벽 대응 테이블**: Site, FAB, 작업유형, 작업구분, UT ID(설비명), 작업 내용 컬럼 관리
- **그리드 텍스트 모드 & 셀 단위 편집 (Single Cell Editing)**:
  - 기본 상태는 깔끔한 텍스트 및 칩 뱃지(Chip Tag) 표기
  - 셀 클릭 시 해당 셀만 즉시 편집 모드로 전환
- **UT ID 커스텀 멀티 셀렉트 컴포넌트**:
  - 드롭다운 내 실시간 설비명/ID 검색 기능
  - 체크박스를 이용한 다중 설비 선택
  - **체크된 설비 최상단 정렬 (Top Sorting)**
- **작업 내용 `<textarea>` 지원**:
  - 멀티라인 입력 지원 (`Enter`로 저장, `Shift+Enter`로 줄바꿈)
- **실시간 검색 및 필터링**:
  - Site 및 작업유형 필터링 및 실시간 키워드 검색
- **데이터 지속성 & CSV 다운로드**:
  - `localStorage` 기반 자동 저장 (새로고침 시 데이터 유지)
  - CSV 파일 내보내기 및 샘플 데이터 초기화 기능 지원

## 🚀 실행 방법

별도의 서버 설치 없이 `work_schedule.html` 파일을 웹 브라우저(Chrome, Edge, Safari 등)에서 열어 바로 사용 가능합니다.

```bash
open work_schedule.html
```

## 🛠️ 기술 스택

- **Core**: HTML5, Vanilla JavaScript (ES6+)
- **Styling**: Vanilla CSS3 (Custom Properties, Glassmorphic Dashboard Theme)
