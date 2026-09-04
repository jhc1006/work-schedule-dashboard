## 📌 Pull Request 요약

1. **WebSquare5 XML 대시보드 & 시뮬레이터 구축**
   - WebSquare5 DataCollection (dlt_attendance, dlt_schedule, dlt_material, dmp_search), TabControl, GridView 및 WFrame 구성
   - http://localhost:3000/websquare.html 웹 시뮬레이터 연동

2. **사업장별 동적 탭 템플릿 & 서브 파일 모듈화**
   - 탭 콘텐츠를 독립 서브 파일 (tab_attendance.html, tab_schedule.html, tab_material.html 및 XML)로 분리
   - 탭 선택 시 비동기 페치 및 메모리 캐싱 로더 적용

3. **1시트 통합 엑셀 & PDF 보고서 다운로드 (이미지 실물 포함)**
   - 실시간 전달사항/공지 + [근태현황] + [작업일정관리] + [자재관리] 전체 데이터를 1개 시트에 통합 출력
   - 엑셀 및 PDF 내부에 작업 현장 사진 실물 이미지 직접 내보내기 지원

4. **📅 특정일자 작업 내용 불러오기 및 일정 일괄 추가**
   - 과거/특정일자의 작업 내역을 조회하고 체크박스로 선택하여 현재 일정에 일괄 추가(복사) 기능 구현

5. **그리드 전용 독립 스크롤 & 고정 헤더 디자인**
   - 상단 고정 헤더 + 100vh 뷰포트 피팅 및 그리드 내부 수직 스크롤/Sticky Table Header 적용
