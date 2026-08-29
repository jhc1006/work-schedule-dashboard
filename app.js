// ==========================================================================
// Work Schedule Application Data & State
// ==========================================================================

const UT_EQUIPMENT_LIST = [
  { id: 'UT-VAC-101', name: '진공펌프 1호기 (Main Vacuum Pump)' },
  { id: 'UT-CHL-204', name: '칠러 Unit-A (Cooling Chiller)' },
  { id: 'UT-SCR-302', name: '배기 스크러버 #2 (Gas Scrubber)' },
  { id: 'UT-UPW-105', name: '초순수 공급기 (UPW Supply Unit)' },
  { id: 'UT-AHU-401', name: '클린룸 공조기 (AHU-3)' },
  { id: 'UT-GAS-503', name: '특수가스 공급 밸브 (N2/Ar Valve Box)' },
  { id: 'UT-CMP-601', name: '에어 컴프레셔 (Air Compressor #1)' }
];

const INITIAL_SCHEDULE_DATA = [
  {
    id: 'row-1',
    site: '이천',
    fab: 'M15',
    type: 'PM',
    subcat: '정기 점검',
    utIds: ['UT-VAC-101'],
    content: '주 분기 정기 예방보전 점검 및 오일 레벨/압력 편차 계측'
  },
  {
    id: 'row-2',
    site: '이천',
    fab: 'M16',
    type: 'BM',
    subcat: '긴급 조치',
    utIds: ['UT-CHL-204', 'UT-CMP-601'],
    content: '냉매 순환 펌프 이상 진동 감지 및 커플링 교체'
  },
  {
    id: 'row-3',
    site: '청주',
    fab: 'M14',
    type: 'CM',
    subcat: '개선 개조',
    utIds: ['UT-SCR-302'],
    content: '배기 가스 세정 노즐 업그레이드 및 차압 센서 캘리브레이션'
  },
  {
    id: 'row-4',
    site: '이천',
    fab: 'M15',
    type: 'PM',
    subcat: '정기 점검',
    utIds: ['UT-AHU-401'],
    content: 'HEPA 필터 차압 확인 및 급기 송풍기 벨트 텐션 측정'
  },
  {
    id: 'row-5',
    site: '청주',
    fab: 'M15',
    type: '점검',
    subcat: '일상 순회',
    utIds: ['UT-UPW-105', 'UT-GAS-503'],
    content: '공급 배관 밸브 리크 육안 검사 및 비저항치 모니터링'
  }
];

const STORAGE_KEY = 'SK_WORK_SCHEDULE_DATA_V3';

let schedules = [];
let selectedRowIds = new Set();

// Tracks currently active editing cell: { rowId: string, field: string } | null
let editingCell = null;

// ==========================================================================
// Initialization
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  renderTable();
  initEventListeners();
});

function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      schedules = parsed.map(item => ({
        ...item,
        utIds: Array.isArray(item.utIds) ? item.utIds : (item.utId ? [item.utId] : [])
      }));
    } catch (e) {
      console.error('Failed to parse saved data, resetting to initial', e);
      schedules = [...INITIAL_SCHEDULE_DATA];
    }
  } else {
    schedules = [...INITIAL_SCHEDULE_DATA];
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
  updateStats();
}

// ==========================================================================
// Text Mode Badges & Helpers
// ==========================================================================

function getWorkTypeBadge(type) {
  switch (type) {
    case 'PM':
      return '<span class="badge badge-pm">PM (예방보전)</span>';
    case 'BM':
      return '<span class="badge badge-bm">BM (고장보전)</span>';
    case 'CM':
      return '<span class="badge badge-cm">CM (개량보전)</span>';
    default:
      return `<span class="badge badge-inspection">${escapeHtml(type)}</span>`;
  }
}

