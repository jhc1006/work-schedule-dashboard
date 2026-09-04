// ==========================================================================
// Dynamic Integrated Operational Dashboard Application
// (Attendance, Work Schedule & Dynamic Material Management with Image Attachment & Preview)
// ==========================================================================

// --------------------------------------------------------------------------
// 1. Data Constants & Definitions
// --------------------------------------------------------------------------
const AVAILABLE_TAB_DEFINITIONS = [
  { id: 'attendance', name: '근태현황', badgeId: 'badgeAttendanceCount', defaultActive: true },
  { id: 'schedule', name: '작업일정관리', badgeId: 'badgeScheduleCount', defaultActive: true },
  { id: 'material', name: '자재관리', badgeId: 'badgeMaterialCount', defaultActive: true }
];

const DEFAULT_SITE_TAB_TEMPLATES = {
  ALL: ['attendance', 'schedule', 'material'],
  '서울본사': ['attendance', 'schedule', 'material'],
  '판교센터': ['schedule', 'material', 'attendance'],
  '부산센터': ['attendance', 'schedule'],
  '대구센터': ['attendance', 'material']
};

const TARGET_CATEGORY_MAP = {
  EQUIPMENT: [
    { id: 'EQ-HVAC-101', name: '중앙 냉난방 공조기 1호기 (Main HVAC System)', category: '설비' },
    { id: 'EQ-ELEV-204', name: '화물/승객용 엘리베이터 B동 (Freight Elevator)', category: '설비' },
    { id: 'EQ-CONV-302', name: '물류 이송 컨베이어 라인 #2 (Conveyor Line)', category: '설비' },
    { id: 'EQ-GEN-105', name: '비상 자가발전기 세트 (300kW Backup Power)', category: '설비' },
    { id: 'EQ-PUMP-401', name: '메인 급수 부스터 펌프 (Water Booster Pump)', category: '설비' }
  ],
  MATERIAL: [
    { id: 'MAT-BOX-301', name: '표준 물류 포장 박스 세트 (Lot #B42)', category: '자재입출고' },
    { id: 'MAT-PAL-002', name: '플라스틱 표준 파렛트 (1100x1100mm)', category: '자재입출고' },
    { id: 'MAT-TAP-005', name: '포장용 테이프 및 완충재 묶음', category: '자재입출고' },
    { id: 'MAT-LUB-001', name: '산업용 기계 윤활유 드럼 (200L)', category: '자재입출고' },
    { id: 'MAT-LED-102', name: '고효율 LED 조명 교체용 모듈', category: '자재입출고' }
  ],
  FACILITY: [
    { id: 'FAC-PARK-001', name: '지하 주차장 무인 차단기 정산 시스템', category: '시설/인프라' },
    { id: 'FAC-FIRE-002', name: '메인 소방 수신기 및 스프링클러 배관', category: '시설/인프라' }
  ]
};

const ALL_TARGET_ITEMS = [
  ...TARGET_CATEGORY_MAP.EQUIPMENT,
  ...TARGET_CATEGORY_MAP.MATERIAL,
  ...TARGET_CATEGORY_MAP.FACILITY
];

// Initial Data Sets (Includes Demo Image URLs)
const INITIAL_SCHEDULE_DATA = [
  { id: 'row-1', site: '서울본사', fab: 'A동 3층', type: 'PM', subcat: '정기 점검', utIds: ['EQ-HVAC-101'], content: '분기 정기 공조기 필터 점검 및 냉매 압력 계측', imageUrl: './img_hvac.jpg' },
  { id: 'row-2', site: '판교센터', fab: '물류존 1', type: '자재입출고', subcat: '원자재 입고', utIds: ['MAT-BOX-301', 'MAT-PAL-002'], content: '신규 물류 표준 포장재 입고 검수 및 적재', imageUrl: './img_logistics.jpg' },
  { id: 'row-3', site: '부산센터', fab: 'B동 1층', type: 'CM', subcat: '개선 개조', utIds: ['EQ-CONV-302'], content: '컨베이어 벨트 모터 교체 및 속도 제어 튜닝', imageUrl: null },
  { id: 'row-4', site: '서울본사', fab: '지하 2층', type: 'PM', subcat: '정기 점검', utIds: ['EQ-GEN-105'], content: '비상 발전기 무부하 시운전 및 배터리 점검', imageUrl: null },
  { id: 'row-5', site: '판교센터', fab: '물류존 2', type: '자재입출고', subcat: '부품 출하', utIds: ['MAT-LED-102'], content: 'LED 모듈 및 교체 부품 출고 처리', imageUrl: null }
];

const INITIAL_ATTENDANCE_DATA = [
  { id: 'att-1', empId: 'EMP-1001', name: '김철수', dept: '시설관리팀', position: '팀장 (서울본사)', clockIn: '08:45', clockOut: '18:10', status: '정상출근', remarks: 'A동 공조기 점검 총괄' },
  { id: 'att-2', empId: 'EMP-1002', name: '이영희', dept: '물류운영팀', position: '파트장 (판교센터)', clockIn: '08:55', clockOut: '18:00', status: '정상출근', remarks: '입출고 자재 검수 진행' },
  { id: 'att-3', empId: 'EMP-1003', name: '박민수', dept: '인프라점검팀', position: '선임 (판교센터)', clockIn: '09:25', clockOut: '18:30', status: '지각', remarks: '교통 체증 입실 지각' },
  { id: 'att-4', empId: 'EMP-1004', name: '정수진', dept: '시설관리팀', position: '책임 (부산센터)', clockIn: '-', clockOut: '-', status: '연차', remarks: '개인 연차 휴가' },
  { id: 'att-5', empId: 'EMP-1005', name: '최현우', dept: '안전보안팀', position: '수석 (서울본사)', clockIn: '08:30', clockOut: '17:30', status: '정상출근', remarks: '주차 차단기 및 소방 점검' },
  { id: 'att-6', empId: 'EMP-1006', name: '강동원', dept: '물류운영팀', position: '매니저 (대구센터)', clockIn: '09:00', clockOut: '-', status: '출장', remarks: '대구 센터 파렛트 지원 출장' }
];

const INITIAL_MATERIAL_DATA = [
  { id: 'mat-1', code: 'MAT-BOX-301', name: '표준 물류 포장 박스 세트 (Lot #B42)', category: '물류포장재', location: '판교 물류창고 A-2 (판교센터)', stock: 120, minStock: 100, status: '정상재고', lastTxDate: '2026-09-04' },
  { id: 'mat-2', code: 'MAT-PAL-002', name: '플라스틱 표준 파렛트 (1100x1100mm)', category: '물류포장재', location: '부산 센터 창고 B-1 (부산센터)', stock: 15, minStock: 50, status: '재고부족', lastTxDate: '2026-09-03' },
  { id: 'mat-3', code: 'MAT-LUB-001', name: '산업용 기계 윤활유 드럼 (200L)', category: '설비자재', location: '서울본사 지하2층 자재실', stock: 8, minStock: 10, status: '재고부족', lastTxDate: '2026-09-02' },
  { id: 'mat-4', code: 'MAT-LED-102', name: '고효율 LED 조명 교체용 모듈', category: '인프라소모품', location: '서울본사 A동 1층 자재함', stock: 250, minStock: 150, status: '정상재고', lastTxDate: '2026-09-04' },
  { id: 'mat-5', code: 'MAT-FLT-008', name: '공조기 헤파/프리 필터 Kit', category: '설비자재', location: '판교센터 B동 공조실', stock: 0, minStock: 20, status: '입고대기', lastTxDate: '2026-09-01' },
  { id: 'mat-6', code: 'MAT-TAP-005', name: '포장용 테이프 및 완충재 묶음', category: '물류포장재', location: '대구센터 물류존', stock: 80, minStock: 60, status: '정상재고', lastTxDate: '2026-09-04' }
];

// Storage Keys
const SCHEDULE_STORAGE_KEY = 'SK_WORK_SCHEDULE_DATA_V6';
const ATTENDANCE_STORAGE_KEY = 'SK_ATTENDANCE_DATA_V1';
const MATERIAL_STORAGE_KEY = 'SK_MATERIAL_DATA_V1';
const NOTICE_STORAGE_KEY = 'SK_GLOBAL_NOTICE_DATA_V1';
const TAB_TEMPLATE_STORAGE_KEY = 'SK_TAB_TEMPLATES_V1';

// Global Application State
let schedules = [];
let attendances = [];
let materials = [];
let globalNotice = null;
let siteTabTemplates = {};

let activeTab = 'attendance';

let selectedScheduleRowIds = new Set();
let selectedAttendanceRowIds = new Set();
let selectedMaterialRowIds = new Set();

let editingCell = null;
let editingAttendanceCell = null;
let editingMaterialCell = null;

// ==========================================================================
// Initialization & Global Event Listeners
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  loadAllData();

  initNoticeEvents();
  initDynamicTabs();
  initGlobalSearchEvents();
  initTemplateSettingsEvents();
  initIntegratedExportEvents();
  initImagePreviewModalEvents();
  initImportScheduleModalEvents();

  renderNoticeBanner();
  
  // Automatically focus and load the first tab on startup
  const firstTab = AVAILABLE_TAB_DEFINITIONS[0].id; // 'attendance'
  switchTab(firstTab);
});

