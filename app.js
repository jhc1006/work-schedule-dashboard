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
  { id: 'row-1', site: '서울본사', fab: 'A동 3층', type: 'PM', subcat: '정기 점검', utIds: ['EQ-HVAC-101'], content: '분기 정기 공조기 필터 점검 및 냉매 압력 계측', imageUrl: 'https://jhc1006.github.io/work-schedule-dashboard/img_hvac.jpg' },
  { id: 'row-2', site: '판교센터', fab: '물류존 1', type: '자재입출고', subcat: '원자재 입고', utIds: ['MAT-BOX-301', 'MAT-PAL-002'], content: '신규 물류 표준 포장재 입고 검수 및 적재', imageUrl: 'https://jhc1006.github.io/work-schedule-dashboard/img_logistics.jpg' },
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
let rowCategoryTabs = {};

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
        site: item.site || '서울본사',
        fab: item.fab || '',
        type: item.type || 'PM',
        subcat: item.subcat || '정기 점검',
        utIds: ensureUtIdsArray(item.utIds || item.utId),
        content: item.content || '',
        imageUrl: item.imageUrl !== undefined ? item.imageUrl : null
      }));
    } catch (e) { schedules = INITIAL_SCHEDULE_DATA.map(item => ({ ...item, utIds: ensureUtIdsArray(item.utIds) })); }
  } else { schedules = INITIAL_SCHEDULE_DATA.map(item => ({ ...item, utIds: ensureUtIdsArray(item.utIds) })); }

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

function ensureUtIdsArray(utIds) {
  if (Array.isArray(utIds)) return utIds;
  if (typeof utIds === 'string' && utIds.trim()) {
    return utIds.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
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
    { id: 'hist-4', site: '서울본사', fab: 'A동 옥상', type: 'PM', subcat: '실외기 점검', utIds: ['EQ-HVAC-101'], content: '냉각탑 팬 벨트 장력 조정 및 정기 윤활유 보충', imageUrl: 'https://jhc1006.github.io/work-schedule-dashboard/img_hvac.jpg' },
    { id: 'hist-5', site: '대구센터', fab: '물류 1존', type: '자재입출고', subcat: '자재 입고', utIds: ['MAT-TAP-005'], content: '포장용 박스 밴딩 끈 100롤 입고 검수 및 하역', imageUrl: 'https://jhc1006.github.io/work-schedule-dashboard/img_logistics.jpg' }
  ]
};