function renderUtBadges(selectedIds = []) {
  if (!selectedIds || selectedIds.length === 0) {
    return '<span class="text-placeholder">+ 설비(UT ID) 선택</span>';
  }

  return selectedIds.map(id => {
    const equip = UT_EQUIPMENT_LIST.find(e => e.id === id);
    const name = equip ? equip.name.split(' (')[0] : id;
    return `
      <span class="ut-chip">
        <span class="ut-chip-id">${id}</span>
        <span>${escapeHtml(name)}</span>
      </span>
    `;
  }).join('');
}

// ==========================================================================
// Custom Dropdown Helper Functions
// ==========================================================================

function getSortedUtOptions(selectedIds = [], keyword = '') {
  let list = [...UT_EQUIPMENT_LIST];
  if (keyword) {
    const kw = keyword.toLowerCase();
    list = list.filter(item => item.name.toLowerCase().includes(kw) || item.id.toLowerCase().includes(kw));
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
    return '<span style="color: var(--text-light);">-- 설비명 선택 --</span>';
  }
  const firstId = selectedIds[0];
  const equip = UT_EQUIPMENT_LIST.find(e => e.id === firstId);
  const firstName = equip ? equip.name.split(' (')[0] : firstId;

  if (selectedIds.length === 1) {
    return firstName;
  }
  return `${firstName} 외 ${selectedIds.length - 1}건`;
}