function initLiveClock() {
  function updateClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const date = String(now.getDate()).padStart(2, '0');
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayStr = days[now.getDay()];

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateElem = document.getElementById('currentClockDate');
    const dayElem = document.getElementById('currentClockDay');
    const timeElem = document.getElementById('currentClockTime');
    const globalDateInput = document.getElementById('globalSearchDate');

    if (dateElem) dateElem.textContent = `${year}-${month}-${date}`;
    if (dayElem) dayElem.textContent = dayStr;
    if (timeElem) timeElem.textContent = `${hours}:${minutes}:${seconds}`;
    if (globalDateInput && !globalDateInput.value) {
      globalDateInput.value = `${year}-${month}-${date}`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

function loadAllData() {
  // Schedules
  const savedSchedule = localStorage.getItem(SCHEDULE_STORAGE_KEY);
  if (savedSchedule) {
    try {
      const parsed = JSON.parse(savedSchedule);
      schedules = parsed.map(item => ({
        ...item,
        utIds: Array.isArray(item.utIds) ? item.utIds : (item.utId ? [item.utId] : []),
        imageUrl: item.imageUrl !== undefined ? item.imageUrl : null
      }));
    } catch (e) { schedules = [...INITIAL_SCHEDULE_DATA]; }
  } else { schedules = [...INITIAL_SCHEDULE_DATA]; }

  // Attendance
  const savedAttendance = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
  if (savedAttendance) {
    try { attendances = JSON.parse(savedAttendance); }
    catch (e) { attendances = [...INITIAL_ATTENDANCE_DATA]; }
  } else { attendances = [...INITIAL_ATTENDANCE_DATA]; }

  // Materials
  const savedMaterial = localStorage.getItem(MATERIAL_STORAGE_KEY);
  if (savedMaterial) {
    try { materials = JSON.parse(savedMaterial); }
    catch (e) { materials = [...INITIAL_MATERIAL_DATA]; }
  } else { materials = [...INITIAL_MATERIAL_DATA]; }

  // Notice
  const savedNotice = localStorage.getItem(NOTICE_STORAGE_KEY);
  if (savedNotice) {
    try { globalNotice = JSON.parse(savedNotice); }
    catch (e) { globalNotice = null; }
  }

  // Tab Templates
  const savedTemplates = localStorage.getItem(TAB_TEMPLATE_STORAGE_KEY);
  if (savedTemplates) {
    try { siteTabTemplates = JSON.parse(savedTemplates); }
    catch (e) { siteTabTemplates = JSON.parse(JSON.stringify(DEFAULT_SITE_TAB_TEMPLATES)); }
  } else {
    siteTabTemplates = JSON.parse(JSON.stringify(DEFAULT_SITE_TAB_TEMPLATES));
  }
}

function saveScheduleData() {
  localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(schedules));
  updateScheduleStats();
}

function saveAttendanceData() {
  localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(attendances));
  updateAttendanceKpis();
}

function saveMaterialData() {
  localStorage.setItem(MATERIAL_STORAGE_KEY, JSON.stringify(materials));
  updateMaterialKpis();
}

function saveNoticeData() {
  if (globalNotice) localStorage.setItem(NOTICE_STORAGE_KEY, JSON.stringify(globalNotice));
  else localStorage.removeItem(NOTICE_STORAGE_KEY);
}

function saveTabTemplates() {
  localStorage.setItem(TAB_TEMPLATE_STORAGE_KEY, JSON.stringify(siteTabTemplates));
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================================================
// 2. DYNAMIC TAB NAVIGATION CONTROLLER
// ==========================================================================
function initDynamicTabs() {
  renderDynamicTabs();
}

function renderDynamicTabs() {
  const mainTabNav = document.getElementById('mainTabNav');
  if (!mainTabNav) return;

  const currentSite = document.getElementById('globalSearchSite')?.value || 'ALL';
  const enabledTabIds = siteTabTemplates[currentSite] || siteTabTemplates['ALL'] || ['attendance', 'schedule', 'material'];

  mainTabNav.innerHTML = '';

  enabledTabIds.forEach(tabId => {
    const def = AVAILABLE_TAB_DEFINITIONS.find(t => t.id === tabId);
    if (!def) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `tab-btn ${activeTab === tabId ? 'active' : ''}`;
    btn.dataset.tab = tabId;

    let iconSvg = '';
    if (tabId === 'attendance') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>`;
    } else if (tabId === 'schedule') {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" /></svg>`;
    } else {
      iconSvg = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>`;
    }

    btn.innerHTML = `${iconSvg} ${def.name} <span class="tab-badge" id="${def.badgeId}">0</span>`;
    btn.addEventListener('click', () => switchTab(tabId));
    mainTabNav.appendChild(btn);
  });

  if (!enabledTabIds.includes(activeTab) && enabledTabIds.length > 0) {
    switchTab(enabledTabIds[0]);
  } else {
    updateAllTabBadges();
  }
}

const tabHtmlCache = {};

async function switchTab(tabId) {
  activeTab = tabId;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  const container = document.getElementById('tabPanelContainer');
  if (!container) return;

  try {
    const res = await fetch(`./tab_${tabId}.html?v=${Date.now()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    tabHtmlCache[tabId] = html;
  } catch (err) {
    if (!tabHtmlCache[tabId]) {
      container.innerHTML = `<div style="padding: 40px; text-align: center; color: #ef4444;">[오류] tab_${tabId}.html 서브 파일을 불러올 수 없습니다: ${err.message}</div>`;
      return;
    }
  }

  container.innerHTML = tabHtmlCache[tabId];

  // Re-bind events and render table data for the loaded module
  if (tabId === 'attendance') {
    initAttendanceEvents();
    renderAttendanceTable();
  } else if (tabId === 'schedule') {
    initScheduleEvents();
    renderScheduleTable();
  } else if (tabId === 'material') {
    initMaterialEvents();
    renderMaterialTable();
  }

  updateAllTabBadges();
}

function updateAllTabBadges() {
  updateAttendanceKpis();
  updateScheduleStats();
  updateMaterialKpis();
}

// ==========================================================================
// 3. TAB TEMPLATE SETTINGS MANAGER
// ==========================================================================
function initTemplateSettingsEvents() {
  const btnOpen = document.getElementById('btnOpenTemplateSetting');
  const modalOverlay = document.getElementById('templateSettingsModalOverlay');
  const btnClose = document.getElementById('btnTplModalClose');
  const btnCancel = document.getElementById('btnTplCancel');
  const btnSave = document.getElementById('btnTplSave');
  const btnReset = document.getElementById('btnTplReset');
  const targetSiteSelect = document.getElementById('tplTargetSite');

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      renderTemplateCheckboxList();
      if (modalOverlay) modalOverlay.classList.add('open');
    });
  }

  if (btnClose) btnClose.addEventListener('click', closeTplModal);
  if (btnCancel) btnCancel.addEventListener('click', closeTplModal);

  if (targetSiteSelect) targetSiteSelect.addEventListener('change', renderTemplateCheckboxList);

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('모든 사업장 탭 템플릿 설정을 기본값으로 초기화하시겠습니까?')) {
        siteTabTemplates = JSON.parse(JSON.stringify(DEFAULT_SITE_TAB_TEMPLATES));
        saveTabTemplates();
        renderTemplateCheckboxList();
        renderDynamicTabs();
        alert('템플릿 설정이 기본값으로 초기화되었습니다.');
      }
    });
  }

  if (btnSave) {
    btnSave.addEventListener('click', () => {
      const site = targetSiteSelect ? targetSiteSelect.value : 'ALL';
      const checkboxes = document.querySelectorAll('.tpl-checkbox');
      const selectedTabIds = [];

      checkboxes.forEach(cb => {
        if (cb.checked) selectedTabIds.push(cb.dataset.tabId);
      });

      if (selectedTabIds.length === 0) {
        alert('최소 1개 이상의 탭을 선택하셔야 합니다.');
        return;
      }

      siteTabTemplates[site] = selectedTabIds;
      saveTabTemplates();
      renderDynamicTabs();
      closeTplModal();
      alert(`[${site === 'ALL' ? '전체 사업장' : site}] 탭 템플릿 설정이 저장되었습니다.`);
    });
  }
}

function renderTemplateCheckboxList() {
  const container = document.getElementById('templateCheckboxList');
  const targetSiteSelect = document.getElementById('tplTargetSite');
  if (!container || !targetSiteSelect) return;

  const site = targetSiteSelect.value;
  const activeTabs = siteTabTemplates[site] || siteTabTemplates['ALL'] || ['attendance', 'schedule', 'material'];

  container.innerHTML = '';
  AVAILABLE_TAB_DEFINITIONS.forEach(def => {
    const isChecked = activeTabs.includes(def.id);
    const item = document.createElement('label');
    item.className = 'template-checkbox-item';
    item.innerHTML = `
      <input type="checkbox" class="tpl-checkbox" data-tab-id="${def.id}" ${isChecked ? 'checked' : ''}>
      <strong>[${def.name}]</strong> - 대시보드 탭으로 표시
    `;
    container.appendChild(item);
  });
}

function closeTplModal() {
  const modalOverlay = document.getElementById('templateSettingsModalOverlay');
  if (modalOverlay) modalOverlay.classList.remove('open');
}

// ==========================================================================
// 4. HIGH RESOLUTION LIGHTBOX IMAGE PREVIEW MODAL
// ==========================================================================
function initImagePreviewModalEvents() {
  const btnClose = document.getElementById('btnPreviewModalClose');
  const btnOk = document.getElementById('btnPreviewModalOk');
  const overlay = document.getElementById('imagePreviewModalOverlay');

  if (btnClose) btnClose.addEventListener('click', closeImagePreviewModal);
  if (btnOk) btnOk.addEventListener('click', closeImagePreviewModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay && overlay.classList.contains('open')) {
      closeImagePreviewModal();
    }
  });
}

function openImagePreviewModal(imageUrl, titleStr, captionHtml) {
  const overlay = document.getElementById('imagePreviewModalOverlay');
  const imgElem = document.getElementById('previewModalImg');
  const titleElem = document.getElementById('previewModalTitle');
  const captionElem = document.getElementById('previewModalCaption');

  if (!overlay || !imgElem) return;

  imgElem.src = imageUrl;
  if (titleElem) titleElem.textContent = `🔍 ${titleStr || '작업 현장 사진 미리보기'}`;
  if (captionElem) captionElem.innerHTML = captionHtml || '작업 현장 사진 상세 정보';

  overlay.classList.add('open');
}

function closeImagePreviewModal() {
  const overlay = document.getElementById('imagePreviewModalOverlay');
  if (overlay) overlay.classList.remove('open');
}

// ==========================================================================
// 4-1. IMPORT SCHEDULE ITEMS FROM SPECIFIC DATE CONTROLLER
// ==========================================================================
const HISTORICAL_DATE_SCHEDULE_MAP = {
  '2026-09-03': [
    { id: 'hist-1', site: '서울본사', fab: 'A동 지하2층', type: 'PM', subcat: '소방 점검', utIds: ['FAC-FIRE-002'], content: '소방 수신기 수압 센서 정기 계측 및 테스트', imageUrl: null },
    { id: 'hist-2', site: '판교센터', fab: '물류 2존', type: '자재입출고', subcat: '파렛트 출고', utIds: ['MAT-PAL-002'], content: '플라스틱 파렛트 50개 출고 검수 및 전달', imageUrl: null },
    { id: 'hist-3', site: '부산센터', fab: 'B동 2층', type: 'BM', subcat: '긴급 수리', utIds: ['EQ-PUMP-401'], content: '급수 부스터 펌프 압력 가스켓 정비 및 부품 교체', imageUrl: null }
  ],
  '2026-09-02': [
    { id: 'hist-4', site: '서울본사', fab: 'A동 옥상', type: 'PM', subcat: '실외기 점검', utIds: ['EQ-HVAC-101'], content: '냉각탑 팬 벨트 장력 조정 및 정기 윤활유 보충', imageUrl: './img_hvac.jpg' },
    { id: 'hist-5', site: '대구센터', fab: '물류 1존', type: '자재입출고', subcat: '자재 입고', utIds: ['MAT-TAP-005'], content: '포장용 박스 밴딩 끈 100롤 입고 검수 및 하역', imageUrl: './img_logistics.jpg' }
  ]
};