const DEMO_IMAGE_BASE64_MAP = {
  "./img_hvac.jpg": "data:image/jpeg;base64,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",
  "./img_logistics.jpg": "data:image/jpeg;base64,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",
  "img_hvac.jpg": "data:image/jpeg;base64,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",
  "img_logistics.jpg": "data:image/jpeg;base64,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",
  "https://jhc1006.github.io/work-schedule-dashboard/img_hvac.jpg": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQABLAEsAAD/4QCARXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAAEsAAAAAQAAASwAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAKCgAwAEAAAAAQAAAKAAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/AABEIAKAAoAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2wBDAAICAgICAgMCAgMFAwMDBQYFBQUFBggGBgYGBggKCAgICAgICgoKCgoKCgoMDAwMDAwODg4ODg8PDw8PDw8PDw//2wBDAQICAgQEBAcEBAcQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/3QAEAAr/2gAMAwEAAhEDEQA/AP00i+9nzjz6jcBV4kPIfJAdRjO0Efzrz9fiF4HHP9qxLg45Vxyeg+71rXbxf4Xh3CfUYoSMZDhkIz0yCM19PJ67nycFFo6osVI3L0xkHvU8jq43ovl8ZweRXOp4m8MuAf7Ut88dXAxkZHX25qS28VeG7qCORNTgVH5UM6qcHPzYJ4BxwTwazdVXNY0lZnQQxtKdyg5HUDn9KciA984/A1hnxX4Xgt3uH1i1WJGMbsJkI3f3Tgmrtprmi37wpZXkcwuATEYzuDbSowCPdxioeKsUsJfoaxhXgL85PYA00xlX2suCOvtVG11vRb2P7VbX0Lx5IJDhcFTtIOeRgjHNX47q1lbMU8ch9nB/kaft5C+rwAxKvU4zVie0hjjR45lk3DkAEEfn1rFuPFfhq2tbm9n1a1S3sW2zuZkKxNkKQ+D8pyQMGqtv408L3a3sqajEI9PUmZ5DtREBxv3NxtyQMjik68tC1hI66HQ21uk/7gsE3chjxjHrwTSTWqxOyBg2MbSOQfxqW2u4riGO7tJFkicB1kjIwwYcEEdiKpXmsaTpsiR31wkDPHJNukOEVISu9i3QAbx165pKrLm0CVGHLZlyK2tzEfP3IxPDAZB/yaYlizgtnao9ev5UXep2tnCJdQukhiTGC7YAz6V5Rqvxh0DTYwZIXe9lfZHGPmQsWwNzjpxznB7VdP2kr8pFSNKKXMey2sOlZRXt5bh+chWwD/hVLUIrIz5sUeJDwUfnaR1wa4ofEnwrJez20F037nILBCqM6p5hQBsHdt9QKP8AhPNMm1NoAV+zrp8d5klVk8yR8LFtzjcV+bGc0RhUTu7hN03Hl0OoS0klYKo6+vA/OtOKzgtwspXzZADkZwAfamNcQ+U8yzJ5aA7juG1dvU8cDHeuS8ReONB8MaKfEF1cRz6dBJtnkiYzbF2k8CPJJJwMe9ZVK0mjWlh4xe2p14tln/17tbxkdXZmBP0rMl02GG4ETXAljIBDRgknPbHrXisn7Q/wwlVbkT3ohbJDCynK8dcErjisuL9pz4VBP+Py6RzjIW2lOPbpWccTbZmk8NfeJ//Q9z8I6V4LvvFkWlSaSk9h/ZchkhkjkjRbyG6ePzWcAF5GjI7Fcc8HIqbxb8J/Cer6rbXWmTvouqKh3RRCaSGQKV3HIOY2UuMYypHbNfRh+D+iy3zalcaLpi3rRi3eb97I5idgdu7EZK7gCR681sWfw3sNKRriys9OgYAsdkEueCARu88dcDt2ry6mIlLodSwdO3LLY+FfEfw8fwb4VXxbBNqFzrVhdI6WVuWKtbRtuG5h1+Vdpye5wB0rutAurPxRp93qGqeG7mfTL25VrewgvhaulvJD++Q4YMVWVTgODgngYFfZlx4Ntmhm+0ray4VgV8hirBRuAIaVuCDXLfDvw74Z13w5F4n0q2to1unuVVhaICfJmcKfnAbnHcf41Ma0krWQ/qdNbbHgsXwZ8DRWZlk1XVoFjV7hbeLGY3OXC7/lyQQAScg968di17W9L1DwGuj3k9vBePH/AGun2qMFZmbcxYOMqzBVJ8ojoK+5PidL/wAIX4aN/pzLJqV5cw2VoHgiK+bNJt3FQuSETc+MjOMZ5r42n+IXx21e5mj0TVNKmSInBbT0UlF3ctiOQKcAHGe9XTrVFq7A8LS2ii54u0rU9WXUF8Bx3F39nvpFf7NdeaklqzRmFtp3rkESEdyMg54qjanUbrVWi1y0vrI29t5aySJKqMUUHG4KvJYDBwfrxzjzfFb9ozTdGk1Y3Wli2igkuGWJo0k2RA7sINvPBwO9ePaP+3N4gvZjYXlzqcsjKp3xq0O0su7jEmDx6itqftJt2ZlOjSjqz0m+ufEU73VmmlRLYXjb2QTKoLhiBIzBQzOMDrwT1Fb/AIZl1tIbyy1XQbrWoJ1JEJllWMSSAc/6Mm5hnoDwOuKtaX8S/iVrVlBqGneKr3y7oRSLFctasyLNjbkPGzcZ56kV3GnePPi5p+rR6dLqFrMcK5e4t4pRhjgf6pE6n3qHVmvtCWCi3zM4g3Hj/wAOaSlzm9tZDujnF5BNseIKgAiKRxqnHG6Rh0IBBzXO3njS91mWcXFxeYezWImSGPG7+7iKRd0YIHB+bgZJr7HbXm8c/BTW7iS0iOtCEQyRwIcl8qTtX5j6g+4J46V8oaDZG30ucSwyJJcMjuksTIYdrONpLDnjnjilDG1YTu3oXPLaU42S1LuiXuueKLM29xe24ktGUNI1vcGSRcZj3KJSijk/dHJznitS8/tjSLZY5pbRDLth3mOXa8xIYuqGIhCxXlckc8YrJ8L6xp+l6n4ygW6jhubaytDChYFspFK24L3G4jnGK/MbWf2pvjHqN0f7T1Gyv/sjuIPtNhbOycnGGVFYfnXq0a82rpv72eZVwsI6SPvn4q3d7JDpIvHHnGWZysQkUH5Y1DbmCk8ZwDnGTjA4rxhWItLm4Ek3nxK5iHmOcMV44ya+tPhZDoEXw08ca5JpOn339haXDd2++2yn2swb2OCRwJMjH618ua3b+MviF4Zn8Z2VppNjp2mzOk/2SBbN5G/dnywkSnexyAMkcn612UsTafs6j+Zy4jCWhz0/uPp+1mWWwtpEuGkEsS5YOSGBX2PINUlto23W5LGLBJTcdpPuucV88+BPiJeRTWHhnXJ5Ekhtoyqi3lwYwNq4bYA3Tsa9zl8Qadax/ap3kiDNgGSCZAc8jBKYrS73T0EnF7rU+Ldc8Y+K7TxVqt9pesXlrBDdzJEkVxIsYWNyuAgbbg4yRjGa+9fgTr/hL9ojw5e+BvH1nb2/irTIRLBqNtEkE80Odu87AFZ0bG8EYYEHGcmvzbvpw8UkzEhriaRyCCCCznqDgjrXuP7NHiCXQ/jR4YmifaLi4NtJ7pOjIQfzz+Fd86ScTxqNdxqH/9H9bEyI13ckRpz7o3JqWbmOSMdSJR/7MK5fUPGfgPR9y6p4o063cB1MZuEMnzHI+TO4/gK5W4+NnwoR28rWZbwgkkW9pM2Mrg87PxrylSk9keh7SPc+ItV/ao+IPgbxXqPhzXbq21YW91OkaSx7JGiWRkXlNvO0Y5zXc+Hv2s/BUdvFo+paVeeH4o+f9C2G3Tfkng+WR3z9e5r4z+NcFpqvx3h1nTAxsLu+kaPeNrbGYMu4djzXZeONOgtNSs57aIIt1CjOAAAWQkZ+uMV2qWvK0c9uqPpPx/4n0z4pw6dN8OvHFjJNYGSZLLUbmS0eWeRditvdeAEZxx1zn3rzz/hWXxatNEFldeHri9RowqyQ3scsDMFCBlSJlHbqa+Stb1Dw5ol1GmoTLaSz/dIJUn6kep9a9x+GVr4yurS91Lwn4outNaz2PGsUjBZAysedpAI+Xjg1tUy2fKpWsmTHFxu09bHSeJvhx8QrrwpfaNo3hbUPtVxC0SBRDaorEEAmRZC5GeoHXmvmPwb+y18drC4j1i08O27pLCFXzpgXztVTuSZTgjBHIzX1Xon7Ufxs8PwodZe11q2jVo3aWJJJBKoUld0RRsgMM7ge2M19KeNv2jvD/wAO7LS77xal7ENYgElusdkTIzKqtIAHEaALvXBLck9K5alOpSfL+htGVKac3+Zy+j/Di6/4Rqy0zX/DlzPJDZ2yymKKGNXnQN5h3RyR8A42k4rhdW/Z88dPfQXnw41y68PqQ3mRXs7XCKp7Rj52BySSG3D0Ncp4j/4KAaFZSM2k6TeTqOFe5uYLZQOmCkSyY/76rz7X/wBtn4mX+mtqOg6dplnDIhdPMlmuXYA4+X5o1Jzx90/SpjQqy6Gc8Zh1s7n378IvCHiT4cafPF4m1iO+nuGBlcQrbKxBJBQbwAcsc/J82e1es3XiuGN084LMjMI85EgLf3fl3EflX4VaD+1F+0B8VvHGi+Ef7dGjwalqsOnubaKKNsS9w0ajgY75PvXyp8T/AIqfFPUNXuNMv/GOp3VpFNJCYpbuQ7wjMu4pnGCVPbnr3rWOGkna5nLHwaukf0f6r4z+EFleXV/qqaVb301u8FxKfJSc27cMkhOJBGTgcjGSO+K+MPGWifsFzmQp4U+23BPXS4L/AAx77ZIh5P5sK/PP9lXw7B4j8aFPEVub+2kjdpnnJcBA0YUMWPQt05619y+PfhroWnLZHwNprhj5rTiy3syjIC7ghOO/45rqp4abTtI5KmMjo+U9s0r4nfBuy+FV3pMOjaxZeF/E09zZGIlftQa2Efmk5kJVTvG3D885A4rd+G99+zYuhT6T4enks7OSUCW0vruaBZZOCGKPKI3PA+bk8V8j+HvCd9daza6f4iuNTsdOYuZD508O35T0LHAJIHan/EXw5beENPt7nwdr97dGbzDJ/pSykbSApxjg8nqTnFbxpuK1Wvc55V+Z32R95zfCL4J+LJ0vrDT9Ku7yNQqSR3olmUDoAyMzjGema88+IPwf8faL4S8QJ8OtRntdUkjxpvl6xdosT4Uc+bJ5eAdxAYEcV86eF7Kzm8CaPea3/p+oX8IctOAzP5jMQWI5wFIA/CvqD9nDxXpnh7wBqP8AaStNI+oyrBEz7jsREiVELEkDcrE9uSfWtadRyVok1aST97Q/N7xD8NfimZ4tS+LvinS11V4U81728W6uHCZACpZGSQkYwMoB6muk+HFh4c0L4h+G4dJjvNf1f5J1yUsLVWbIDfOJJSACOMKehz2r9P8Awv4b+F/iLRLO48TaPY3l9qEZnmeeCOUqZ2aTYrFchV3n6961tL+FnwSW+g1zRNGsrK4gULBLApiZUXCrjBA7Cut1ZW5bM4lg4357o//S+q9N+FHh6FVRZprnGcBG2ocf7qg4xg4969G034RwSRO7aFJMMAK8quEBHvIeh78jrxXQN488ayytBbG308Jy6IXcj2/cpbAH/gRz0rgJfGmpr4r1Gw8Ta8tvp1ta2s8UiiKGR2maVZVYt5kmV2LgbsjOa+eliIveo2e4qE/s00j4z+PWg2vhv4nCZ40igiubaRVjKlVSa3wBwSOoGRnOawPHeo2NwdO1G2U5MYgYA5XCSAggdOQx56/lXJfF261HUNPN3Pqk2q3MpZ3ubhzKT5N1LEgV+hVUVcYyAcjqCBzRa5Ok26XYKOhLj6MA2efpXo07aNHHK6umcx4psLrVw+saVYwagYtsc0Fwu4FR8yOnYHkjkH2ro/AS6jp+lSl4H0pfNcwQLIzNFEVHyljyfmycdOa0vBmsy6FPfOsQkyVJjkz8yKSueOnU+tb99c29xqTmCPyY3UELwBnvjHH5Y+le1HM5yoKjLZfecCwiVT2h6N8SrS0Twz4V1aGBIFurctKyKAZJFhiBZuMscADJJrT/AG2LIan+z/4Z1h/vW9s2G3FSU8iJihI5wcZ69q4vxJ4ltfEvhLRrZJvn02PyhC0e0qojAPIJVgWzg8H1r2n9o3wvN4x+AHgfRbWVI5r9FwZPubvsybQ3sSoyK5sXJOcWVTg/YyR+QqLc6XZ6jaaFeeToupybLrIRGlETl02ykfcGcjoNwOeBXXLpXjB/DBXUXksLSGKxXTzaiNvPtiVDmRj8xOwh+FIORj1r6J8E/s+eO4vFb6bd+E5NZsvIR4ZHgcRIRNuZWMhVCJNxDKwOF5HPNfU+ofBTwR4FtbMeOfEWl+HtIgibzIZX8y5ibqqRIo5CtwMDOBgZ4IuU425UzyMNhJxfPLZ9+h+fPwG8PGP4m+Hb0r5csHiVMp1x5NsJCd3fk49q8Y+KmmabbeItMvNP2GN4XW6m2geZdPJLvyN7lmjDrlsLkYwvGT9veErT4R2fxN8ORfCDVL/WNPbVtQlup76Py8XAtVP7nKqxjwc5YZzXzH8QvhTqS6Mvi+3+0WekiS7limuoJbeElJDI8TGdFJc/MY2jaRSFwdvFZuo01c7PZJxfLt/wxmfD/XZ/B3jlIb/zU0OGNZofvxNdAgPEWUEZDMPuNwMfjX69fs066dZn8QXl3cC5idI5bVXAzGCx3L8vYMeO/OMnFfnPr/hW11q98NeKUYzzTIqGBW2+YiAvGgOOrn8sjPPFfdPwA+HXjr4feMPEF9q9if7DvYU/s55rhN7bmDlMDgFcNnjPU14GExl8XBN6vc+yx+TypYKckrxT07n23Ej3Dt8nzFRkHBz6dv618I/tNhLbxBMijHlWkCscAZYDJ6fWvtO5vbuaLyRZSQyuVZWV1YhRjgAEHnFfCP7St21xrmpAoyHYqbXxuBCAc8nrj1r6yvUsj4Ka0DRLCOHwpo9xckpHBZwZJ9UjXI/WuM+H+vamdDuZFTMcKnI37CjSl3455JVh7npXgL/Ef4jt9p0TQ/GXhzXrC13gW18suk38cS5G1ROqRSso4Gx2LYGOTXGeCfiL8QbLx3rej6LpdzqGiWPkfa2jgkmiQQW6BS7JwrMVCjPOTjGa8vD4ipTjzwetz0K9OnUmoTTtY+45PHur6TbzXLrNBbW6MEc8p8gx1+grT074s3ke2Jbsqw4IkBXp+dfFFr+1Bouq2o0/xLojQ+Yz71Q43BugKuAfXvXqNt8c/h/re2O2uz5zkAR3Kg8+gYhv0NdlLiKsn79O5zVcjotXhUsf/9P0iXxnJ4kjey8M+HNV1d2aLy5dQu3aBlYljlISU4UHIIAORhhzXnPxIm+MnhHTb/xbpNr/AGNMVgtIY9Igh81Y45d0h8r98cqc5PbOGOOB9j2eiWtt5YuROY90Q8qNQAMIQVATy1VvmJGWyR1xnA3bS3Q6jIdPihiYyK5MWCeFyclRhmYcMCcDrur4uFfll7qPqp0XJWlJn5W2mt+JPFGgWdr4yhlt9WtvtXnw3A2XEYnuGnVZYiAyn5ywY5DghlPUD0nx7ah/A/hK7t0Ala3uICwGCTGp25I9MGvdP2jtEi0608N34hjia4WYDYMHZgEAggHjn15zXz5Nri61puh+Dpo/sxs7oMly5/dFbhtpB9Nueeehr6PC4lSg3bc8evh3F2TuePaRq979qjl8Q2clhbzQoFuQN0G1x1dhkgE8nIBHvXbaoY4bkOs6SRbF2yxNujbaeSpH1rQ0/SZLfThpsSGURRnds+bAHDN9M8+ldH4a/Z8m8Ww2934a8RQ6Vc6gzqdOuV8uObDbQYJGYR7s9VJX2Brso01LVM5K03BankP9u3trqQ0m4thNa3LIkLx/fTg72kGegbgYA69c8V+hnxJ8Xax4G+DHwv8AEfh21tbvVW+z20K3geSIyXFmyLlUIZmJwFUHliBXwhe+HfEnw78Z/wDCB+P7WI6gnzQYIYgHkNwTg4YdCQR37V9l/FuRI/gH8J9XdTJFpWuaDdS4GdkVs6vI3vtVSfwqcZTcba3DC1VJN2Pl7VvHn7RnxF/teDxJrmpaNaaRqQ028sdMRYGhuZFEiRARYkfzIsuM5GMZ61TsPCNv4OsbWXxZbiyN1dWiXMmo3UQupIpWPmHynzIn3flLAdCcHt1HifWNZ8Rat4zn8EXMtlpviLXLbVWvhuguomisxZhRgZCyFAxIUEbscYNbFp8G75/hJr76faW93eLdvdTC/aYLvijAGJlZZS+8lY8v1IB5rN1pxV7fkhujCcbbbeZ5bodt4Fs/jXb2/wAN3eTw/wD2lqslsZSWbI06BpcsQNwEhbB9MCvi740anqOpeOIpda1W+1eRbfUUVrq5ebaUj2xgAttVEBAAAXjjB6n7Q8KeNrTwX4UtpPi54G1/w9e+HEu2sdQllkv7dXvYijQSzsMiOQlfLVsnONrdRXxl8SfDWpan4hbxDobxapYLaTMZoXwVM3zBWRzuGM9iR9OldUaU6iUoK6OV8lO8ZPVnb+CfFWvSeGtO1Gd5Uj0adC9/LIuyOWWTMahmIO7CZHXABr76+H3xd+Jvxn8S6T4O8HpGjeB4jPd3E8qwxT3THbhmJGTs3KF75c8AZr8bPFPjS6h0lvBFjIkungrcXHlnKtOBtQq47KrEemWPsa+8Pgj8VdV+Del6X4T0uX+zPEOrKdV1G7BD3MUdypW2gBYH5ig3vxnBxxk5MHlShiVUpJc7va+y7v8AT5l43iCtLDLDSfuu1+7tsfszYSaldyI1/aPZXWxBLAxDlWA5wy5DKeoYEgivzz/aI1WKXxfqkDklnunHAzhUfBJ9AMgc+tfT3wo+Ptv43nj8O+LL+M6miedaXuxU89U5limwAu5V+YNgZAYHnGfl3xeuk658YNMuNWtzc2lxq0fmRqCXaF7pd4XGDlkBxj1rbM1Km+Sa1/A4MPFVLcp+cuh/HTxz/av/ABXGk6f4y+2N9mjOq25b7MJGC74fLKKG6HfjdwMmu00f4q6b4f8AE+t6/wCFhq+kvZW8xvFtr1UTz4GSFLmDaq5d2bcBLuCkcHpj9oNd+Cn7M/xDuf7T2W9vdqfs1nYXhw4llYlFSOTy2VmY5OXb1znmvnbx5/wT31RNI8Qv4VtvLudahiktyJRMVdZlmdWQbHXhQCB5g5JB6CvIhOKXw2XkexUoy/mv6nzzo+vXHjHwxo9v4f1zwj4+06C2hWLTNdtUtb2F1QeYjOpSQnd/FuOWOOetcb418B/D7TNp8WfCHV/DGrXW5bKXw/qUdzbSTAAggSEhE5GSSwGRXC3f7EnxXj8c6d4I1QWvh6O+kTZfX8vkWcSkjIaR9jlzztj2BmPQY5r6c/at0jQv2W/hvpHwg+HNhrGs+LbtEOp+KdRjnNtHGV4gti+YlOcbUjPyD7xJNFKhqnzXXpqRVqe6042f4H//1Pt7T71A4uLsRG9Kl2PllfLUDIUGPHAbJIAPUAHqKs/2nHcxOlrAxNs2EZlRSS4Yjyi3AHOMtxjqwNYlzeX8tnIbGGS+hg2Iok2lSGLMewb92MENzn8K4DV9R1a18dXnhW7v/wCxLGHT4rhZYR+/cu8kblHcsiLEIwVIU8nnbk18PFczSR9fKyu2ch+0/d6RpvhSw1u7uRHZw3G4zTSkgCWI5IyMYJGflYj8xj5B0jxNCk1le6fE149vc27jZhUYrIuBvbC89M9Oa88/aD+J3wp0fUb74Y+GvCk3irWbBkJ1m8vW1RfnTe6p8zoFJfDBSgUjpXzYnj3x1ab28ZXYsYCx2QQleFWE/IFQkgAqOp4JzX0+BwjjFcx89i8cm2kfpD4E1OOPxbLa3UX2aQ/aovKDDzIznO3A4JHTAyD71614I1eWy8YR6f5yyWX9pwOqAYRW+0RtuVP4DjIOMehr8+/h74yvG+w+IfD0DyXPEvmzHeBv+8rA8dzz1r2C5+KWq6Nr9x4zktFnit7iC6a03lQWiCB9r4JG7bnnI9a76UYwk/uOKvKU43PTf2wI/sXx/wBImiG0yqq5OBkbEGB9CK93vtO/4Sn4M+B9NYNLbyX9jEVVmw2UnznZkhSFwSO2a/P7xd8UPFvxm+JMvinxeYlFqxW2gt08uOJBkjuSxx1LHn2r7I8ZePNb+Gv7G2l/EPw3MttqWi3EBidkDqilp4GO3jOFc4/CufEz53G3kb4SPJCd/M9Z8Q+DdC+HvhO4m8U6tpmh2UZS6e4muWVUmbIeM7kBaNBjYQwLMORzz8O/HT9s74TWfh3UfCPw70GTxFHdt8l3JLNa2zTYw0gAO64BJDDcME9fSvirWPCnxd+LVynjX4xeLoo/DbF5hrV3fwyQJGVIRbezjcuWJ4ESRBuxxWZ4U/sLxlr2rJ4e1Kbw5oug2rNpnWa+do1f9+FJCK0rcyBMbMqFGFyLnTinzGVOpJrk7mt8NfEXjH4meKrbwR8QNWu9S0B4r2WTT5J3MIkS0kkRgu7hkZVK5+6w9RXnXiRNa8E3194csXkvrWSF2iBDKyQ7njIfcq7iDjkccdAcgfrv+wt4A+E6/A20j8VXNvp/iLxZqVzKkl9Cs0Ukaott5TzFS0ZklWXHzevXuvx+/wCCfmnWd4viPQbkeH572Jo4fLf7Vp77XEhx0kRj2OTx2OK9HCpzlfDzTezXmcVWChC1aL7p+R+J/gfQ919aatr1u8OircpG9zIrCLcvJjzjGTkZ9Bya9m8CarpniX41Xkvi/VHtYd3lpKSAzC32RLHnaRxGpxx25Nej/HX4f6/8PPhTZaPraxtcLrUksjwPvj8uS3CIe2NxToQORXy78KoUuvGWnxOu4SyMuPXKnjPavRwLfNGDVpJu5w4pxaclqtD9HvAt1b2fx28N2GhXxu9N1X7RbOsjAxyCa1+Y5HG75mVemSfy7bxPeacfGdtdalJCLKKTdKLhisOxUkOHISTC5HJ2EDuMV5r+zVo2q+KPi18OrTTLV7pLPVI57mRRhIbeEZd5GA+VQoySeuMda7jVPDo8TfEG+8PQMzQW7XzyBJDExgt1cFd2QfmBAIzk5x3ryeJqiVa6eyR15IuZW7s7PUPEXhbxFbaTZT65No0kMsV7Yi5nFxG5j+aI207SeYI/mzsE6pz93J219B+HPjl8UfB0USzSy6hZsOHgcXcMgHJPkMqyZxjKxpLj+8a+Yfij8OoLnw74U8Px2TWdpFtMu/cLb7Q8aosQkDFopNyjBVXVWwGTaQDjaR47vPDd/HpPjWyuUNyxSOexjS3nmXAKSCP/AI8rpAQfuiOTkAIrA5+aWKjLVK3p/lsfR+xnHRu/r/nufoRpv7V/wv8AGUh8PeObGNmgkHVMw7x0byrhSqnPQHY/oBXs1jL4L8QWpj8IawUSbINvDc+WpB7NbXZlt3HsrrX5gTeJ/C3iC5a21G50/WJbdVXbMRpmoxK4BVRHclcNg9LeVT7HrV2Bb2yu1/4R3W5be5cAm01NWR9p6EElJgD/AHg1xngc9K7aVdv4Xf8ABmE4R+0rfij/1V1j9qPx54nhn0v4eeH3tzbySJc39zHlbNSuxg0e4QqV+8TJI3oRkZr4L8ZfFXxl4/1gxeKNXub61exRV80G3iIiZd2BGqny2J3HC5PGSetfU/7X/wANtX0CWHxTa6tPe6bJhbiwnuRI9tIGx9pSNQNoYjOcYBIJ4PHw1qun+KUsrXVtQ0+ZNOuYLmCO9nhdVmfYHcKzAbgEGeAceprzMJQiqfNFWZ0YuvL2nK3c9l8X+I/gr8P9Cn8J+E9EuPEWuXtp5MmpXUrRWVrcSISXgRPmYx5GNzHBH5fMWi6J4Z2Q6hqt02rJMTlSSu2VOWHl55O0HqT06Yq34p1aYo1gkCTRm2iYyTsqL/eBVBguwGOprx2wuVlvbmzmbdtO9Cpx8691I4yOxFerRprktfc82vWfM2lZI+5PAGq2OlaImlZAWFB5bxcAgncOD6A46dRXW3EqX+nagvWNoyTnqQK8g8PI2veGo9Z0p1kFspW9RRh4GHy+Ywzyp4JI6fnXaaHqm+J7O4YoxhZSR0PXH50pUOV3RrTxHNFpl7wmqvcmfvK2fzizX2J8ZQLj/gnZfsf4G/8AQbthXxx4R07U57tLyykH2W0MRuI2UlWSRcAhh91h2zwRxX3N4om0lP2Ir6bxHB9o0CzuJFuolBLOhuzuAIIwwVsrjocE+lcFaeumtj0MOrx10ufjp4C0j4YX/wAKPFeo+KtSNh4h0toJtJhSFmkvJ28wNGXwVWFQqlicEk8Z4Ay/h14vi8F6xrk84eSA2t3ZwxIfuy3YMaHGR8o6t14HStx/AFz4Y1fULK3sm8S6ZDYyXfntE0doljcptt72N93zMpcEjGN/y9Qcbfw2+Glv4/vNS0m30D+1ddCm98yHUltnjhLKSIbdoyrsucEMSO3HBro9rGUW+hyckoTSe56H8Af2k/HHgi7j8PxGO+0ad1X7NcRq4U7i+FJwApdmbngEk5HWv0R8NfFc+M9bsYr/AFSbwrHbhrf+x7i9M1vFcq+Vmhj6eVLGWBbcVIClOhz+VFj8N/HXg7xQJW0/7HPbSRsYLkjMS5Dq7c7cbcHGSSDX6AfGf4leDvjN4ftLmz8I248Qw2scX9o3d1NCFI5CpHamP90DkqD0zzms8DkSeM+tYeLTeradk30bWzfnudNXPJRw31atJO2iutUuqT3S8jk/2j/iJ4JnWaztYZNc0y7DwX8caAoPJ5AWTeDnIJVgoxjdnGRX5z6Lquj6D40tNc0e1msdGtLuFpIppPNkCE5yWAHbOOMdia5/xBF4m8N6rd6RqpMMquWZFYunzg8qcnKlWI9x1qjolnq2qSyW+nR+aGCJIrfdwzgLnPT5u9fRTcY1nVs1LdnzkKGmjv0P13/Z0+NnhH4K6F4ntrqd7vV9YuUFnp0IZRNHF5hR5pACojDtwM5bHQdR6F8EtJ8b23xVvfG+v6PPDY3Fhe3qXk3lpHMZGiJEbZIwcMeQOCeMDFflp4N1/wAYrbWdtq7rYWZaKDz0VWuVikYIAm7KoQSMkjdg8cV+3HwysNZi8Bafp12Lu1K2iRo11GDAdgd4mQoxd1fIyrYORn2rwOIsRTcOenvJ6v5bHt5FhZKdp9Nj0HXYNC1OMw3MaCO8KRTsFwikNkLIkqtuUmNsE8DsccHx7xF8I9OvNNvLXwxd3EN07yJseTzozGSWZSp2tgsxCKxZc9sYB9mVzp32Sw0CF3ur7y4kW5jaSZSRiRN4yRgtkccDPOOjEuJLmBrTXPKgv5rmS3lkEexgi4AUO4VWU72PUEHbnIBx8fG97pn1ckrWaPzz8e/CvUfDcttBfaa0F9qhSO9mV/8AQpY8sjfu2heF5gpDDekIHTORk+bXOn+NtPsBokGqOtq+UjFiy3dvAFdQxOnXYMsROCR5Dsc5AXBxX6i29uYIGkjcqEEhNyq75QFbOfmBYbwCcYKjbwSDz4f40+G/ga8Op/Z7G2sJFhKr9mHlzPJIERiwx5bhSwcb0b5egznO9HE3dmc1XDK10f/W+svjF4Pv/EPhDU7zwjHENaezeF28qMTXMJUjyVmcZjHJyeQVLDg4I/CT49+Hl8M26Xnhm9u9TtJ4/sFwW3uLC9DfvLV5lbYWOSVAyrKcgkcV/SRplksaG4nwAoz8zYAA/L8a/Jj9oLQ/C/wH+JOt+NvCpOteEfGro+veH4wxiBkfZLNC44jkViskRHzK2QPl6PE8sZc3R/mYUOaUUuq/I/PH4ieG9V0Y6DHcxSMur2MRiWRNiiSMlHHzc8fLnPHevOI/DVzpdyzQxgyxKSynncoxnkDBwT1Bx9elfZHx9iMFl4E/su8/t7R9RNw+l6uAQk1k6g7ZyPuTQ4xKOxG7GDivniS1FxdXkpmXE8hiVpCqlmBIH7xioUb++QNvY5JEQk42syakVK90YXhzXNS8MXLajpErRrNujkQ9CrDDI4/xr0jwHr19r/iuHwtHbljdsfsZHUqq73RvQgBiD6V5jPYXVlaf2kzeZ5k5t2XOUZI1GV2gE78EFTkgivavgvF/wjuk+Kvi4nFvoVl9i015B9/UtUBgjX6xxGRz6YHrXZ7RSRxRpyg/I7TwnrmraPGJ7UFtP1aVbd2fG1+MhEPGWUgHjOO4r9CdB06Txl+yxJ4bit0v49U1LyUs5WWOOZ5LpAEd2BChs4yRx1r4j+NGuW8/jrTtG0UxQ6b4As7LSrG1PygysiyTyNxzJNM5O7vwK+x/h14sTQ/2Xr7xJbIY5LDVmntxOjBPPilhmgjkX72JZtkeB1B6gcjx8bpHRHvYCSd7s+f/ABT8GPCMPg7xp4A0bVp9P1jwtbW19eeH0vJpNNtWLjzViRmczygODy2zJXC5ya+NdS0m18LWdxfW6PJMiqphVyXfPADODjOTyAOnevffFWv2Ft4fvvinp2rahb+I7+/utK8QLuzBPBftJdxFVA3BXeEjBbbjAHFfImv+IL3XZ5Mkw2gOdn8RGeN2P5CunLKcXTk3e93v/XXdeR5WZYiUqkYxOw8Mz/EHxhfaikMkuoX1zaNFBbwK0nkxxIcAYznCgAnoAOvaqGg+OLiTTbiOxU+aoBU79y85yjofmDA9MZB6gYzjvP2fPjUPhD4jlv8AWNOF1ouoeXBdxurCVY1JKsjKy9CdxUnDYHOQK8Ml1bQbP4iaxqfh+Nl02a8mms/NUK6wSSFkVlBIGFIHfpXrZdi5RquC0Xc58Th4+zU3q+xz/izxRL4ovo7q7jRJoE8piufmwxIzkn1q/wDD+/tbXUlSSUxozLNOUALCK2PmAKDwSzAcHjjFfbXwz8P/AAq8Z+CLrRfFOm6fLrtjNepaeaqpcNDNmaKQHIkcKXKjr93HtX5v2ck0DtcRSFHj9Dgkenv9KxxWJnPng9Htc7MFSp05QqNcy3sfbXhq50z4jPHa6jMdHS3fTpZZRDHLbmxhK+fMJPlZXcRr5agHdIxXjGK/YDwL4ni8deDNP8R6dZkQ6jOI4bdZ2JhtYn8qBiVCkP8Au1YrnjjJ+Y1+DPw21XWrvUTo+ha+LK21R7RZLDHzzzmRQQiFWUbGJkUjjOOPT9m/Cvj7VvB2nWOkF9ttp8At4Xh2RTIgBCs2VKNjJ6r0JAPPHyWJy+tKcmneK2XbRXPp8NjKMKVpL3nrf79PL+u567eX8emSiPU7UxNLc+VFMqkHLncEmUlX2kECNxz0bOMA2bnUbq90WWO1vJri5jWJLiQAPDKxO45DbkByMEZDEAgkkDOPa+PfC3iPUrfw/DqS3OqGEzKiyKJkj3BCzcNEdrfwEZODk9KubrK/gVtCtopYLYzQSRyrlSp5l3napdmbaTtYFB1+8ceS47XO+9rjV1aDTop47yXyXvbsoEttjiyAJUrINjfLIMYOCSzAcZ3DK1bT9ajD6q8ESzvI7GFmHl+XG4Dbd4YuoDKFzGxG4rkKOYP7OsdRu5rXTrNY9kscWYWBw+TiLYFUMrkbh3wozyCTJd6Xf3DQXrrJCLmOSa3VY3DLGiglFfbIzHazLllIZMLywFEY2ZLlof/X+lNT8R674jIGo3BEOSRbxZWMAAdT1b+teR/EXwZqmtWsWs6C9u91pkIEljOiFb62kkV5YU3jasqtGjxsejAdzXoWnOw27iCFYcf7w/8ArVrWLWdtfWcmoQxTg5C+eVCpJuUq+WBAPXsTzkDNcGNm3Sk2bYOK9okfDFv4b+GOi/DseHtN0zUr34Ya5OjX1/O4eTSruQFUnjTAMLxTIVkQBQV4OeK+P/G/wzuPhz4gvfD+swQyrHCj2rxxmaK/hflJ4WUDIcchsgLyp+bp+oPxD0vWPANxP8WvDcct34bv0ZNf024gikWcW5Mf2xYwVV2AO59i5xzx8xrv/DGleEdcSBPCtja6h4emt7g6dcgK/wBhilG6XaWLMls4PzKSVUgfLt4rgwuPfLypX7f5HdicAnLm27/5o/EzQvCGreKdf0zwpo8LX+p3c/k2sEYaJm8w/K4OSOQSzEj5QDniu2+NmqaR4Nj0X4IeCrhL7RfDMnn3lzAwddQ1aYgTyhl/ggRRFHkcrknGa/SD4hfDjw1oEn/CC/BWwTSvGPjJ/sU+qW6ZENgCTdvBux5UJXIaVQpc4AwDk/APhr9m/wAdeM9aPhTw7BHew2t1MZJrhJLVLZYHCm4uZSpi8vAJAEhOeCOQT6dDFqWnU8yvhJL0OI+M+rXel/HTWzGrB7iS2mSNl++Gt4mGV69TkdxjIr1LT/iZqfiT4a+Gvhx4YFwJdPu7jUL2OUeYeIkjt4gSw6sXckA4IUkA16j8ffiL4Q+E/ifW7r4NabF4l+IV5bxR6j4luVWWKwgFuqMmnQPnBKLl5mG4Z+lfDPwg8X33w5+IcGrX8azxhpYbqGZWKNHcxmOTcMZyFyRgH6HpW1ap7jcVd9CMNSXtYxm7JvX0ue+eOPhh4g8PWM/g2S5kt9X81xf2c7/u47qzwVJIYg+YkuQcYGW9zXyWt/Y2kcl9HfLI5EqeUULE5AABYADPJwRxx719n+L/ABFe6/4ivvEVqnnz65EqxJKSrYEflRg7j8rMGjBOcZr03xV+zZ8JfiHe2mq+E/DXiHw9Fc6Jb28ED4uI5tZZhGse6JpQoYsoTdtQ8/dxXNg6/s8LGpjJpSfTz7LvbReh21sAquLlRwcbpX18lfXyva5+ZF/q0erMtzeTeWUG0RqnQKABlu5xwPQVmG52XEd1aO4MZHzbsnj0J9PQ19V/HjwJ4V8LXvh3RdXM2h3+g+G9Ps7yERJK8moDe7qwRgMruAYk55z2xXzXL4V8VQ21vdzaRdRQ3GGiZ4HAkB5ypIwRjnPpXpKpCLUuY81xm4uCid3feKsWGk6tZ3ED3FrIVKCJ4n2jDAuhyvUYyjY9MV5ZodiNS1URSKBCznPB2gnJHTOPbP51623g27vrSwk1G0OnO8bb45HIkkYrhHEbEsFPUNjaR0Nangj4IzeNNHfWvC2vraTITDLb3cLIVk2/Mu5cqwIOQR684NdFXHUnU5k7rqZU8LUjHlasza8I6N4T8N6pbazZQyG6SMyxvJL8iB144wOQO+e9T33j9rwzxm6WWW1V2n3y7jLBMisqbjnmNgBn1A96oXv7NfxFt4XebVLOR15Cb5fm9idvH41wV98GviNosbz3mjyTRLy32Z0lJH+6hLY/Cu2Obwa5YKxxyy+Wrk7n0L8FvEV/Y/FzQNds73/iX3d4dMuy2dkUd5lAznG3BJU8nk5GOa/TrQ/immkanH4e8WwNbrp5kQXduCQZAd0cjxk7eGAYMM8cFcV+L/hv4gaX4db7DpumyWb3Fs1rexyOWWR0G6KYcKySpIAfTgdwc/rF4dtH8d6vp/ia1glNhJb2dy8iBT+9aCObgMNr7eCyjJIwCMHI+Nr0owclVWnQ+qoVZT5XSevU9h1PWdFsNcspftLTal5zXEk6BPKZpVTeJpOXGSAAy8qCSwxVuHU9W0i2+06TeStLpNy07byXZ5ZHG6F1BIZARlSuADyqgDBkuLOzuILrS9HnJ1CEzJJ5kCSpO0S/OySI24uyKCi4JTaQo2dM9bbVtE1q/wBL0bUriTSWiMCTRRyyW1gcxbC0kzF1jkYMwZSMDay8qa8aKR60mf/Q9500NcTNAFIBAPTnIOP8a9LsfDWuW622uWEBLQzbY/M2qCzqwBG5HHGeMoRnrXqngr4Z6bolodV1ho2WBC8sspC28QUZYknrjueg715l8RP2m/hl4TM9pYTA2syAPfuCPtLKQnkWabSWkYN8vy4POAetefiGuRp9TfDRbmmiDUdP0p4Z7vxHcPdthpLrTojHIsTs5+8+FCAjIwcNz0PSvkjUPHPiI+LYPgj8BvD+mXnh14MXVmjP5en3Ny++U3Uvm5fZlg0ajYuc45GPRLDRfEHi3V7SPUNJHhvwxdT3LRQ28rLqd4JCY9olVT9nXKncqsJS3BIOcfGng345J8B/2ifGXgrVdJj0DRHhjt4bOBWfcbVf3bqzjfvmILFm65YnJxXkUJNxlGkv68z2K6SlGVR/M+0fC9t4Y0iPxJo/7QGrWcN54JhtLafUI2MUmq6dPmSzjKD52KvuTYrckYIbIFfNutfF7UvjP4vt/hP4csT4V8EXbvK+naZEY725+zqXM13NGPkdlQAKqsEB+Y7h8viuoL4u/aG+L994j0ayEuqSQB0WR8QWlrag4cluAV3ffOX3HjA4r7y8JfCXRvgrpyLpO+TUdQtfNnurmOMySSrGiPFCy7XWF3fiIuCxxnHforVPZxs/jaOOhTdWV18CZ8P/ALUE/hrwdqGkfCfwja2sej+HLdri7i3bZZpb3+MSsN8siI2WJbOWPygDFfnzfvFFqUjwpI/lujF5H3lVUfOMgYIz0549+tfUPxJsPELandXHiS1kg1F3uZmtJrV4NklxMDKuZBuMffk88Z4FeJ3ukzXOpraw2ZUI6ottt27gOdpK8uzsTz6Yx149TDpRgoo8zEScpuTPtL4BeA9S8d63ptjprJFqV3ZSRp5hR0SOGJm38nneyLx1IIXua+xv2LvBFlq3xA1LXvGNv59v4Z0u0zLNBtiF3exxSRypExdSURm+bsFUjpX5H+B/jzrvw5ufLhja6uYIjALiKUwyCFmD+XlQcDhcgf3ex5r7E+E3/BQvT/A9j4i0nVvD0txa6/GEBR03W4S38mIKxXcdhywJ65x6VwYilUlPWN0rtfger9Zh9XcYStJq1mtN3qc342+B9l8a/iH8RtG0DUZHnhvJrrTeQYpZ2ZVjjfuY9hwGBLDrgjNd/wCDPiH8S/Belaf8PfHOh7H0mJY44bpUmDRx/KJLeVZEMkYPAYZx0JPf1f8AZgsrfX9H8U+Prd/sS+IHa7tpvJ8uQwwSZCo4BEZU8jH9zpivRvH3w10jxnpVhaazHd6OblhOlwqRo9k2VLT20u0bS6Nyu4JtUK4Iwa5cwlSqVHBq8Vt5HVl8atOmpwdpPfzPz58f+DfFvxR+Iravc6jb2Vggjt4QqmSdYoxkhYwAi4JJBycZ5Jr3zQ/h7omi+ELbRtGaYtZKdodw0hO4klvxPoB244rkrSHxd8OdYi8O/EqzAkum8qw1SIH7JehScAEj9zNgHMTEHjjpity7167gEhRCu18qQSdwboc16NOHupQ2R5VSfvOVTd7mWrapbSRR6wu5eQT0P9Pun/Pet4afaXcAnZhuxjPXjtiubkvryaNZ5hlcAlfbOAfxPAqeweRovs6q2WJ4AJz7Ducenc9q63T0ucinrY5DUPgp4a+LmtRaS1p5N+W2i7hxFInB5d8EN7bgcnAFfY3hnTtH8CWNlb+D0DWn2dbO5t75pBvhtI1iaaSLksQrbmCfMhICrtHFnwN8OYdI8J3GoXdnLeQXBf8AtRgiusCAvEGVQdx8pWfceoJOMDJXbXxibCWHwzql95s96inTL1GVpMwP5bFJPvMzhNroU2gYXcqyYHg4us6krdEe7hKCpxTe7Mm4vNMstfv9BMzw6nYXSuZ5JBOsjyELmJXQFnjBRmbbv+U4Ygg1rXdxZaPPHKS8k+pbBPAgeK0kKzIIwrvx5RYAMw3OhKk5XJFS4v8AwbrUEt1q9jDqb6nHNazvn54pBsgQXMjt5hLO26MN80TKo6Ek5d7Y3UGmjxKI21TTppFiUTXBL20luqFLuQFjH5rR8b0Y+ZgDkA1ioK92buTs0j//2Q==",
  "https://jhc1006.github.io/work-schedule-dashboard/img_logistics.jpg": "data:image/jpeg;base64,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"
};

