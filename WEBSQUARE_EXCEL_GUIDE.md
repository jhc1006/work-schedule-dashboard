# 웹스퀘어(WebSquare) 멀티 그리드 및 컴포넌트 엑셀 통합 다운로드 가이드

본 문서는 WebSquare 환경에서 여러 개의 그리드(`GridView`) 데이터와 `TextArea`에 입력된 공지사항/전달사항 등의 텍스트를 **하나의 엑셀 시트에 연속으로 통합(멀티 다운로드)** 하여 리포트 형태로 출력하는 방법을 정리한 가이드입니다.

---

## 1. 개요 및 구현 배경
대시보드 화면이나 종합 운영 관제 시스템에서는 상단 공지사항, 근태 현황 그리드, 작업 일정 관리 그리드 등 다양한 형태의 정보가 한 화면에 노출됩니다. 이를 사용자가 한 번의 클릭으로 깔끔하게 **단일 엑셀 시트(1 Sheet)**에 모아서 다운로드할 수 있도록 `advancedExcelDownload` 함수의 `infoArr` 옵션을 활용합니다.

---

## 2. 핵심 구현 방법 (`infoArr` 활용)

WebSquare의 `advancedExcelDownload(options, infoArr)` 메서드를 사용하면 기본 그리드 외에 원하는 좌표(`rowIndex`, `colIndex`)에 타이틀, 섹션 텍스트, 추가 그리드 객체(`targetGrid`)를 유연하게 배치할 수 있습니다.

### 주요 속성 설명
* **`options`**: 파일명, 시트명, 타입(`type: "1"` - 화면에 보이는 데이터 기준), 헤더 포함 여부 등을 지정합니다.
* **`infoArr`**: 시트 내 특정 위치에 커스텀 텍스트나 서브 그리드를 추가하기 위한 배열 객체입니다.
  * `rowIndex`, `colIndex`: 배치할 엑셀 행/열 인덱스
  * `rowSpan`, `colSpan`: 셀 병합 범위
  * `text`: 출력할 텍스트 내용
  * `wordWrap`: 엑셀 셀 내 줄바꿈(`\n`) 유지 여부 (`"true"`)
  * `drawBorder`: 셀 테두리 표시 여부 (`true`)
  * `targetGrid`: 추가로 이어 붙일 그리드 컴포넌트 객체

---

## 3. 전체 소스 코드 예시 (JavaScript)

```javascript
scwin.btnExcelDownload_onclick = function(e) {
    // 1. 엑셀 기본 설정 및 파일명 정의
    var options = {
        fileName: "시설_물류_근태_종합_운영_관제_보고서.xlsx",
        sheetName: "통합 1시트",
        type: "1",               // 화면에 보이는 데이터 기준
        useHeader: true,
        useFooter: true,
        startRowIndex: 7         // 첫 번째 그리드(grid1)가 시작될 엑셀 행 번호
    };

    // 2. infoArr 배열 생성 (타이틀, 섹션명, textarea 데이터 포함)
    var infoArr = [];

    // ① 메인 타이틀 (0행)
    infoArr.push({
        rowIndex: 0,
        colIndex: 0,
        rowSpan: 1,
        colSpan: 8,
        text: "시설·물류·근태 종합 운영 관제 보고서 (통합 1시트)",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "14px",
        bgColor: "#DBEEF3",
        drawBorder: true
    });

    // ② 발행 일시 및 시스템 정보 (1행)
    infoArr.push({
        rowIndex: 1,
        colIndex: 0,
        rowSpan: 1,
        colSpan: 8,
        text: "발행 일시: 2026-09-10 23:32:05 | 통합 센터 관제 시스템",
        textAlign: "center",
        fontSize: "9px",
        drawBorder: true
    });

    // ③ [근무 전달사항 / 공지사항] 영역 제목 삽입 (3행)
    infoArr.push({
        rowIndex: 3,
        colIndex: 0,
        text: "■ 근무 전달사항 및 실시간 공지사항",
        fontWeight: "bold",
        fontSize: "11px"
    });

    // ④ TextArea에 입력된 실제 데이터 가져오기 및 infoArr 추가 (4~5행)
    var memoText = textarea1.getValue(); // textarea 컴포넌트 ID 기준
    
    infoArr.push({
        rowIndex: 4,
        colIndex: 0,
        rowSpan: 2,              // 2개 행 확보
        colSpan: 8,              // 그리드 전체 폭에 맞추어 병합
        text: memoText ? memoText : "등록된 전달사항 없음",
        textAlign: "left",
        verticalAlign: "top",    // 상단 정렬
        fontSize: "10px",
        wordWrap: "true",        // 셀 내부 줄바꿈 활성화
        bgColor: "#F9F9F9",      // 영역 구분을 위한 배경색
        drawBorder: true         // 테두리 박스 처리
    });

    // ⑤ 첫 번째 섹션 제목 ("1. 근태현황") (7행 위치)
    infoArr.push({
        rowIndex: 7,
        colIndex: 0,
        text: "1. 근태현황 (Attendance Management Status)",
        fontWeight: "bold",
        fontSize: "11px"
    });

    // 3. 첫 번째 그리드(grid1) 데이터 행 수 계산을 통한 동적 위치 산출
    var grid1TotalRows = grid1.getTotalRow();
    
    // 두 번째 그리드 및 섹션이 시작될 행 번호 자동 계산 (TextArea 및 그리드1 영역 고려)
    var startRowForGrid2 = 7 + 1 + grid1TotalRows + 4; 

    // ⑥ 두 번째 섹션 제목 ("2. 작업일정관리") 삽입
    infoArr.push({
        rowIndex: startRowForGrid2 - 2,
        colIndex: 0,
        text: "2. 작업일정관리 (Work Schedule Management)",
        fontWeight: "bold",
        fontSize: "11px"
    });

    // ⑦ 두 번째 그리드(grid2) 영역 설정을 infoArr에 추가
    infoArr.push({
        rowIndex: startRowForGrid2,
        colIndex: 0,
        targetGrid: grid2,
        useHeader: true,
        useFooter: false
    });

    // 4. advancedExcelDownload 실행 (기준: grid1)
    grid1.advancedExcelDownload(options, infoArr);
};
```