function createUtDropdownHtml(rowId, selectedIds) {
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
          <input type="text" class="ut-search-input" data-id="${rowId}" placeholder="설비명 / ID 검색..." autocomplete="off">
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

// ==========================================================================
// Render Table Logic
// ==========================================================================

function renderTable() {
  const tbody = document.getElementById('scheduleTableBody');
  const searchKeyword = document.getElementById('searchInput').value.trim().toLowerCase();
  const filterSite = document.getElementById('filterSite').value;
  const filterType = document.getElementById('filterType').value;

  // Filter items
  const filtered = schedules.filter(item => {
    if (filterSite && item.site !== filterSite) return false;
    if (filterType && item.type !== filterType) return false;
    if (searchKeyword) {
      const matchSite = item.site.toLowerCase().includes(searchKeyword);
      const matchFab = item.fab.toLowerCase().includes(searchKeyword);
      const matchType = item.type.toLowerCase().includes(searchKeyword);
      const matchSubcat = item.subcat.toLowerCase().includes(searchKeyword);
      const matchContent = item.content.toLowerCase().includes(searchKeyword);
      
      const matchUt = (item.utIds || []).some(utId => {
        const equip = UT_EQUIPMENT_LIST.find(e => e.id === utId);
        return equip ? equip.name.toLowerCase().includes(searchKeyword) || equip.id.toLowerCase().includes(searchKeyword) : false;
      });

      if (!matchSite && !matchFab && !matchType && !matchSubcat && !matchContent && !matchUt) {
        return false;
      }
    }
    return true;
  });

  tbody.innerHTML = '';

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-placeholder">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <p>해당 조건에 일치하는 작업 일정이 없습니다.</p>
        </td>
      </tr>
    `;
    updateStats(filtered.length);
    return;
  }

  filtered.forEach((item) => {
    const tr = document.createElement('tr');
    tr.dataset.id = item.id;
    const isChecked = selectedRowIds.has(item.id);

    // Check which cell is currently being edited in this row
    const isEditingSite = editingCell && editingCell.rowId === item.id && editingCell.field === 'site';
    const isEditingFab = editingCell && editingCell.rowId === item.id && editingCell.field === 'fab';
    const isEditingType = editingCell && editingCell.rowId === item.id && editingCell.field === 'type';
    const isEditingSubcat = editingCell && editingCell.rowId === item.id && editingCell.field === 'subcat';
    const isEditingUt = editingCell && editingCell.rowId === item.id && editingCell.field === 'utIds';
    const isEditingContent = editingCell && editingCell.rowId === item.id && editingCell.field === 'content';

    tr.innerHTML = `
      <td class="col-select center">
        <input type="checkbox" class="row-checkbox" data-id="${item.id}" ${isChecked ? 'checked' : ''} aria-label="행 선택">
      </td>

      <!-- Site Cell -->
      <td class="col-site">
        ${isEditingSite ? `
          <select class="table-select edit-control field-site" data-id="${item.id}" data-field="site">
            <option value="이천" ${item.site === '이천' ? 'selected' : ''}>이천</option>
            <option value="청주" ${item.site === '청주' ? 'selected' : ''}>청주</option>
            <option value="용인" ${item.site === '용인' ? 'selected' : ''}>용인</option>
            <option value="화성" ${item.site === '화성' ? 'selected' : ''}>화성</option>
          </select>
        ` : `
          <div class="cell-text-view" data-id="${item.id}" data-field="site">
            ${escapeHtml(item.site)}
          </div>
        `}
      </td>

      <!-- FAB Cell -->
      <td class="col-fab">
        ${isEditingFab ? `
          <input type="text" class="table-input edit-control field-fab" data-id="${item.id}" data-field="fab" value="${escapeHtml(item.fab)}" placeholder="FAB">
        ` : `
          <div class="cell-text-view" data-id="${item.id}" data-field="fab">
            ${escapeHtml(item.fab) || '<span class="text-placeholder">입력</span>'}
          </div>
        `}
      </td>

      <!-- 작업유형 Cell -->
      <td class="col-type">
        ${isEditingType ? `
          <select class="table-select edit-control field-type" data-id="${item.id}" data-field="type">
            <option value="PM" ${item.type === 'PM' ? 'selected' : ''}>PM (예방보전)</option>
            <option value="BM" ${item.type === 'BM' ? 'selected' : ''}>BM (고장보전)</option>
            <option value="CM" ${item.type === 'CM' ? 'selected' : ''}>CM (개량보전)</option>
            <option value="점검" ${item.type === '점검' ? 'selected' : ''}>정기 점검</option>
          </select>
        ` : `
          <div class="cell-text-view" data-id="${item.id}" data-field="type">
            ${getWorkTypeBadge(item.type)}
          </div>
        `}
      </td>

      <!-- 작업구분 Cell -->
      <td class="col-subcat">
        ${isEditingSubcat ? `
          <input type="text" class="table-input edit-control field-subcat" data-id="${item.id}" data-field="subcat" value="${escapeHtml(item.subcat)}" placeholder="작업구분">
        ` : `
          <div class="cell-text-view" data-id="${item.id}" data-field="subcat">
            ${escapeHtml(item.subcat) || '<span class="text-placeholder">입력</span>'}
          </div>
        `}
      </td>

      <!-- UT ID Cell -->
      <td class="col-utid">
        ${isEditingUt ? `
          ${createUtDropdownHtml(item.id, item.utIds || [])}
        ` : `
          <div class="cell-text-view ut-badge-container" data-id="${item.id}" data-field="utIds">
            ${renderUtBadges(item.utIds)}
          </div>
        `}
      </td>

      <!-- 작업 내용 Cell -->
      <td class="col-content">
        ${isEditingContent ? `
          <textarea class="table-textarea edit-control field-content" data-id="${item.id}" data-field="content" rows="3" placeholder="작업 상세 내용을 입력하세요...">${escapeHtml(item.content)}</textarea>
        ` : `
          <div class="cell-text-view" data-id="${item.id}" data-field="content">
            ${escapeHtml(item.content) || '<span class="text-placeholder">작업 상세 내용 입력...</span>'}
          </div>
        `}
      </td>

      <!-- Action Cell -->
      <td class="col-action center">
        <button type="button" class="btn-icon-delete" data-id="${item.id}" title="행 삭제">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Focus control if editing
  if (editingCell) {
    setTimeout(() => {
      if (editingCell.field === 'utIds') {
        const searchInput = document.querySelector(`#utMenu-${editingCell.rowId} .ut-search-input`);
        if (searchInput) searchInput.focus();
      } else {
        const control = document.querySelector(`.edit-control[data-id="${editingCell.rowId}"][data-field="${editingCell.field}"]`);
        if (control) control.focus();
      }
    }, 30);
  }

  updateStats(filtered.length);
}

function updateStats(filteredCount = schedules.length) {
  const totalCountEl = document.getElementById('totalCount');
  const visibleCountEl = document.getElementById('visibleCount');
  const selectedCountEl = document.getElementById('selectedCount');

  if (totalCountEl) totalCountEl.textContent = schedules.length;
  if (visibleCountEl) visibleCountEl.textContent = filteredCount;
  if (selectedCountEl) selectedCountEl.textContent = selectedRowIds.size;

  const selectAllCheckbox = document.getElementById('selectAll');
  if (selectAllCheckbox) {
    selectAllCheckbox.checked = schedules.length > 0 && selectedRowIds.size === schedules.length;
  }
}

// ==========================================================================
// Custom UT ID Dropdown Interactivity
// ==========================================================================

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

  saveData();

  // Re-render trigger text and sorted options
  const triggerTextEl = document.querySelector(`.custom-ut-dropdown[data-id="${rowId}"] .ut-trigger-text`);
  if (triggerTextEl) {
    triggerTextEl.innerHTML = getUtTriggerText(row.utIds);
  }

  const searchInput = document.querySelector(`#utMenu-${rowId} .ut-search-input`);
  const kw = searchInput ? searchInput.value.trim() : '';
  updateUtOptionsList(rowId, kw);
}