function resolveEmbeddedBase64Image(url) {
  if (!url) return null;
  if (url.startsWith("data:image")) {
    return url;
  }
  if (DEMO_IMAGE_BASE64_MAP[url]) {
    return DEMO_IMAGE_BASE64_MAP[url];
  }
  const cleanPath = url.replace(/^\.\//, "");
  const key = `./${cleanPath}`;
  if (DEMO_IMAGE_BASE64_MAP[key]) {
    return DEMO_IMAGE_BASE64_MAP[key];
  }
  return `https://jhc1006.github.io/work-schedule-dashboard/${cleanPath}`;
}

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
            utIds: ensureUtIdsArray(item.utIds || item.utId),
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
  const btnExportWebSquare = document.getElementById('btnExportWebSquareExcel');
  const btnExportPdf = document.getElementById('btnExportIntegratedPdf');

  if (btnExportExcel) btnExportExcel.addEventListener('click', exportIntegratedExcel);
  if (btnExportWebSquare) btnExportWebSquare.addEventListener('click', exportWebSquareAdvancedExcel);
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
    const absImgUrl = resolveEmbeddedBase64Image(s.imageUrl);
    const imgCellHtml = absImgUrl 
      ? `<img src="${absImgUrl}" width="60" height="60" style="vertical-align:middle; border-radius:4px;"><br><small style="font-size:8pt; color:#15803d; font-weight:bold;">[📷 현장사진 첨부]</small>` 
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
// 5.1 WEBSQUARE advancedExcelDownload(options, infoArr) CONTROLLER
// ==========================================================================
function exportWebSquareAdvancedExcel() {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
  const memoText = globalNotice && globalNotice.text ? globalNotice.text : '등록된 전달사항 없음';

  // 1. 엑셀 기본 설정 및 파일명 정의 (WebSquare Standard)
  var options = {
    fileName: "시설_물류_근태_종합_운영_관제_보고서.xlsx",
    sheetName: "통합 1시트",
    type: "1",               // 화면에 보이는 데이터 기준
    useHeader: true,
    useFooter: true,
    startRowIndex: 7         // 첫 번째 그리드(grid1)가 시작될 엑셀 행 번호
  };

  // 2. infoArr 배열 생성 (타이틀, 섹션명, textarea/전달사항 데이터 및 서브 그리드 배치 포함)
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
    text: `발행 일시: ${dateStr} ${timeStr} | 통합 센터 관제 시스템`,
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
  infoArr.push({
    rowIndex: 4,
    colIndex: 0,
    rowSpan: 2,              // 2개 행 확보
    colSpan: 8,              // 그리드 전체 폭에 맞추어 병합
    text: memoText,
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
  var grid1TotalRows = (typeof attendances !== 'undefined') ? attendances.length : 5;
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
    targetGrid: 'grid2_schedule',
    useHeader: true,
    useFooter: false
  });

  // native WebSquare grid1 object check
  if (window.grid1 && typeof window.grid1.advancedExcelDownload === 'function') {
    window.grid1.advancedExcelDownload(options, infoArr);
    return;
  }

  // WebSquare5 browser simulator: Synthesize HTML Excel file matching infoArr & trigger download
  buildAndDownloadWebSquareInfoArrExcel(options, infoArr, dateStr, timeStr);
}

function buildAndDownloadWebSquareInfoArrExcel(options, infoArr, dateStr, timeStr) {
  const noticeAuthor = globalNotice && globalNotice.author ? globalNotice.author : '관리자';
  const noticeTime = globalNotice && globalNotice.timestamp ? globalNotice.timestamp : dateStr;
  const memoText = globalNotice && globalNotice.text ? globalNotice.text : '등록된 전달사항 없음';

  let htmlExcel = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <!--[if gte mso 9]>
      <xml>
        <x:ExcelWorkbook>
          <x:ExcelWorksheets>
            <x:ExcelWorksheet>
              <x:Name>${options.sheetName || '통합 1시트'}</x:Name>
              <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
            </x:ExcelWorksheet>
          </x:ExcelWorksheets>
        </x:ExcelWorkbook>
      </xml>
      <![endif]-->
      <style>
        table { border-collapse: collapse; font-family: "맑은 고딕", Arial, sans-serif; font-size: 11pt; }
        th { background-color: #0f172a; color: #ffffff; font-weight: bold; border: 1px solid #64748b; padding: 6px 10px; text-align: center; }
        td { border: 1px solid #cbd5e1; padding: 6px 10px; vertical-align: middle; }
        .ws-title-cell { font-size: 14pt; font-weight: bold; background-color: #DBEEF3; color: #0f172a; height: 35px; border: 1px solid #94a3b8; text-align: center; }
        .ws-sub-cell { font-size: 9pt; color: #475569; border: 1px solid #cbd5e1; text-align: center; }
        .ws-section-title { font-weight: bold; font-size: 11pt; color: #0f172a; }
        .ws-memo-box { background-color: #F9F9F9; border: 1px solid #cbd5e1; font-size: 10pt; vertical-align: top; white-space: pre-wrap; }
        .badge-cell { text-align: center; font-weight: bold; }
      </style>
    </head>
    <body>
      <table>
        <!-- Row 0: Title -->
        <tr><td colspan="8" class="ws-title-cell">시설·물류·근태 종합 운영 관제 보고서 (WebSquare infoArr 통합 1시트)</td></tr>
        <!-- Row 1: Subtitle -->
        <tr><td colspan="8" class="ws-sub-cell">발행 일시: ${dateStr} ${timeStr} | 시스템: WebSquare5 Advanced Excel Download Controller</td></tr>
        <!-- Row 2: Empty Spacer -->
        <tr><td colspan="8" style="border:none; height:12px;"></td></tr>

        <!-- Row 3: Notice Title -->
        <tr><td colspan="8" class="ws-section-title">■ 근무 전달사항 및 실시간 공지사항 (TextArea Component Data)</td></tr>
        <!-- Row 4-5: Notice TextArea Box -->
        <tr>
          <td colspan="8" rowspan="2" class="ws-memo-box">
            <strong>[작성자: ${escapeHtml(noticeAuthor)} / ${escapeHtml(noticeTime)}]</strong><br>
            ${escapeHtml(memoText).replace(/\n/g, '<br>')}
          </td>
        </tr>
        <tr></tr>
        <!-- Row 6: Spacer -->
        <tr><td colspan="8" style="border:none; height:12px;"></td></tr>

        <!-- Row 7: Section 1 Header (Grid 1: Attendance) -->
        <tr><td colspan="8" class="ws-section-title">1. 근태현황 (Attendance Management Status) - Grid1</td></tr>
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

  // Grid 1 Data Rows (Attendance)
  (attendances || []).forEach(a => {
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
        <!-- Dynamic Row Spacer calculated by Grid1 rows count -->
        <tr><td colspan="8" style="border:none; height:16px;"></td></tr>

        <!-- Section 2 Header (Grid 2: Work Schedule - targetGrid via infoArr) -->
        <tr><td colspan="8" class="ws-section-title">2. 작업일정관리 (Work Schedule Management) - Grid2 (targetGrid)</td></tr>
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

  // Grid 2 Data Rows (Schedule)
  (schedules || []).forEach(s => {
    const targets = (s.utIds || []).join(', ');
    const absImgUrl = resolveEmbeddedBase64Image(s.imageUrl);
    const imgCellHtml = absImgUrl 
      ? `<img src="${absImgUrl}" width="60" height="60" style="vertical-align:middle; border-radius:4px;"><br><small style="font-size:8pt; color:#15803d; font-weight:bold;">[📷 현장사진 첨부]</small>` 
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
      </table>
    </body>
    </html>
  `;

  // Download Trigger
  const blob = new Blob(['\uFEFF' + htmlExcel], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = options.fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  alert(`[WebSquare5 advancedExcelDownload] infoArr 통합 엑셀 다운로드가 완료되었습니다!\n\n• 파일명: ${options.fileName}\n• 시트명: ${options.sheetName}\n• infoArr 적용: 메인 타이틀(0행), TextArea 공지사항(4행), 근태 그리드(7행), 작업일정 서브 그리드(동적 행 index) 합성 완료`);
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
let draggedAttId = null;

function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
    </svg>
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('show'); }, 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

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

    // Drag & Drop event handlers for employee swapping
    tbody.addEventListener('dragstart', (e) => {
      if (e.target.closest('input, select, button, .att-edit-control')) {
        e.preventDefault();
        return;
      }
      const tr = e.target.closest('tr.att-row-item');
      if (!tr) return;
      draggedAttId = tr.dataset.id;
      tr.classList.add('dragging');
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', draggedAttId);
      }
    });

    tbody.addEventListener('dragover', (e) => {
      e.preventDefault();
      const tr = e.target.closest('tr.att-row-item');
      if (!tr || tr.dataset.id === draggedAttId) return;
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';

      tbody.querySelectorAll('tr.drag-over').forEach(r => {
        if (r !== tr) r.classList.remove('drag-over');
      });
      tr.classList.add('drag-over');
    });

    tbody.addEventListener('dragleave', (e) => {
      const tr = e.target.closest('tr.att-row-item');
      if (tr) tr.classList.remove('drag-over');
    });

    tbody.addEventListener('drop', (e) => {
      e.preventDefault();
      tbody.querySelectorAll('tr').forEach(r => r.classList.remove('drag-over', 'dragging'));

      const targetTr = e.target.closest('tr.att-row-item');
      if (!targetTr || !draggedAttId) return;
      const targetId = targetTr.dataset.id;
      if (draggedAttId === targetId) return;

      const sourceIdx = attendances.findIndex(a => a.id === draggedAttId);
      const targetIdx = attendances.findIndex(a => a.id === targetId);

      if (sourceIdx !== -1 && targetIdx !== -1) {
        const sourceName = attendances[sourceIdx].name;
        const targetName = attendances[targetIdx].name;

        // Swap position in attendances array
        const temp = attendances[sourceIdx];
        attendances[sourceIdx] = attendances[targetIdx];
        attendances[targetIdx] = temp;

        saveAttendanceData();
        renderAttendanceTable();

        showToast(`👥 [${sourceName}] ↔ [${targetName}] 사원의 근태 순서가 교체되었습니다.`);

        const updatedTbody = document.getElementById('attendanceTableBody');
        if (updatedTbody) {
          const row1 = updatedTbody.querySelector(`tr[data-id="${draggedAttId}"]`);
          const row2 = updatedTbody.querySelector(`tr[data-id="${targetId}"]`);
          if (row1) row1.classList.add('just-swapped');
          if (row2) row2.classList.add('just-swapped');
          setTimeout(() => {
            if (row1) row1.classList.remove('just-swapped');
            if (row2) row2.classList.remove('just-swapped');
          }, 1500);
        }
      }
      draggedAttId = null;
    });

    tbody.addEventListener('dragend', () => {
      tbody.querySelectorAll('tr').forEach(r => r.classList.remove('drag-over', 'dragging'));
      draggedAttId = null;
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
    tbody.innerHTML = `<tr><td colspan="11" style="text-align:center; padding:30px; color:var(--text-muted);">조회된 근태 기록이 없습니다.</td></tr>`;
    updateAttendanceKpis();
    return;
  }

  filtered.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.setAttribute('draggable', 'true');
    tr.className = 'att-row-item';
    tr.dataset.id = item.id;
    tr.dataset.index = index;

    const isChecked = selectedAttendanceRowIds.has(item.id);
    const isEditingStatus = editingAttendanceCell && editingAttendanceCell.rowId === item.id && editingAttendanceCell.field === 'status';
    const isEditingIn = editingAttendanceCell && editingAttendanceCell.rowId === item.id && editingAttendanceCell.field === 'clockIn';
    const isEditingOut = editingAttendanceCell && editingAttendanceCell.rowId === item.id && editingAttendanceCell.field === 'clockOut';
    const isEditingRemarks = editingAttendanceCell && editingAttendanceCell.rowId === item.id && editingAttendanceCell.field === 'remarks';

    tr.innerHTML = `
      <td class="col-drag center drag-handle" title="드래그하여 사원 순서 교체">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="5" r="1.5" fill="currentColor"/><circle cx="15" cy="5" r="1.5" fill="currentColor"/>
          <circle cx="9" cy="12" r="1.5" fill="currentColor"/><circle cx="15" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="9" cy="19" r="1.5" fill="currentColor"/><circle cx="15" cy="19" r="1.5" fill="currentColor"/>
        </svg>
      </td>
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

function getRecommendedCategory(type, subcat) {
  const t = (type || '').toLowerCase();
  const s = (subcat || '').toLowerCase();

  if (t.includes('자재') || s.includes('자재') || s.includes('입출고') || s.includes('부품') || s.includes('입고') || s.includes('출고') || s.includes('파렛트') || s.includes('포장') || s.includes('출하')) {
    return '자재입출고';
  }
  if (t.includes('시설') || s.includes('시설') || s.includes('인프라') || s.includes('소방') || s.includes('주차') || s.includes('개선')) {
    return '시설/인프라';
  }
  return '설비';
}

function renderUtBadges(selectedIds = []) {
  const ids = ensureUtIdsArray(selectedIds);
  if (ids.length === 0) return '<span class="text-placeholder">선택</span>';
  return ids.map(id => {
    const item = ALL_TARGET_ITEMS.find(e => e.id === id);
    const name = item ? item.name.split(' (')[0] : id;
    const isMaterial = item && item.category === '자재입출고';
    return `
      <span class="ut-chip" style="${isMaterial ? 'background:#faf5ff; border-color:#e9d5ff;' : ''}">
        <span class="ut-chip-id" style="${isMaterial ? 'background:#f3e8ff; color:#7e22ce;' : ''}">${escapeHtml(id)}</span>
        <span>${escapeHtml(name)}</span>
      </span>
    `;
  }).join('');
}

function getSortedUtOptions(selectedIds = [], recommendedCategory = '', keyword = '') {
  const ids = ensureUtIdsArray(selectedIds);
  let list = [...ALL_TARGET_ITEMS];

  if (recommendedCategory) {
    list = list.filter(item => item.category === recommendedCategory || ids.includes(item.id));
  }

  if (keyword) {
    const kw = keyword.toLowerCase();
    list = list.filter(e => (e.name || '').toLowerCase().includes(kw) || (e.id || '').toLowerCase().includes(kw));
  }

  return list.sort((a, b) => {
    const aChecked = ids.includes(a.id);
    const bChecked = ids.includes(b.id);
    if (aChecked && !bChecked) return -1;
    if (!aChecked && bChecked) return 1;
    return a.id.localeCompare(b.id);
  });
}

function getUtTriggerText(selectedIds = []) {
  const ids = ensureUtIdsArray(selectedIds);
  if (ids.length === 0) {
    return '<span style="color: var(--text-muted);">-- 작업대상 선택 --</span>';
  }
  const firstId = ids[0];
  const item = ALL_TARGET_ITEMS.find(e => e.id === firstId);
  const firstName = item ? item.name.split(' (')[0] : firstId;

  if (ids.length === 1) {
    return `[${escapeHtml(firstId)}] ${escapeHtml(firstName)}`;
  }
  return `[${escapeHtml(firstId)}] ${escapeHtml(firstName)} 외 ${ids.length - 1}건`;
}

function createUtDropdownHtml(rowId, selectedIds = [], currentType = '', currentSubcat = '') {
  const ids = ensureUtIdsArray(selectedIds);
  if (!rowCategoryTabs[rowId]) {
    rowCategoryTabs[rowId] = getRecommendedCategory(currentType, currentSubcat);
  }
  const activeCategory = rowCategoryTabs[rowId];
  const triggerText = getUtTriggerText(ids);
  const sortedOptions = getSortedUtOptions(ids, activeCategory);

  const optionsHtml = sortedOptions.map(e => {
    const isChecked = ids.includes(e.id);
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
      <div class="ut-dropdown-trigger open" data-id="${rowId}">
        <span class="ut-trigger-text">${triggerText}</span>
        <span class="ut-trigger-arrow">▾</span>
      </div>
      <div class="ut-dropdown-menu" id="utMenu-${rowId}">
        <div class="ut-category-tabs">
          <button type="button" class="ut-tab-btn ${activeCategory === '설비' ? 'active' : ''}" data-row-id="${rowId}" data-cat="설비">설비</button>
          <button type="button" class="ut-tab-btn ${activeCategory === '자재입출고' ? 'active' : ''}" data-row-id="${rowId}" data-cat="자재입출고">자재입출고</button>
          <button type="button" class="ut-tab-btn ${activeCategory === '시설/인프라' ? 'active' : ''}" data-row-id="${rowId}" data-cat="시설/인프라">시설/인프라</button>
          <button type="button" class="ut-tab-btn ${activeCategory === '전체' ? 'active' : ''}" data-row-id="${rowId}" data-cat="전체">전체</button>
        </div>
        <div class="ut-search-wrapper">
          <input type="text" class="ut-search-input" data-id="${rowId}" placeholder="설비/자재명 검색..." autocomplete="off">
        </div>
        <div class="ut-options-list" id="utList-${rowId}">
          ${optionsHtml}
        </div>
        <div class="ut-dropdown-footer">
          <div>
            <button type="button" class="btn-text btn-ut-all" data-id="${rowId}">전체선택</button>
            <button type="button" class="btn-text btn-clear btn-ut-clear" data-id="${rowId}">선택해제</button>
          </div>
          <button type="button" class="btn-ut-close" data-id="${rowId}">확인</button>
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

  const selectedIds = ensureUtIdsArray(row.utIds);
  const activeCategory = rowCategoryTabs[rowId] || getRecommendedCategory(row.type, row.subcat);
  const sortedOptions = getSortedUtOptions(selectedIds, activeCategory, keyword);

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

  row.utIds = ensureUtIdsArray(row.utIds);

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
    const itemUtIds = ensureUtIdsArray(item.utIds || item.utId);
    if (filterSite && item.site !== filterSite) return false;
    if (filterType && item.type !== filterType) return false;
    if (filterSubcatVal && item.subcat !== filterSubcatVal) return false;
    if (filterUtIdVal && !itemUtIds.includes(filterUtIdVal)) return false;

    if (global.site && item.site !== global.site) return false;
    if (global.deptOrType && ['PM','BM','CM','자재입출고'].includes(global.deptOrType) && item.type !== global.deptOrType) return false;

    const kw = global.keyword || searchKeyword;
    if (kw) {
      const matchSite = (item.site || '').toLowerCase().includes(kw);
      const matchFab = (item.fab || '').toLowerCase().includes(kw);
      const matchType = (item.type || '').toLowerCase().includes(kw);
      const matchSubcat = (item.subcat || '').toLowerCase().includes(kw);
      const matchContent = (item.content || '').toLowerCase().includes(kw);
      const matchTarget = itemUtIds.some(utId => {
        const targetItem = ALL_TARGET_ITEMS.find(e => e.id === utId);
        return targetItem ? (targetItem.name || '').toLowerCase().includes(kw) || (targetItem.id || '').toLowerCase().includes(kw) : false;
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
    try {
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
            ${createUtDropdownHtml(item.id, item.utIds, item.type, item.subcat)}
          ` : `<div class="cell-text-view ut-badge-container" data-id="${item.id}" data-field="utIds" title="클릭 시 드롭다운 선택">${renderUtBadges(item.utIds)}</div>`}
        </td>
        <td class="col-content">
          ${isEditingContent ? `<textarea class="table-input edit-control" data-id="${item.id}" data-field="content">${escapeHtml(item.content)}</textarea>` : `<div class="cell-text-view" data-id="${item.id}" data-field="content">${escapeHtml(item.content)}</div>`}
        </td>
        <td class="col-img center">${imageCellHtml}</td>
        <td class="col-action center"><button type="button" class="btn btn-sm btn-danger-outline btn-delete-row" data-id="${item.id}">삭제</button></td>
      `;
      tbody.appendChild(tr);
    } catch (err) {
      console.error('Error rendering schedule row:', item, err);
    }
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
      // 0. Category Tab Clicked inside dropdown
      const tabBtn = e.target.closest('.ut-tab-btn');
      if (tabBtn) {
        e.stopPropagation();
        const rowId = tabBtn.dataset.rowId;
        const cat = tabBtn.dataset.cat;
        rowCategoryTabs[rowId] = cat;

        const menu = document.getElementById(`utMenu-${rowId}`);
        if (menu) {
          menu.querySelectorAll('.ut-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.cat === cat);
          });
        }
        const searchInput = document.querySelector(`#utMenu-${rowId} .ut-search-input`);
        updateUtOptionsList(rowId, searchInput ? searchInput.value : '');
        return;
      }

      // 0-1. Dropdown Close / Done Button
      const closeBtn = e.target.closest('.btn-ut-close');
      if (closeBtn) {
        e.stopPropagation();
        editingCell = null;
        renderScheduleTable();
        return;
      }

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
          const activeCat = rowCategoryTabs[rowId] || getRecommendedCategory(row.type, row.subcat);
          const currentCatItems = getSortedUtOptions([], activeCat).map(i => i.id);
          row.utIds = Array.from(new Set([...(row.utIds || []), ...currentCatItems]));
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
        const rowId = cellView.dataset.id;
        const field = cellView.dataset.field;
        const row = schedules.find(r => r.id === rowId);
        if (row) {
          // Sync recommended target category when opening utIds cell
          rowCategoryTabs[rowId] = getRecommendedCategory(row.type, row.subcat);
        }
        editingCell = { rowId, field };
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

    // File Input Upload Event Handler & Edit Controls Change Handler
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
          if (field === 'type' || field === 'subcat') {
            if (target[field] !== directControl.value) {
              target[field] = directControl.value;
              target.utIds = []; // 작업유형/작업구분 변경 시 작업대상 초기화!
              rowCategoryTabs[target.id] = getRecommendedCategory(target.type, target.subcat);
            }
          } else if (field === 'utIds') {
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
          if (field === 'type' || field === 'subcat') {
            if (target[field] !== editControl.value) {
              target[field] = editControl.value;
              target.utIds = []; // 작업유형/작업구분 변경 시 작업대상 초기화!
              rowCategoryTabs[target.id] = getRecommendedCategory(target.type, target.subcat);
            }
          } else if (field === 'utIds') {
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

  // Close active cell edit / UT dropdown on click outside (focus-out)
  document.addEventListener('click', (e) => {
    if (editingCell) {
      const isInsideDropdown = e.target.closest('.custom-ut-dropdown');
      const isInsideEdit = e.target.closest('.edit-control');
      const isCellView = e.target.closest('.cell-text-view');
      if (!isInsideDropdown && !isInsideEdit && !isCellView) {
        editingCell = null;
        renderScheduleTable();
      }
    }
  });
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