function getHistoricalTasksForDate(dateStr) {
  if (HISTORICAL_DATE_SCHEDULE_MAP[dateStr]) {
    return HISTORICAL_DATE_SCHEDULE_MAP[dateStr];
  }
  return [
    { id: `hist-${dateStr}-1`, site: '서울본사', fab: 'A동 1층', type: 'PM', subcat: '정기 점검', utIds: ['EQ-HVAC-101'], content: `[${dateStr}] 일자 공조/인프라 설비 정기 순회 점검`, imageUrl: null },
    { id: `hist-${dateStr}-2`, site: '판교센터', fab: '물류 센터', type: '자재입출고', subcat: '자재 검수', utIds: ['MAT-BOX-301'], content: `[${dateStr}] 일자 자재 입출고 수량 일치 검수`, imageUrl: null },
    { id: `hist-${dateStr}-3`, site: '부산센터', fab: '주차장', type: 'CM', subcat: '시설 개선', utIds: ['FAC-PARK-001'], content: `[${dateStr}] 일자 주차 정산기 센서 오차 교정`, imageUrl: null }
  ];
}

let fetchedImportTasks = [];

function initImportScheduleModalEvents() {
  const btnOpen = document.getElementById('btnImportFromDate');
  const modalOverlay = document.getElementById('importScheduleModalOverlay');
  const btnClose = document.getElementById('btnImportModalClose');
  const btnCancel = document.getElementById('btnImportModalCancel');
  const btnFetch = document.getElementById('btnFetchImportDate');
  const btnSubmit = document.getElementById('btnSubmitImportSchedule');
  const dateInput = document.getElementById('importSourceDate');
  const selectAll = document.getElementById('selectAllImportItems');

  if (btnOpen) {
    btnOpen.addEventListener('click', () => {
      if (!dateInput.value) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        dateInput.value = yesterday.toISOString().slice(0, 10);
      }
      fetchAndRenderImportTasks();
      if (modalOverlay) modalOverlay.classList.add('open');
    });
  }

  if (btnClose) btnClose.addEventListener('click', closeImportModal);
  if (btnCancel) btnCancel.addEventListener('click', closeImportModal);
  if (btnFetch) btnFetch.addEventListener('click', fetchAndRenderImportTasks);

  if (selectAll) {
    selectAll.addEventListener('change', (e) => {
      const checked = e.target.checked;
      document.querySelectorAll('.import-row-checkbox').forEach(cb => cb.checked = checked);
    });
  }

  if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      const selectedCbs = document.querySelectorAll('.import-row-checkbox:checked');
      if (selectedCbs.length === 0) {
        alert('추가할 과거 작업 항목을 1개 이상 선택해 주세요.');
        return;
      }

      let count = 0;
      selectedCbs.forEach(cb => {
        const item = fetchedImportTasks.find(t => t.id === cb.dataset.id);
        if (item) {
          schedules.unshift({
            id: 'row-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
            site: item.site,
            fab: item.fab,
            type: item.type,
            subcat: item.subcat,
            utIds: [...(item.utIds || [])],
            content: item.content,
            imageUrl: item.imageUrl || null
          });
          count++;
        }
      });

      saveScheduleData();
      renderScheduleTable();
      closeImportModal();
      alert(`[${dateInput.value}] 일자의 작업 ${count}건이 현재 작업 일정에 성공적으로 불러와 추가되었습니다!`);
    });
  }
}