// ==========================================================================
// Event Listeners & Cell Mode Switching
// ==========================================================================

function initEventListeners() {
  // Search & Filters
  document.getElementById('searchInput').addEventListener('input', () => {
    editingCell = null;
    renderTable();
  });
  document.getElementById('filterSite').addEventListener('change', () => {
    editingCell = null;
    renderTable();
  });
  document.getElementById('filterType').addEventListener('change', () => {
    editingCell = null;
    renderTable();
  });

  // Global Outside Click listener to close cell editing
  document.addEventListener('click', (e) => {
    if (!editingCell) return;

    // Check if click was inside current editing cell or custom UT menu
    const insideCellView = e.target.closest(`.cell-text-view[data-id="${editingCell.rowId}"][data-field="${editingCell.field}"]`);
    const insideEditControl = e.target.closest(`.edit-control[data-id="${editingCell.rowId}"]`);
    const insideUtDropdown = e.target.closest(`.custom-ut-dropdown[data-id="${editingCell.rowId}"]`);

    if (!insideCellView && !insideEditControl && !insideUtDropdown) {
      commitCellEditing();
    }
  });

  const tbody = document.getElementById('scheduleTableBody');

  // Cell Click -> Switch to Edit Mode
  tbody.addEventListener('click', (e) => {
    // 1. Text View Cell Clicked
    const cellView = e.target.closest('.cell-text-view');
    if (cellView) {
      e.stopPropagation();
      const rowId = cellView.dataset.id;
      const field = cellView.dataset.field;
      editingCell = { rowId, field };
      renderTable();
      return;
    }

    // 2. UT ID Option Item Clicked inside dropdown
    const optionItem = e.target.closest('.ut-option-item');
    if (optionItem) {
      e.stopPropagation();
      const rowId = optionItem.dataset.rowId;
      const utId = optionItem.dataset.utId;
      toggleUtItemSelection(rowId, utId);
      return;
    }

    // 3. Select All Button in Dropdown Footer
    const btnAll = e.target.closest('.btn-ut-all');
    if (btnAll) {
      e.stopPropagation();
      const rowId = btnAll.dataset.id;
      const row = schedules.find(r => r.id === rowId);
      if (row) {
        row.utIds = UT_EQUIPMENT_LIST.map(item => item.id);
        saveData();
        updateUtOptionsList(rowId);
      }
      return;
    }

    // 4. Clear Selection Button in Dropdown Footer
    const btnClear = e.target.closest('.btn-ut-clear');
    if (btnClear) {
      e.stopPropagation();
      const rowId = btnClear.dataset.id;
      const row = schedules.find(r => r.id === rowId);
      if (row) {
        row.utIds = [];
        saveData();
        updateUtOptionsList(rowId);
      }
      return;
    }

    // 5. Delete Button
    const btnDelete = e.target.closest('.btn-icon-delete');
    if (btnDelete) {
      const rowId = btnDelete.dataset.id;
      deleteRow(rowId);
      return;
    }
  });

  // Search input inside UT Dropdown
  tbody.addEventListener('input', (e) => {
    if (e.target.classList.contains('ut-search-input')) {
      const rowId = e.target.dataset.id;
      updateUtOptionsList(rowId, e.target.value.trim());
    }
  });

  // Commit changes on Select Change or Input Enter key
  tbody.addEventListener('change', (e) => {
    const target = e.target;

    if (target.classList.contains('row-checkbox')) {
      const rowId = target.dataset.id;
      if (target.checked) {
        selectedRowIds.add(rowId);
      } else {
        selectedRowIds.delete(rowId);
      }
      updateStats();
      return;
    }

    if (target.classList.contains('field-site')) {
      const row = schedules.find(r => r.id === target.dataset.id);
      if (row) row.site = target.value;
      commitCellEditing('사이트가 변경되었습니다.');
    } else if (target.classList.contains('field-type')) {
      const row = schedules.find(r => r.id === target.dataset.id);
      if (row) row.type = target.value;
      commitCellEditing('작업유형이 변경되었습니다.');
    }
  });

  tbody.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      // textarea에서는 Enter 누르면 일반 줄바꿈(포커스 유지), 탈출/저장은 바깥 클릭이나 Escape로 처리
      if (e.target.tagName.toLowerCase() === 'textarea') {
        // Do not prevent default, allow standard newline in textarea without losing focus
        return;
      } else if (e.target.classList.contains('edit-control')) {
        e.preventDefault();
        commitCellEditing();
      }
    } else if (e.key === 'Escape') {
      editingCell = null;
      renderTable();
    }
  });

  // Select All Checkbox
  document.getElementById('selectAll').addEventListener('change', (e) => {
    if (e.target.checked) {
      schedules.forEach(item => selectedRowIds.add(item.id));
    } else {
      selectedRowIds.clear();
    }
    renderTable();
  });

  // Action Buttons
  document.getElementById('btnAddRow').addEventListener('click', () => {
    openModal();
  });

  document.getElementById('btnQuickAdd').addEventListener('click', () => {
    quickAddRow();
  });

  document.getElementById('btnDeleteSelected').addEventListener('click', () => {
    deleteSelectedRows();
  });

  document.getElementById('btnExportCsv').addEventListener('click', () => {
    exportToCsv();
  });

  document.getElementById('btnResetData').addEventListener('click', () => {
    if (confirm('샘플 기본 데이터로 초기화하시겠습니까?')) {
      schedules = [...INITIAL_SCHEDULE_DATA];
      selectedRowIds.clear();
      editingCell = null;
      saveData();
      renderTable();
      showToast('초기 데이터로 복원되었습니다.');
    }
  });

  setupModal();
}

function commitCellEditing(toastMsg = null) {
  if (!editingCell) return;

  const { rowId, field } = editingCell;
  const row = schedules.find(r => r.id === rowId);

  if (row) {
    const control = document.querySelector(`.edit-control[data-id="${rowId}"][data-field="${field}"]`);
    if (control) {
      if (field === 'fab') row.fab = control.value.trim();
      else if (field === 'subcat') row.subcat = control.value.trim();
      else if (field === 'content') row.content = control.value.trim();
    }
    saveData();
  }

  editingCell = null;
  renderTable();
  if (toastMsg) showToast(toastMsg);
}

// ==========================================================================
// Row Actions
// ==========================================================================

function quickAddRow() {
  const newRow = {
    id: 'row-' + Date.now(),
    site: '이천',
    fab: 'M15',
    type: 'PM',
    subcat: '정기 점검',
    utIds: ['UT-VAC-101'],
    content: ''
  };

  schedules.unshift(newRow);
  saveData();

  // Set the new row's content field into edit mode automatically
  editingCell = { rowId: newRow.id, field: 'content' };
  renderTable();
  showToast('새로운 작업 행이 추가되었습니다.');
}

function deleteRow(rowId) {
  if (editingCell && editingCell.rowId === rowId) editingCell = null;
  schedules = schedules.filter(r => r.id !== rowId);
  selectedRowIds.delete(rowId);
  saveData();
  renderTable();
  showToast('행이 삭제되었습니다.');
}