function fetchAndRenderImportTasks() {
  const dateInput = document.getElementById('importSourceDate');
  const tbody = document.getElementById('importItemsTableBody');
  if (!dateInput || !tbody) return;

  const dateStr = dateInput.value || '2026-09-03';
  fetchedImportTasks = getHistoricalTasksForDate(dateStr);

  tbody.innerHTML = '';
  fetchedImportTasks.forEach(task => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="center"><input type="checkbox" class="import-row-checkbox" data-id="${task.id}" checked></td>
      <td><strong>${escapeHtml(task.site)}</strong></td>
      <td>${escapeHtml(task.fab)}</td>
      <td><span class="badge badge-pm">${escapeHtml(task.type)}</span></td>
      <td>${escapeHtml(task.subcat)}</td>
      <td>${escapeHtml(task.content)}</td>
    `;
    tbody.appendChild(tr);
  });
}

function closeImportModal() {
  const modalOverlay = document.getElementById('importScheduleModalOverlay');
  if (modalOverlay) modalOverlay.classList.remove('open');
}

// ==========================================================================
// 5. INTEGRATED EXCEL & PDF EXPORT CONTROLLER (1개 시트 / 단일 보고서)
// ==========================================================================
function initIntegratedExportEvents() {
  const btnExportExcel = document.getElementById('btnExportIntegratedExcel');
  const btnExportPdf = document.getElementById('btnExportIntegratedPdf');

  if (btnExportExcel) btnExportExcel.addEventListener('click', exportIntegratedExcel);
  if (btnExportPdf) btnExportPdf.addEventListener('click', exportIntegratedPdf);
}

function exportIntegratedExcel() {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

  const noticeText = globalNotice && globalNotice.text ? globalNotice.text : '등록된 전달사항 없음';
  const noticeAuthor = globalNotice && globalNotice.author ? globalNotice.author : '-';
  const noticeTime = globalNotice && globalNotice.timestamp ? globalNotice.timestamp : '-';

  let htmlExcel = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>통합운영관제보고서</x:Name>
              <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        table { border-collapse: collapse; font-family: "맑은 고딕", Arial, sans-serif; font-size: 11pt; }
        th { background-color: #1e293b; color: #ffffff; font-weight: bold; border: 1px solid #94a3b8; padding: 6px 10px; text-align: center; }
        td { border: 1px solid #cbd5e1; padding: 6px 10px; vertical-align: middle; }
        .title-row { font-size: 16pt; font-weight: bold; color: #0f172a; height: 35px; }
        .subtitle-row { font-size: 10pt; color: #64748b; }
        .section-header { font-size: 13pt; font-weight: bold; color: #1e293b; background-color: #e2e8f0; height: 28px; border: 1px solid #cbd5e1; }
        .notice-box { background-color: #fffbeb; border: 1px solid #fde68a; color: #92400e; font-weight: bold; }
        .badge-cell { text-align: center; font-weight: bold; }
      </style>
    </head>
    <body>
      <table>
        <!-- TITLE SECTION -->
        <tr class="title-row"><td colspan="8" align="center">시설·물류·근태 종합 운영 관제 보고서 (통합 1시트)</td></tr>
        <tr class="subtitle-row"><td colspan="8" align="center">발행 일시: ${dateStr} ${timeStr} | 시스템: 통합 센터 관제 시스템</td></tr>
        <tr><td colspan="8"></td></tr>

        <!-- GLOBAL NOTICE SECTION -->
        <tr class="section-header"><td colspan="8">📢 근무 전달사항 및 실시간 공지사항</td></tr>
        <tr>
          <td colspan="2" class="notice-box">작성자: ${escapeHtml(noticeAuthor)} (${noticeTime})</td>
          <td colspan="6" class="notice-box">전달사항: ${escapeHtml(noticeText)}</td>
        </tr>
        <tr><td colspan="8"></td></tr>

        <!-- SECTION 1: 근태현황 -->
        <tr class="section-header"><td colspan="8">👥 1. 근태현황 (Attendance Management Status)</td></tr>
        <tr>
          <th>사원번호</th>
          <th>성명</th>
          <th>부서</th>
          <th>직급 / 사업장</th>
          <th>출근시간</th>
          <th>퇴근시간</th>
          <th>근태상태</th>
          <th>비고 및 특이사항</th>
        </tr>
  `;

  // Append Attendance Data
  attendances.forEach(a => {
    htmlExcel += `
      <tr>
        <td align="center">${escapeHtml(a.empId)}</td>
        <td align="center">${escapeHtml(a.name)}</td>
        <td align="center">${escapeHtml(a.dept)}</td>
        <td>${escapeHtml(a.position)}</td>
        <td align="center">${escapeHtml(a.clockIn)}</td>
        <td align="center">${escapeHtml(a.clockOut)}</td>
        <td class="badge-cell">${escapeHtml(a.status)}</td>
        <td>${escapeHtml(a.remarks)}</td>
      </tr>
    `;
  });

  htmlExcel += `
        <tr><td colspan="8"></td></tr>

        <!-- SECTION 2: 작업일정관리 (Includes Image Status Column) -->
        <tr class="section-header"><td colspan="8">📋 2. 작업일정관리 (Work Schedule Management)</td></tr>
        <tr>
          <th>Site</th>
          <th>구역/Zone</th>
          <th>작업유형</th>
          <th>작업구분</th>
          <th>작업대상</th>
          <th>작업 상세 내용</th>
          <th colspan="2">작업 현장 이미지</th>
        </tr>
  `;

  // Append Schedule Data (Includes Embedded Image)
  schedules.forEach(s => {
    const targets = (s.utIds || []).join(', ');
    const imgCellHtml = s.imageUrl 
      ? `<img src="${s.imageUrl}" width="60" height="60" style="vertical-align:middle; border-radius:4px;"><br><small style="font-size:8pt; color:#15803d; font-weight:bold;">[📷 현장사진 첨부]</small>` 
      : '<span style="color:#94a3b8;">[미첨부]</span>';
    htmlExcel += `
      <tr>
        <td align="center">${escapeHtml(s.site)}</td>
        <td align="center">${escapeHtml(s.fab)}</td>
        <td class="badge-cell">${escapeHtml(s.type)}</td>
        <td align="center">${escapeHtml(s.subcat)}</td>
        <td>${escapeHtml(targets)}</td>
        <td>${escapeHtml(s.content)}</td>
        <td colspan="2" align="center" style="height:70px;">${imgCellHtml}</td>
      </tr>
    `;
  });

  htmlExcel += `
        <tr><td colspan="8"></td></tr>

        <!-- SECTION 3: 자재관리 -->
        <tr class="section-header"><td colspan="8">📦 3. 자재관리 (Material Inventory Management)</td></tr>
        <tr>
          <th>자재코드</th>
          <th>자재명</th>
          <th>카테고리</th>
          <th>보관장소/창고</th>
          <th>현재재고</th>
          <th>적정재고</th>
          <th>재고상태</th>
          <th>최종입출고일</th>
        </tr>
  `;

  // Append Material Data
  materials.forEach(m => {
    htmlExcel += `
      <tr>
        <td align="center">${escapeHtml(m.code)}</td>
        <td>${escapeHtml(m.name)}</td>
        <td align="center">${escapeHtml(m.category)}</td>
        <td>${escapeHtml(m.location)}</td>
        <td align="right">${m.stock} 개</td>
        <td align="right">${m.minStock} 개</td>
        <td class="badge-cell">${escapeHtml(m.status)}</td>
        <td align="center">${escapeHtml(m.lastTxDate)}</td>
      </tr>
    `;
  });

  htmlExcel += `
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\uFEFF' + htmlExcel], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `통합운영관제보고서_${dateStr}.xls`;
  link.click();
}

function exportIntegratedPdf() {
  const container = document.getElementById('pdfReportPrintContainer');
  if (!container) return;

  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;

  const noticeText = globalNotice && globalNotice.text ? globalNotice.text : '등록된 전달사항 없음';
  const noticeAuthor = globalNotice && globalNotice.author ? globalNotice.author : '-';
  const noticeTime = globalNotice && globalNotice.timestamp ? globalNotice.timestamp : '-';

  container.innerHTML = `
    <div class="pdf-report-title-box">
      <h1>시설·물류·근태 종합 관제 보고서</h1>
      <p style="font-size: 12px; color: #475569; margin-top: 4px;">
        발행일시: ${dateStr} ${timeStr} | 통합 센터 관제 시스템
      </p>
    </div>

    <!-- Notice Box -->
    <div class="pdf-report-notice-box">
      <strong>🔥 근무 전달사항 / 공지:</strong> ${escapeHtml(noticeText)}
      <span style="float: right; font-size: 11px; color: #64748b;">작성자: ${escapeHtml(noticeAuthor)} (${noticeTime})</span>
    </div>

    <!-- Section 1: Attendance -->
    <div class="pdf-section-header">👥 1. 근태 현황 (${attendances.length}명)</div>
    <table class="pdf-report-table">
      <thead>
        <tr>
          <th>사원번호</th>
          <th>성명</th>
          <th>부서</th>
          <th>직급 / 사업장</th>
          <th style="text-align:center;">출근시간</th>
          <th style="text-align:center;">퇴근시간</th>
          <th style="text-align:center;">근태상태</th>
          <th>비고</th>
        </tr>
      </thead>
      <tbody>
        ${attendances.map(a => `
          <tr>
            <td><strong>${escapeHtml(a.empId)}</strong></td>
            <td>${escapeHtml(a.name)}</td>
            <td>${escapeHtml(a.dept)}</td>
            <td>${escapeHtml(a.position)}</td>
            <td style="text-align:center;">${escapeHtml(a.clockIn)}</td>
            <td style="text-align:center;">${escapeHtml(a.clockOut)}</td>
            <td style="text-align:center;"><strong>${escapeHtml(a.status)}</strong></td>
            <td>${escapeHtml(a.remarks)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Section 2: Work Schedule (Includes Photo Thumbnails) -->
    <div class="pdf-section-header">📋 2. 작업 일정 관리 (${schedules.length}건)</div>
    <table class="pdf-report-table">
      <thead>
        <tr>
          <th>Site</th>
          <th>구역/Zone</th>
          <th>작업유형</th>
          <th>작업구분</th>
          <th>작업대상</th>
          <th>작업 내용</th>
          <th style="text-align:center;">현장 사진</th>
        </tr>
      </thead>
      <tbody>
        ${schedules.map(s => `
          <tr>
            <td>${escapeHtml(s.site)}</td>
            <td>${escapeHtml(s.fab)}</td>
            <td><strong>${escapeHtml(s.type)}</strong></td>
            <td>${escapeHtml(s.subcat)}</td>
            <td>${escapeHtml((s.utIds || []).join(', '))}</td>
            <td>${escapeHtml(s.content)}</td>
            <td style="text-align:center;">
              ${s.imageUrl ? `<img src="${s.imageUrl}" class="pdf-thumb-img" alt="사진">` : '<span style="color:#94a3b8;">-</span>'}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Section 3: Material Inventory -->
    <div class="pdf-section-header">📦 3. 자재 재고 현황 (${materials.length}종)</div>
    <table class="pdf-report-table">
      <thead>
        <tr>
          <th>자재코드</th>
          <th>자재명</th>
          <th>카테고리</th>
          <th>보관장소/창고</th>
          <th style="text-align:right;">현재재고</th>
          <th style="text-align:right;">적정재고</th>
          <th style="text-align:center;">재고상태</th>
          <th style="text-align:center;">최종입출고일</th>
        </tr>
      </thead>
      <tbody>
        ${materials.map(m => `
          <tr>
            <td><strong>${escapeHtml(m.code)}</strong></td>
            <td>${escapeHtml(m.name)}</td>
            <td>${escapeHtml(m.category)}</td>
            <td>${escapeHtml(m.location)}</td>
            <td style="text-align:right;">${m.stock}개</td>
            <td style="text-align:right;">${m.minStock}개</td>
            <td style="text-align:center;"><strong>${escapeHtml(m.status)}</strong></td>
            <td style="text-align:center;">${escapeHtml(m.lastTxDate)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  window.print();
}

// ==========================================================================
// 6. GLOBAL NOTICE & SEARCH CONTROLLER
// ==========================================================================
function initNoticeEvents() {
  const btnSaveNotice = document.getElementById('btnSaveNotice');
  const btnNoticeClear = document.getElementById('btnNoticeClear');

  if (btnSaveNotice) {
    btnSaveNotice.addEventListener('click', () => {
      const input = document.getElementById('globalNoticeInput');
      const authorInput = document.getElementById('globalNoticeAuthor');
      const text = input ? input.value.trim() : '';
      const author = authorInput ? authorInput.value.trim() : '관리자';

      if (!text) {
        alert('전달사항 또는 공지 내용을 입력해 주세요.');
        return;
      }

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      globalNotice = { text, author: author || '관리자', timestamp: timeStr };
      saveNoticeData();
      renderNoticeBanner();
      if (input) input.value = '';
    });
  }

  if (btnNoticeClear) {
    btnNoticeClear.addEventListener('click', () => {
      globalNotice = null;
      saveNoticeData();
      renderNoticeBanner();
    });
  }
}

function renderNoticeBanner() {
  const banner = document.getElementById('globalNoticeBanner');
  const textElem = document.getElementById('globalNoticeText');
  const metaElem = document.getElementById('globalNoticeMeta');

  if (!banner || !textElem || !metaElem) return;

  if (globalNotice && globalNotice.text) {
    textElem.textContent = globalNotice.text;
    metaElem.textContent = `작성자: ${globalNotice.author} | ${globalNotice.timestamp}`;
    banner.style.display = 'flex';
  } else {
    banner.style.display = 'none';
  }
}

function initGlobalSearchEvents() {
  const btnSearch = document.getElementById('btnGlobalSearch');
  const btnReset = document.getElementById('btnGlobalReset');
  const kwInput = document.getElementById('globalSearchKeyword');
  const siteSelect = document.getElementById('globalSearchSite');
  const deptSelect = document.getElementById('globalSearchDept');

  if (btnSearch) btnSearch.addEventListener('click', triggerGlobalFilter);
  if (kwInput) kwInput.addEventListener('input', triggerGlobalFilter);

  if (siteSelect) {
    siteSelect.addEventListener('change', () => {
      renderDynamicTabs();
      triggerGlobalFilter();
    });
  }

  if (deptSelect) deptSelect.addEventListener('change', triggerGlobalFilter);

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (kwInput) kwInput.value = '';
      if (siteSelect) siteSelect.value = '';
      if (deptSelect) deptSelect.value = '';

      renderDynamicTabs();
      triggerGlobalFilter();
    });
  }
}

function triggerGlobalFilter() {
  renderAttendanceTable();
  renderScheduleTable();
  renderMaterialTable();
}

function getGlobalSearchState() {
  const keyword = (document.getElementById('globalSearchKeyword')?.value || '').trim().toLowerCase();
  const site = document.getElementById('globalSearchSite')?.value || '';
  const deptOrType = document.getElementById('globalSearchDept')?.value || '';
  return { keyword, site, deptOrType };
}

// ==========================================================================
// 7. ATTENDANCE CONTROLLER
// ==========================================================================
function initAttendanceEvents() {
  const statusFilter = document.getElementById('attendanceStatusFilter');
  const deptFilter = document.getElementById('attendanceDeptFilter');
  const btnExport = document.getElementById('btnAttendanceExportCsv');
  const btnAdd = document.getElementById('btnAddAttendance');

  const modalOverlay = document.getElementById('attendanceModalOverlay');
  const btnClose = document.getElementById('btnAttModalClose');
  const btnCancel = document.getElementById('btnAttModalCancel');
  const form = document.getElementById('addAttendanceForm');
  const selectAll = document.getElementById('selectAllAttendance');

  if (statusFilter) statusFilter.addEventListener('change', renderAttendanceTable);
  if (deptFilter) deptFilter.addEventListener('change', renderAttendanceTable);
  if (btnExport) btnExport.addEventListener('click', exportAttendanceCsv);

  if (btnAdd) btnAdd.addEventListener('click', () => modalOverlay && modalOverlay.classList.add('open'));
  if (btnClose) btnClose.addEventListener('click', closeAttModal);
  if (btnCancel) btnCancel.addEventListener('click', closeAttModal);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const empId = document.getElementById('attEmpId').value.trim();
      const name = document.getElementById('attEmpName').value.trim();
      const dept = document.getElementById('attDept').value;
      const position = document.getElementById('attPosition').value.trim();
      const clockIn = document.getElementById('attClockIn').value || '-';
      const clockOut = document.getElementById('attClockOut').value || '-';
      const status = document.getElementById('attStatus').value;
      const remarks = document.getElementById('attRemarks').value.trim();

      attendances.unshift({ id: 'att-' + Date.now(), empId, name, dept, position, clockIn, clockOut, status, remarks });
      saveAttendanceData();
      renderAttendanceTable();
      closeAttModal();
      form.reset();
    });
  }

  if (selectAll) {
    selectAll.addEventListener('change', (e) => {
      const checked = e.target.checked;
      document.querySelectorAll('.att-row-checkbox').forEach(cb => {
        cb.checked = checked;
        if (checked) selectedAttendanceRowIds.add(cb.dataset.id);
        else selectedAttendanceRowIds.delete(cb.dataset.id);
      });
    });
  }

  const tbody = document.getElementById('attendanceTableBody');
  if (tbody) {
    tbody.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.btn-att-delete');
      if (deleteBtn) {
        if (confirm('해당 근태 기록을 삭제하시겠습니까?')) {
          attendances = attendances.filter(a => a.id !== deleteBtn.dataset.id);
          saveAttendanceData();
          renderAttendanceTable();
        }
        return;
      }
      const cellView = e.target.closest('.att-cell-view');
      if (cellView) {
        editingAttendanceCell = { rowId: cellView.dataset.id, field: cellView.dataset.field };
        renderAttendanceTable();
      }
    });

    tbody.addEventListener('change', (e) => {
      const editControl = e.target.closest('.att-edit-control');
      if (editControl) {
        const target = attendances.find(a => a.id === editControl.dataset.id);
        if (target) {
          target[editControl.dataset.field] = editControl.value;
          saveAttendanceData();
        }
        editingAttendanceCell = null;
        renderAttendanceTable();
      }
    });
  }
}

function closeAttModal() {
  const modalOverlay = document.getElementById('attendanceModalOverlay');
  if (modalOverlay) modalOverlay.classList.remove('open');
}

function getAttendanceStatusBadge(status) {
  switch (status) {
    case '정상출근': return '<span class="badge badge-present">정상출근</span>';
    case '지각': return '<span class="badge badge-late">지각</span>';
    case '연차': case '반차': return '<span class="badge badge-leave">연차/휴가</span>';
    case '출장': return '<span class="badge badge-trip">출장</span>';
    case '조퇴': return '<span class="badge badge-early">조퇴</span>';
    default: return `<span class="badge">${escapeHtml(status)}</span>`;
  }
}

function updateAttendanceKpis() {
  const total = attendances.length;
  const present = attendances.filter(a => a.status === '정상출근').length;
  const late = attendances.filter(a => a.status === '지각' || a.status === '조퇴').length;
  const leave = attendances.filter(a => a.status === '연차' || a.status === '반차').length;
  const trip = attendances.filter(a => a.status === '출장').length;

  document.getElementById('kpiTotalStaff') && (document.getElementById('kpiTotalStaff').textContent = `${total}명`);
  document.getElementById('kpiPresentCount') && (document.getElementById('kpiPresentCount').textContent = `${present}명`);
  document.getElementById('kpiLateCount') && (document.getElementById('kpiLateCount').textContent = `${late}명`);
  document.getElementById('kpiLeaveCount') && (document.getElementById('kpiLeaveCount').textContent = `${leave}명`);
  document.getElementById('kpiTripCount') && (document.getElementById('kpiTripCount').textContent = `${trip}명`);
  document.getElementById('badgeAttendanceCount') && (document.getElementById('badgeAttendanceCount').textContent = `${total}명`);
}

function renderAttendanceTable() {
  const tbody = document.getElementById('attendanceTableBody');
  if (!tbody) return;

  const global = getGlobalSearchState();
  const statusFilter = document.getElementById('attendanceStatusFilter')?.value || '';
  const deptFilter = document.getElementById('attendanceDeptFilter')?.value || '';

  const filtered = attendances.filter(item => {
    if (statusFilter && item.status !== statusFilter) return false;
    if (deptFilter && item.dept !== deptFilter) return false;

    if (global.site && !item.position.includes(global.site)) return false;
    if (global.deptOrType && item.dept !== global.deptOrType) return false;
    if (global.keyword) {
      const matchName = item.name.toLowerCase().includes(global.keyword);
      const matchEmp = item.empId.toLowerCase().includes(global.keyword);
      const matchDept = item.dept.toLowerCase().includes(global.keyword);
      const matchPos = item.position.toLowerCase().includes(global.keyword);
      const matchRemarks = item.remarks.toLowerCase().includes(global.keyword);
      if (!matchName && !matchEmp && !matchDept && !matchPos && !matchRemarks) return false;
    }
    return true;
  });

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:30px; color:var(--text-muted);">조회된 근태 기록이 없습니다.</td></tr>`;
    updateAttendanceKpis();
    return;
  }

  filtered.forEach(item => {
    const tr = document.createElement('tr');
    const isChecked = selectedAttendanceRowIds.has(item.id);
    const isEditingStatus = editingAttendanceCell && editingAttendanceCell.rowId === item.id && editingAttendanceCell.field === 'status';
    const isEditingIn = editingAttendanceCell && editingAttendanceCell.rowId === item.id && editingAttendanceCell.field === 'clockIn';
    const isEditingOut = editingAttendanceCell && editingAttendanceCell.rowId === item.id && editingAttendanceCell.field === 'clockOut';
    const isEditingRemarks = editingAttendanceCell && editingAttendanceCell.rowId === item.id && editingAttendanceCell.field === 'remarks';

    tr.innerHTML = `
      <td class="col-select center"><input type="checkbox" class="att-row-checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''}></td>
      <td><strong>${escapeHtml(item.empId)}</strong></td>
      <td>${escapeHtml(item.name)}</td>
      <td>${escapeHtml(item.dept)}</td>
      <td>${escapeHtml(item.position)}</td>
      <td class="center">
        ${isEditingIn ? `<input type="time" class="table-input att-edit-control" data-id="${item.id}" data-field="clockIn" value="${item.clockIn !== '-' ? item.clockIn : ''}">` : `<div class="att-cell-view" data-id="${item.id}" data-field="clockIn">${escapeHtml(item.clockIn)}</div>`}
      </td>
      <td class="center">
        ${isEditingOut ? `<input type="time" class="table-input att-edit-control" data-id="${item.id}" data-field="clockOut" value="${item.clockOut !== '-' ? item.clockOut : ''}">` : `<div class="att-cell-view" data-id="${item.id}" data-field="clockOut">${escapeHtml(item.clockOut)}</div>`}
      </td>
      <td class="center">
        ${isEditingStatus ? `
          <select class="table-select att-edit-control" data-id="${item.id}" data-field="status">
            <option value="정상출근" ${item.status === '정상출근' ? 'selected' : ''}>정상출근</option>
            <option value="지각" ${item.status === '지각' ? 'selected' : ''}>지각</option>
            <option value="연차" ${item.status === '연차' ? 'selected' : ''}>연차</option>
            <option value="반차" ${item.status === '반차' ? 'selected' : ''}>반차</option>
            <option value="출장" ${item.status === '출장' ? 'selected' : ''}>출장</option>
            <option value="조퇴" ${item.status === '조퇴' ? 'selected' : ''}>조퇴</option>
          </select>
        ` : `<div class="att-cell-view" data-id="${item.id}" data-field="status">${getAttendanceStatusBadge(item.status)}</div>`}
      </td>
      <td>
        ${isEditingRemarks ? `<input type="text" class="table-input att-edit-control" data-id="${item.id}" data-field="remarks" value="${escapeHtml(item.remarks)}">` : `<div class="att-cell-view" data-id="${item.id}" data-field="remarks">${escapeHtml(item.remarks) || '<span class="text-placeholder">입력</span>'}</div>`}
      </td>
      <td class="center"><button type="button" class="btn btn-sm btn-danger-outline btn-att-delete" data-id="${item.id}">삭제</button></td>
    `;
    tbody.appendChild(tr);
  });

  updateAttendanceKpis();
  document.getElementById('attendanceFilteredCount') && (document.getElementById('attendanceFilteredCount').textContent = String(filtered.length));
}

function exportAttendanceCsv() {
  let csv = '\uFEFF사원번호,성명,부서,직급,출근시간,퇴근시간,근태상태,비고\n';
  attendances.forEach(a => { csv += `"${a.empId}","${a.name}","${a.dept}","${a.position}","${a.clockIn}","${a.clockOut}","${a.status}","${a.remarks}"\n`; });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `근태현황_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
}

// ==========================================================================
// 8. MATERIAL MANAGEMENT CONTROLLER
// ==========================================================================
function initMaterialEvents() {
  const catFilter = document.getElementById('materialCategoryFilter');
  const stockFilter = document.getElementById('materialStockFilter');
  const btnExport = document.getElementById('btnMaterialExportCsv');
  const btnAdd = document.getElementById('btnAddMaterial');

  const modalOverlay = document.getElementById('materialModalOverlay');
  const btnClose = document.getElementById('btnMatModalClose');
  const btnCancel = document.getElementById('btnMatModalCancel');
  const form = document.getElementById('addMaterialForm');
  const selectAll = document.getElementById('selectAllMaterial');

  if (catFilter) catFilter.addEventListener('change', renderMaterialTable);
  if (stockFilter) stockFilter.addEventListener('change', renderMaterialTable);
  if (btnExport) btnExport.addEventListener('click', exportMaterialCsv);

  if (btnAdd) btnAdd.addEventListener('click', () => modalOverlay && modalOverlay.classList.add('open'));
  if (btnClose) btnClose.addEventListener('click', closeMatModal);
  if (btnCancel) btnCancel.addEventListener('click', closeMatModal);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('matCode').value.trim();
      const name = document.getElementById('matName').value.trim();
      const category = document.getElementById('matCategory').value;
      const location = document.getElementById('matLocation').value.trim();
      const stock = parseInt(document.getElementById('matStock').value, 10) || 0;
      const minStock = parseInt(document.getElementById('matMinStock').value, 10) || 0;

      let status = '정상재고';
      if (stock === 0) status = '입고대기';
      else if (stock < minStock) status = '재고부족';

      const nowStr = new Date().toISOString().slice(0, 10);
      materials.unshift({ id: 'mat-' + Date.now(), code, name, category, location, stock, minStock, status, lastTxDate: nowStr });

      saveMaterialData();
      renderMaterialTable();
      closeMatModal();
      form.reset();
    });
  }

  if (selectAll) {
    selectAll.addEventListener('change', (e) => {
      const checked = e.target.checked;
      document.querySelectorAll('.mat-row-checkbox').forEach(cb => {
        cb.checked = checked;
        if (checked) selectedMaterialRowIds.add(cb.dataset.id);
        else selectedMaterialRowIds.delete(cb.dataset.id);
      });
    });
  }

  const tbody = document.getElementById('materialTableBody');
  if (tbody) {
    tbody.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.btn-mat-delete');
      if (deleteBtn) {
        if (confirm('해당 자재 항목을 삭제하시겠습니까?')) {
          materials = materials.filter(m => m.id !== deleteBtn.dataset.id);
          saveMaterialData();
          renderMaterialTable();
        }
        return;
      }
      const cellView = e.target.closest('.mat-cell-view');
      if (cellView) {
        editingMaterialCell = { rowId: cellView.dataset.id, field: cellView.dataset.field };
        renderMaterialTable();
      }
    });

    tbody.addEventListener('change', (e) => {
      const editControl = e.target.closest('.mat-edit-control');
      if (editControl) {
        const target = materials.find(m => m.id === editControl.dataset.id);
        if (target) {
          const field = editControl.dataset.field;
          let val = editControl.value;
          if (field === 'stock' || field === 'minStock') {
            val = parseInt(val, 10) || 0;
          }
          target[field] = val;

          if (target.stock === 0) target.status = '입고대기';
          else if (target.stock < target.minStock) target.status = '재고부족';
          else target.status = '정상재고';

          target.lastTxDate = new Date().toISOString().slice(0, 10);
          saveMaterialData();
        }
        editingMaterialCell = null;
        renderMaterialTable();
      }
    });
  }
}

function closeMatModal() {
  const modalOverlay = document.getElementById('materialModalOverlay');
  if (modalOverlay) modalOverlay.classList.remove('open');
}

function getMaterialStatusBadge(status) {
  switch (status) {
    case '정상재고': return '<span class="badge badge-stock-ok">정상재고</span>';
    case '재고부족': return '<span class="badge badge-stock-low">🚨 재고부족</span>';
    case '입고대기': return '<span class="badge badge-stock-pending">입고대기</span>';
    default: return `<span class="badge">${escapeHtml(status)}</span>`;
  }
}

function updateMaterialKpis() {
  const total = materials.length;
  const stockOk = materials.filter(m => m.status === '정상재고').length;
  const stockLow = materials.filter(m => m.status === '재고부족' || m.status === '입고대기').length;
  const todayTx = materials.filter(m => m.lastTxDate === new Date().toISOString().slice(0, 10)).length;

  document.getElementById('kpiTotalMaterial') && (document.getElementById('kpiTotalMaterial').textContent = `${total}종`);
  document.getElementById('kpiStockOk') && (document.getElementById('kpiStockOk').textContent = `${stockOk}종`);
  document.getElementById('kpiStockLow') && (document.getElementById('kpiStockLow').textContent = `${stockLow}종`);
  document.getElementById('kpiTodayTx') && (document.getElementById('kpiTodayTx').textContent = `${todayTx}건`);
  document.getElementById('badgeMaterialCount') && (document.getElementById('badgeMaterialCount').textContent = `${total}종`);
}

function renderMaterialTable() {
  const tbody = document.getElementById('materialTableBody');
  if (!tbody) return;

  const global = getGlobalSearchState();
  const catFilter = document.getElementById('materialCategoryFilter')?.value || '';
  const stockFilter = document.getElementById('materialStockFilter')?.value || '';

  const filtered = materials.filter(item => {
    if (catFilter && item.category !== catFilter) return false;
    if (stockFilter && item.status !== stockFilter) return false;

    if (global.site && !item.location.includes(global.site)) return false;
    if (global.deptOrType && item.category !== global.deptOrType) return false;
    if (global.keyword) {
      const matchCode = item.code.toLowerCase().includes(global.keyword);
      const matchName = item.name.toLowerCase().includes(global.keyword);
      const matchCat = item.category.toLowerCase().includes(global.keyword);
      const matchLoc = item.location.toLowerCase().includes(global.keyword);
      if (!matchCode && !matchName && !matchCat && !matchLoc) return false;
    }
    return true;
  });

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" style="text-align:center; padding:30px; color:var(--text-muted);">조회된 자재 항목이 없습니다.</td></tr>`;
    updateMaterialKpis();
    return;
  }

  filtered.forEach(item => {
    const tr = document.createElement('tr');
    const isChecked = selectedMaterialRowIds.has(item.id);
    const isEditingName = editingMaterialCell && editingMaterialCell.rowId === item.id && editingMaterialCell.field === 'name';
    const isEditingLoc = editingMaterialCell && editingMaterialCell.rowId === item.id && editingMaterialCell.field === 'location';
    const isEditingStock = editingMaterialCell && editingMaterialCell.rowId === item.id && editingMaterialCell.field === 'stock';

    tr.innerHTML = `
      <td class="col-select center"><input type="checkbox" class="mat-row-checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''}></td>
      <td><strong>${escapeHtml(item.code)}</strong></td>
      <td>
        ${isEditingName ? `<input type="text" class="table-input mat-edit-control" data-id="${item.id}" data-field="name" value="${escapeHtml(item.name)}">` : `<div class="mat-cell-view" data-id="${item.id}" data-field="name">${escapeHtml(item.name)}</div>`}
      </td>
      <td><span class="badge" style="background:#f1f5f9; color:#475569;">${escapeHtml(item.category)}</span></td>
      <td>
        ${isEditingLoc ? `<input type="text" class="table-input mat-edit-control" data-id="${item.id}" data-field="location" value="${escapeHtml(item.location)}">` : `<div class="mat-cell-view" data-id="${item.id}" data-field="location">${escapeHtml(item.location)}</div>`}
      </td>
      <td class="center">
        ${isEditingStock ? `<input type="number" class="table-input mat-edit-control" data-id="${item.id}" data-field="stock" value="${item.stock}">` : `<div class="mat-cell-view" data-id="${item.id}" data-field="stock"><strong>${item.stock}</strong>개</div>`}
      </td>
      <td class="center">${item.minStock}개</td>
      <td class="center">${getMaterialStatusBadge(item.status)}</td>
      <td class="center">${item.lastTxDate}</td>
      <td class="center"><button type="button" class="btn btn-sm btn-danger-outline btn-mat-delete" data-id="${item.id}">삭제</button></td>
    `;
    tbody.appendChild(tr);
  });

  updateMaterialKpis();
  document.getElementById('materialFilteredCount') && (document.getElementById('materialFilteredCount').textContent = String(filtered.length));
}

function exportMaterialCsv() {
  let csv = '\uFEFF자재코드,자재명,카테고리,보관장소,현재재고,적정재고,재고상태,최종입출고일\n';
  materials.forEach(m => { csv += `"${m.code}","${m.name}","${m.category}","${m.location}","${m.stock}","${m.minStock}","${m.status}","${m.lastTxDate}"\n`; });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `자재재고현황_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
}

// ==========================================================================
// 9. WORK SCHEDULE CONTROLLER (이미지 첨부 및 미리보기 포함)
// ==========================================================================
function getWorkTypeBadge(type) {
  if (!type) return '<span class="badge">선택</span>';
  switch (type) {
    case 'PM': return '<span class="badge badge-pm">PM (예방보전)</span>';
    case 'BM': return '<span class="badge badge-bm">BM (고장수리)</span>';
    case 'CM': return '<span class="badge badge-cm">CM (시설개선)</span>';
    case '자재입출고': return '<span class="badge badge-purple" style="background:#f3e8ff; color:#6b21a8;">자재입출고</span>';
    default: return `<span class="badge badge-inspection">${escapeHtml(type)}</span>`;
  }
}

function renderUtBadges(selectedIds = []) {
  if (!selectedIds || selectedIds.length === 0) return '<span class="text-placeholder">선택</span>';
  return selectedIds.map(id => {
    const item = ALL_TARGET_ITEMS.find(e => e.id === id);
    const name = item ? item.name.split(' (')[0] : id;
    const isMaterial = item && item.category === '자재입출고';
    return `
      <span class="ut-chip" style="${isMaterial ? 'background:#faf5ff; border-color:#e9d5ff;' : ''}">
        <span class="ut-chip-id" style="${isMaterial ? 'background:#f3e8ff; color:#7e22ce;' : ''}">${id}</span>
        <span>${escapeHtml(name)}</span>
      </span>
    `;
  }).join('');
}

function getSortedUtOptions(selectedIds = [], keyword = '') {
  let list = [...ALL_TARGET_ITEMS];
  if (keyword) {
    const kw = keyword.toLowerCase();
    list = list.filter(e => e.name.toLowerCase().includes(kw) || e.id.toLowerCase().includes(kw));
  }
  return list.sort((a, b) => {
    const aChecked = selectedIds.includes(a.id);
    const bChecked = selectedIds.includes(b.id);
    if (aChecked && !bChecked) return -1;
    if (!aChecked && bChecked) return 1;
    return a.id.localeCompare(b.id);
  });
}

function getUtTriggerText(selectedIds = []) {
  if (!selectedIds || selectedIds.length === 0) {
    return '<span style="color: var(--text-muted);">-- 작업대상 선택 --</span>';
  }
  const firstId = selectedIds[0];
  const item = ALL_TARGET_ITEMS.find(e => e.id === firstId);
  const firstName = item ? item.name.split(' (')[0] : firstId;

  if (selectedIds.length === 1) {
    return `[${firstId}] ${firstName}`;
  }
  return `[${firstId}] ${firstName} 외 ${selectedIds.length - 1}건`;
}

function createUtDropdownHtml(rowId, selectedIds = []) {
  const triggerText = getUtTriggerText(selectedIds);
  const sortedOptions = getSortedUtOptions(selectedIds);

  const optionsHtml = sortedOptions.map(e => {
    const isChecked = selectedIds.includes(e.id);
    return `
      <div class="ut-option-item ${isChecked ? 'checked' : ''}" data-row-id="${rowId}" data-ut-id="${e.id}">
        <input type="checkbox" class="ut-option-checkbox" ${isChecked ? 'checked' : ''} tabindex="-1">
        <span class="ut-option-label" title="${escapeHtml(e.name)}">[${e.id}] ${escapeHtml(e.name)}</span>
        ${isChecked ? '<span class="ut-checked-tag">선택됨</span>' : ''}
      </div>
    `;
  }).join('');

  return `
    <div class="custom-ut-dropdown" data-id="${rowId}">
      <button type="button" class="ut-dropdown-trigger open" data-id="${rowId}">
        <span class="ut-trigger-text">${triggerText}</span>
        <svg class="ut-trigger-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div class="ut-dropdown-menu" id="utMenu-${rowId}">
        <div class="ut-search-wrapper">
          <input type="text" class="ut-search-input" data-id="${rowId}" placeholder="설비/자재명 검색..." autocomplete="off">
        </div>
        <div class="ut-options-list" id="utList-${rowId}">
          ${optionsHtml}
        </div>
        <div class="ut-dropdown-footer">
          <button type="button" class="btn-text btn-ut-all" data-id="${rowId}">전체선택</button>
          <button type="button" class="btn-text btn-clear btn-ut-clear" data-id="${rowId}">선택해제</button>
        </div>
      </div>
    </div>
  `;
}

function updateUtOptionsList(rowId, keyword = '') {
  const row = schedules.find(r => r.id === rowId);
  if (!row) return;

  const listContainer = document.getElementById(`utList-${rowId}`);
  if (!listContainer) return;

  const selectedIds = row.utIds || [];
  const sortedOptions = getSortedUtOptions(selectedIds, keyword);

  listContainer.innerHTML = sortedOptions.map(e => {
    const isChecked = selectedIds.includes(e.id);
    return `
      <div class="ut-option-item ${isChecked ? 'checked' : ''}" data-row-id="${rowId}" data-ut-id="${e.id}">
        <input type="checkbox" class="ut-option-checkbox" ${isChecked ? 'checked' : ''} tabindex="-1">
        <span class="ut-option-label" title="${escapeHtml(e.name)}">[${e.id}] ${escapeHtml(e.name)}</span>
        ${isChecked ? '<span class="ut-checked-tag">선택됨</span>' : ''}
      </div>
    `;
  }).join('');
}

function toggleUtItemSelection(rowId, utId) {
  const row = schedules.find(r => r.id === rowId);
  if (!row) return;

  if (!row.utIds) row.utIds = [];

  const idx = row.utIds.indexOf(utId);
  if (idx > -1) {
    row.utIds.splice(idx, 1);
  } else {
    row.utIds.push(utId);
  }

  saveScheduleData();

  const triggerTextEl = document.querySelector(`.custom-ut-dropdown[data-id="${rowId}"] .ut-trigger-text`);
  if (triggerTextEl) {
    triggerTextEl.innerHTML = getUtTriggerText(row.utIds);
  }

  const searchInput = document.querySelector(`#utMenu-${rowId} .ut-search-input`);
  updateUtOptionsList(rowId, searchInput ? searchInput.value : '');
}

function renderScheduleTable() {
  const tbody = document.getElementById('scheduleTableBody');
  if (!tbody) return;

  const searchKeyword = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
  const filterSite = document.getElementById('filterSite')?.value || '';
  const filterType = document.getElementById('filterType')?.value || '';
  const filterSubcatVal = document.getElementById('filterSubcat')?.value || '';
  const filterUtIdVal = document.getElementById('filterUtId')?.value || '';
  const global = getGlobalSearchState();

  const filtered = schedules.filter(item => {
    if (filterSite && item.site !== filterSite) return false;
    if (filterType && item.type !== filterType) return false;
    if (filterSubcatVal && item.subcat !== filterSubcatVal) return false;
    if (filterUtIdVal && !(item.utIds || []).includes(filterUtIdVal)) return false;

    if (global.site && item.site !== global.site) return false;
    if (global.deptOrType && ['PM','BM','CM','자재입출고'].includes(global.deptOrType) && item.type !== global.deptOrType) return false;

    const kw = global.keyword || searchKeyword;
    if (kw) {
      const matchSite = item.site.toLowerCase().includes(kw);
      const matchFab = item.fab.toLowerCase().includes(kw);
      const matchType = item.type.toLowerCase().includes(kw);
      const matchSubcat = item.subcat.toLowerCase().includes(kw);
      const matchContent = item.content.toLowerCase().includes(kw);
      const matchTarget = (item.utIds || []).some(utId => {
        const targetItem = ALL_TARGET_ITEMS.find(e => e.id === utId);
        return targetItem ? targetItem.name.toLowerCase().includes(kw) || targetItem.id.toLowerCase().includes(kw) : false;
      });
      if (!matchSite && !matchFab && !matchType && !matchSubcat && !matchContent && !matchTarget) return false;
    }
    return true;
  });

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:30px; color:var(--text-muted);">조회된 작업 일정이 없습니다.</td></tr>`;
    updateScheduleStats(0);
    return;
  }

  filtered.forEach((item) => {
    const tr = document.createElement('tr');
    tr.dataset.id = item.id;
    const isChecked = selectedScheduleRowIds.has(item.id);

    const isEditingSite = editingCell && editingCell.rowId === item.id && editingCell.field === 'site';
    const isEditingFab = editingCell && editingCell.rowId === item.id && editingCell.field === 'fab';
    const isEditingType = editingCell && editingCell.rowId === item.id && editingCell.field === 'type';
    const isEditingSubcat = editingCell && editingCell.rowId === item.id && editingCell.field === 'subcat';
    const isEditingUtIds = editingCell && editingCell.rowId === item.id && editingCell.field === 'utIds';
    const isEditingContent = editingCell && editingCell.rowId === item.id && editingCell.field === 'content';

    let imageCellHtml = '';
    if (item.imageUrl) {
      imageCellHtml = `
        <div class="schedule-img-cell">
          <img src="${item.imageUrl}" class="schedule-img-thumb btn-trigger-preview" data-id="${item.id}" alt="작업 현장 사진" title="클릭 시 확대 미리보기">
          <button type="button" class="btn-img-preview btn-trigger-preview" data-id="${item.id}">🔍 미리보기</button>
          <button type="button" class="btn-img-delete btn-delete-image" data-id="${item.id}" title="이미지 삭제">✕</button>
        </div>
      `;
    } else {
      imageCellHtml = `
        <div class="schedule-img-cell">
          <label class="btn-img-upload">
            📷 등록
            <input type="file" class="schedule-file-input" data-id="${item.id}" accept="image/*" style="display:none;">
          </label>
        </div>
      `;
    }

    const subcatOptions = ['정기 점검', '실외기 점검', '자재 입고', '원자재 입고', '파렛트 출고', '부품 출하', '긴급 수리', '소방 점검', '개선 개조', '시설 개선'];

    tr.innerHTML = `
      <td class="col-select center"><input type="checkbox" class="row-checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''}></td>
      <td class="col-site">
        ${isEditingSite ? `
          <select class="table-select edit-control" data-id="${item.id}" data-field="site">
            <option value="서울본사" ${item.site === '서울본사' ? 'selected' : ''}>서울본사</option>
            <option value="판교센터" ${item.site === '판교센터' ? 'selected' : ''}>판교센터</option>
            <option value="부산센터" ${item.site === '부산센터' ? 'selected' : ''}>부산센터</option>
            <option value="대구센터" ${item.site === '대구센터' ? 'selected' : ''}>대구센터</option>
          </select>
        ` : `<div class="cell-text-view" data-id="${item.id}" data-field="site">${escapeHtml(item.site)}</div>`}
      </td>
      <td class="col-fab">
        ${isEditingFab ? `<input type="text" class="table-input edit-control" data-id="${item.id}" data-field="fab" value="${escapeHtml(item.fab)}">` : `<div class="cell-text-view" data-id="${item.id}" data-field="fab">${escapeHtml(item.fab)}</div>`}
      </td>
      <td class="col-type">
        ${isEditingType ? `
          <select class="table-select edit-control" data-id="${item.id}" data-field="type">
            <option value="PM" ${item.type === 'PM' ? 'selected' : ''}>PM (예방보전)</option>
            <option value="BM" ${item.type === 'BM' ? 'selected' : ''}>BM (고장수리)</option>
            <option value="CM" ${item.type === 'CM' ? 'selected' : ''}>CM (시설개선)</option>
            <option value="자재입출고" ${item.type === '자재입출고' ? 'selected' : ''}>자재입출고</option>
            <option value="점검" ${item.type === '점검' ? 'selected' : ''}>정기 점검</option>
          </select>
        ` : `<div class="cell-text-view" data-id="${item.id}" data-field="type">${getWorkTypeBadge(item.type)}</div>`}
      </td>
      <td class="col-subcat">
        ${isEditingSubcat ? `
          <select class="table-select edit-control" data-id="${item.id}" data-field="subcat">
            ${[...new Set([...subcatOptions, item.subcat])].filter(Boolean).map(opt => `
              <option value="${escapeHtml(opt)}" ${item.subcat === opt ? 'selected' : ''}>${escapeHtml(opt)}</option>
            `).join('')}
          </select>
        ` : `<div class="cell-text-view" data-id="${item.id}" data-field="subcat" title="클릭 시 드롭다운 선택">${escapeHtml(item.subcat)}</div>`}
      </td>
      <td class="col-utid">
        ${isEditingUtIds ? `
          ${createUtDropdownHtml(item.id, item.utIds)}
        ` : `<div class="cell-text-view ut-badge-container" data-id="${item.id}" data-field="utIds" title="클릭 시 드롭다운 선택">${renderUtBadges(item.utIds)}</div>`}
      </td>
      <td class="col-content">
        ${isEditingContent ? `<textarea class="table-input edit-control" data-id="${item.id}" data-field="content">${escapeHtml(item.content)}</textarea>` : `<div class="cell-text-view" data-id="${item.id}" data-field="content">${escapeHtml(item.content)}</div>`}
      </td>
      <td class="col-img center">${imageCellHtml}</td>
      <td class="col-action center"><button type="button" class="btn btn-sm btn-danger-outline btn-delete-row" data-id="${item.id}">삭제</button></td>
    `;
    tbody.appendChild(tr);
  });

  updateScheduleStats(filtered.length);
}

function updateScheduleStats(visibleCount = schedules.length) {
  document.getElementById('totalCount') && (document.getElementById('totalCount').textContent = String(schedules.length));
  document.getElementById('visibleCount') && (document.getElementById('visibleCount').textContent = String(visibleCount));
  document.getElementById('badgeScheduleCount') && (document.getElementById('badgeScheduleCount').textContent = `${schedules.length}건`);
  document.getElementById('selectedCount') && (document.getElementById('selectedCount').textContent = String(selectedScheduleRowIds.size));
}

function initScheduleEvents() {
  const searchInput = document.getElementById('searchInput');
  const filterSite = document.getElementById('filterSite');
  const filterType = document.getElementById('filterType');
  const filterSubcat = document.getElementById('filterSubcat');
  const filterUtId = document.getElementById('filterUtId');

  const btnImport = document.getElementById('btnImportFromDate');
  const btnExport = document.getElementById('btnExportCsv');
  const btnQuickAdd = document.getElementById('btnQuickAdd');
  const btnAddRow = document.getElementById('btnAddRow');
  const btnDeleteSel = document.getElementById('btnDeleteSelected');
  const btnReset = document.getElementById('btnResetData');

  const modalOverlay = document.getElementById('modalOverlay');
  const btnClose = document.getElementById('btnModalClose');
  const btnCancel = document.getElementById('btnModalCancel');
  const form = document.getElementById('addRowForm');
  const selectAll = document.getElementById('selectAll');

  if (searchInput) searchInput.oninput = renderScheduleTable;
  if (filterSite) filterSite.onchange = renderScheduleTable;
  if (filterType) filterType.onchange = renderScheduleTable;
  if (filterSubcat) filterSubcat.onchange = renderScheduleTable;
  if (filterUtId) filterUtId.onchange = renderScheduleTable;

  if (btnImport) {
    btnImport.onclick = () => {
      const dateInput = document.getElementById('importSourceDate');
      const importOverlay = document.getElementById('importScheduleModalOverlay');
      if (dateInput && !dateInput.value) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        dateInput.value = yesterday.toISOString().slice(0, 10);
      }
      fetchAndRenderImportTasks();
      if (importOverlay) importOverlay.classList.add('open');
    };
  }

  if (btnExport) btnExport.onclick = exportScheduleCsv;

  if (btnQuickAdd) {
    btnQuickAdd.onclick = () => {
      schedules.unshift({ id: 'row-' + Date.now(), site: '서울본사', fab: 'A동 1층', type: 'PM', subcat: '정기 점검', utIds: ['EQ-HVAC-101'], content: '신규 점검 작업', imageUrl: null });
      saveScheduleData();
      renderScheduleTable();
    };
  }

  if (btnAddRow) {
    btnAddRow.onclick = () => {
      populateModalTargetOptions();
      modalOverlay && modalOverlay.classList.add('open');
    };
  }

  if (btnClose) btnClose.onclick = closeScheduleModal;
  if (btnCancel) btnCancel.onclick = closeScheduleModal;

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const site = document.getElementById('modalSite').value;
      const fab = document.getElementById('modalFab').value.trim();
      const type = document.getElementById('modalType').value;
      const subcat = document.getElementById('modalSubcat').value.trim();
      const content = document.getElementById('modalContent').value.trim();
      const selectUt = document.getElementById('modalUtId');
      const utIds = Array.from(selectUt.selectedOptions).map(opt => opt.value);
      const imgInput = document.getElementById('modalImage');

      function saveNewRow(imgUrl = null) {
        schedules.unshift({ id: 'row-' + Date.now(), site, fab, type, subcat, utIds: utIds.length > 0 ? utIds : ['EQ-HVAC-101'], content, imageUrl: imgUrl });
        saveScheduleData();
        renderScheduleTable();
        closeScheduleModal();
        form.reset();
      }

      if (imgInput && imgInput.files && imgInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          saveNewRow(evt.target.result);
        };
        reader.readAsDataURL(imgInput.files[0]);
      } else {
        saveNewRow(null);
      }
    };
  }

  if (selectAll) {
    selectAll.onchange = (e) => {
      const checked = e.target.checked;
      document.querySelectorAll('.row-checkbox').forEach(cb => {
        cb.checked = checked;
        if (checked) selectedScheduleRowIds.add(cb.dataset.id);
        else selectedScheduleRowIds.delete(cb.dataset.id);
      });
      updateScheduleStats();
    };
  }

  if (btnDeleteSel) {
    btnDeleteSel.onclick = () => {
      if (selectedScheduleRowIds.size === 0) { alert('삭제할 행을 선택해 주세요.'); return; }
      if (confirm(`선택한 ${selectedScheduleRowIds.size}개 작업 항목을 삭제하시겠습니까?`)) {
        schedules = schedules.filter(s => !selectedScheduleRowIds.has(s.id));
        selectedScheduleRowIds.clear();
        saveScheduleData();
        renderScheduleTable();
      }
    };
  }

  if (btnReset) {
    btnReset.onclick = () => {
      if (confirm('작업 일정 데이터를 초기값으로 재설정하시겠습니까?')) {
        schedules = [...INITIAL_SCHEDULE_DATA];
        saveScheduleData();
        renderScheduleTable();
      }
    };
  }

  // Also bind import modal controls once
  initImportScheduleModalEvents();

  const tbody = document.getElementById('scheduleTableBody');
  if (tbody) {
    tbody.onclick = (e) => {
      // 1. UT ID Option Item Clicked inside dropdown
      const optionItem = e.target.closest('.ut-option-item');
      if (optionItem) {
        e.stopPropagation();
        const rowId = optionItem.dataset.rowId;
        const utId = optionItem.dataset.utId;
        toggleUtItemSelection(rowId, utId);
        return;
      }

      // 2. Select All Button in Dropdown Footer
      const btnAll = e.target.closest('.btn-ut-all');
      if (btnAll) {
        e.stopPropagation();
        const rowId = btnAll.dataset.id;
        const row = schedules.find(r => r.id === rowId);
        if (row) {
          row.utIds = ALL_TARGET_ITEMS.map(item => item.id);
          saveScheduleData();
          updateUtOptionsList(rowId);
          const triggerTextEl = document.querySelector(`.custom-ut-dropdown[data-id="${rowId}"] .ut-trigger-text`);
          if (triggerTextEl) triggerTextEl.innerHTML = getUtTriggerText(row.utIds);
        }
        return;
      }

      // 3. Clear Selection Button in Dropdown Footer
      const btnClear = e.target.closest('.btn-ut-clear');
      if (btnClear) {
        e.stopPropagation();
        const rowId = btnClear.dataset.id;
        const row = schedules.find(r => r.id === rowId);
        if (row) {
          row.utIds = [];
          saveScheduleData();
          updateUtOptionsList(rowId);
          const triggerTextEl = document.querySelector(`.custom-ut-dropdown[data-id="${rowId}"] .ut-trigger-text`);
          if (triggerTextEl) triggerTextEl.innerHTML = getUtTriggerText(row.utIds);
        }
        return;
      }

      // 4. Trigger Preview
      const previewBtn = e.target.closest('.btn-trigger-preview');
      if (previewBtn) {
        const item = schedules.find(s => s.id === previewBtn.dataset.id);
        if (item && item.imageUrl) {
          const captionHtml = `
            <strong>Site / 구역:</strong> ${escapeHtml(item.site)} (${escapeHtml(item.fab)})<br>
            <strong>작업유형 / 구분:</strong> [${escapeHtml(item.type)}] ${escapeHtml(item.subcat)}<br>
            <strong>작업 내용:</strong> ${escapeHtml(item.content)}
          `;
          openImagePreviewModal(item.imageUrl, `${item.site} ${item.fab} - 작업 현장 사진`, captionHtml);
        }
        return;
      }

      // 5. Delete Image
      const delImgBtn = e.target.closest('.btn-delete-image');
      if (delImgBtn) {
        if (confirm('등록된 현장 사진을 삭제하시겠습니까?')) {
          const item = schedules.find(s => s.id === delImgBtn.dataset.id);
          if (item) {
            item.imageUrl = null;
            saveScheduleData();
            renderScheduleTable();
          }
        }
        return;
      }

      // 6. Delete Row
      const deleteBtn = e.target.closest('.btn-delete-row');
      if (deleteBtn) {
        if (confirm('해당 작업 일정을 삭제하시겠습니까?')) {
          schedules = schedules.filter(s => s.id !== deleteBtn.dataset.id);
          saveScheduleData();
          renderScheduleTable();
        }
        return;
      }

      // 7. Cell Edit
      const cellView = e.target.closest('.cell-text-view');
      if (cellView) {
        editingCell = { rowId: cellView.dataset.id, field: cellView.dataset.field };
        renderScheduleTable();
      }
    };

    // Filter search input inside UT dropdown menu
    tbody.oninput = (e) => {
      const searchInput = e.target.closest('.ut-search-input');
      if (searchInput) {
        const rowId = searchInput.dataset.id;
        updateUtOptionsList(rowId, searchInput.value);
      }
    };

    // File Input Upload Event Handler
    tbody.onchange = (e) => {
      const fileInput = e.target.closest('.schedule-file-input');
      if (fileInput && fileInput.files && fileInput.files[0]) {
        const rowId = fileInput.dataset.id;
        const reader = new FileReader();
        reader.onload = function(evt) {
          const item = schedules.find(s => s.id === rowId);
          if (item) {
            item.imageUrl = evt.target.result;
            saveScheduleData();
            renderScheduleTable();
          }
        };
        reader.readAsDataURL(fileInput.files[0]);
        return;
      }

      const directControl = e.target.closest('.direct-change-control');
      if (directControl) {
        const target = schedules.find(s => s.id === directControl.dataset.id);
        if (target) {
          const field = directControl.dataset.field;
          if (field === 'utIds') {
            target.utIds = [directControl.value];
          } else {
            target[field] = directControl.value;
          }
          saveScheduleData();
          renderScheduleTable();
        }
        return;
      }

      const editControl = e.target.closest('.edit-control');
      if (editControl) {
        const target = schedules.find(s => s.id === editControl.dataset.id);
        if (target) {
          const field = editControl.dataset.field;
          if (field === 'utIds') {
            target.utIds = [editControl.value];
          } else {
            target[field] = editControl.value;
          }
          saveScheduleData();
        }
        editingCell = null;
        renderScheduleTable();
      }
    };
  }
}

function closeScheduleModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  if (modalOverlay) modalOverlay.classList.remove('open');
}

function populateModalTargetOptions() {
  const selectUt = document.getElementById('modalUtId');
  if (!selectUt) return;
  selectUt.innerHTML = '';
  ALL_TARGET_ITEMS.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = `[${item.category}] [${item.id}] ${item.name}`;
    if (item.id === 'EQ-HVAC-101') opt.selected = true;
    selectUt.appendChild(opt);
  });
}

function exportScheduleCsv() {
  let csv = '\uFEFFSite,구역/Zone,작업유형,작업구분,작업대상,작업내용,현장사진유무,현장사진URL\n';
  schedules.forEach(s => {
    const targets = (s.utIds || []).join(';');
    const hasImg = s.imageUrl ? 'Y' : 'N';
    const imgData = s.imageUrl ? s.imageUrl : '';
    csv += `"${s.site}","${s.fab}","${s.type}","${s.subcat}","${targets}","${s.content}","${hasImg}","${imgData}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `작업일정_${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
}