function deleteSelectedRows() {
  if (selectedRowIds.size === 0) {
    alert('삭제할 행을 선택해주세요.');
    return;
  }

  if (confirm(`선택한 ${selectedRowIds.size}개 항목을 삭제하시겠습니까?`)) {
    schedules = schedules.filter(r => !selectedRowIds.has(r.id));
    selectedRowIds.clear();
    editingCell = null;
    saveData();
    renderTable();
    showToast('선택한 행들이 삭제되었습니다.');
  }
}

// ==========================================================================
// Modal Logic for Detailed Addition
// ==========================================================================

function setupModal() {
  const overlay = document.getElementById('modalOverlay');
  const btnClose = document.getElementById('btnModalClose');
  const btnCancel = document.getElementById('btnModalCancel');
  const form = document.getElementById('addRowForm');

  const utSelect = document.getElementById('modalUtId');
  utSelect.innerHTML = UT_EQUIPMENT_LIST.map(e => `<option value="${e.id}">${e.name}</option>`).join('');

  const close = () => {
    overlay.classList.remove('active');
    form.reset();
  };

  btnClose.addEventListener('click', close);
  btnCancel.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedUtOptions = Array.from(utSelect.selectedOptions).map(opt => opt.value);

    const newRow = {
      id: 'row-' + Date.now(),
      site: document.getElementById('modalSite').value,
      fab: document.getElementById('modalFab').value.trim() || 'M15',
      type: document.getElementById('modalType').value,
      subcat: document.getElementById('modalSubcat').value.trim() || '정기 점검',
      utIds: selectedUtOptions.length > 0 ? selectedUtOptions : ['UT-VAC-101'],
      content: document.getElementById('modalContent').value.trim()
    };

    schedules.unshift(newRow);
    editingCell = null;
    saveData();
    renderTable();
    close();
    showToast('신규 작업 일정이 성공적으로 등록되었습니다.');
  });
}

function openModal() {
  document.getElementById('modalOverlay').classList.add('active');
  document.getElementById('modalContent').focus();
}

// ==========================================================================
// CSV Export
// ==========================================================================

function exportToCsv() {
  if (schedules.length === 0) {
    alert('내보낼 데이터가 없습니다.');
    return;
  }

  const headers = ['Site', 'FAB', '작업유형', '작업구분', 'UT ID 목록', '설비명 목록', '작업 내용'];
  const rows = schedules.map(item => {
    const utIdsStr = (item.utIds || []).join('; ');
    const equipNames = (item.utIds || []).map(id => {
      const equip = UT_EQUIPMENT_LIST.find(e => e.id === id);
      return equip ? equip.name : id;
    }).join('; ');

    return [
      `"${item.site}"`,
      `"${item.fab}"`,
      `"${item.type}"`,
      `"${item.subcat}"`,
      `"${utIdsStr}"`,
      `"${equipNames}"`,
      `"${item.content.replace(/"/g, '""')}"`
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `작업일정목록_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('CSV 파일이 다운로드되었습니다.');
}

// ==========================================================================
// Utilities
// ==========================================================================

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function showToast(msg) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
    <span>${msg}</span>
  `;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
