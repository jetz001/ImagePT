// Main Application Logic for ImagePT AI Studio

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    activeCategory: 'person',
    selectedTags: {}, // { [groupId]: Set of string values }
    customText: '',
    activeAspect: '16:9',
    nsfwMode: localStorage.getItem('imagept_nsfw') === 'true',
    negativeActive: localStorage.getItem('imagept_neg_active') !== 'false',
    selectedNegativePresets: new Set(['anatomy', 'hands', 'face', 'quality', 'watermark']),
    customNegativeText: '',
    favorites: JSON.parse(localStorage.getItem('imagept_favorites') || '[]'),
    history: JSON.parse(localStorage.getItem('imagept_history') || '[]'),
    currentImageBuffer: null,
    currentImageMime: '',
    currentImageBase64: '',
    timeSliderSettings: {}
  };

  // DOM Elements
  const sidebarNav = document.getElementById('sidebarNav');
  const catTitle = document.getElementById('catTitle');
  const catIcon = document.getElementById('catIcon');
  const catName = document.getElementById('catName');
  const catDesc = document.getElementById('catDesc');
  const optionGroupsContainer = document.getElementById('optionGroupsContainer');
  const customPromptInput = document.getElementById('customPromptInput');
  const aspectChipsContainer = document.getElementById('aspectChipsContainer');
  const livePositivePreview = document.getElementById('livePositivePreview');
  const liveNegativePreview = document.getElementById('liveNegativePreview');
  const negPreviewBox = document.getElementById('negPreviewBox');
  const promptCharCount = document.getElementById('promptCharCount');

  // Buttons & Controls
  const nsfwToggle = document.getElementById('nsfwToggle');
  const nsfwToggleWrapper = document.getElementById('nsfwToggleWrapper');
  const negToggle = document.getElementById('negToggle');
  const btnCopyPrompt = document.getElementById('btnCopyPrompt');
  const btnCopyNegative = document.getElementById('btnCopyNegative');
  const btnCopyNegInline = document.getElementById('btnCopyNegInline');
  const btnFavorite = document.getElementById('btnFavorite');
  const btnRandomize = document.getElementById('btnRandomize');
  const btnClear = document.getElementById('btnClear');
  const btnAutofill = document.getElementById('btnAutofill');
  const autofillInput = document.getElementById('autofillInput');

  // Modals
  const settingsModal = document.getElementById('settingsModal');
  const btnSettings = document.getElementById('btnSettings');
  const btnCloseSettings = document.getElementById('btnCloseSettings');
  const btnSaveSettings = document.getElementById('btnSaveSettings');
  const settingProvider = document.getElementById('settingProvider');
  const settingApiKey = document.getElementById('settingApiKey');
  const settingModel = document.getElementById('settingModel');
  const settingBaseUrl = document.getElementById('settingBaseUrl');

  const imagePromptModal = document.getElementById('imagePromptModal');
  const btnOpenImagePrompt = document.getElementById('btnOpenImagePrompt');
  const btnCloseImageModal = document.getElementById('btnCloseImageModal');
  const filePickerInput = document.getElementById('filePickerInput');
  const btnChooseImage = document.getElementById('btnChooseImage');
  const imagePreviewImg = document.getElementById('imagePreviewImg');
  const imagePlaceholder = document.getElementById('imagePlaceholder');
  const imageMetadataStatus = document.getElementById('imageMetadataStatus');
  const btnAnalyzeVisionAI = document.getElementById('btnAnalyzeVisionAI');
  const extractedPositive = document.getElementById('extractedPositive');
  const extractedNegative = document.getElementById('extractedNegative');
  const btnCopyExtracted = document.getElementById('btnCopyExtracted');
  const btnLoadToBuilder = document.getElementById('btnLoadToBuilder');

  const historyModal = document.getElementById('historyModal');
  const btnHistory = document.getElementById('btnHistory');
  const btnCloseHistory = document.getElementById('btnCloseHistory');
  const tabFavorites = document.getElementById('tabFavorites');
  const tabHistory = document.getElementById('tabHistory');
  const historyListContainer = document.getElementById('historyListContainer');
  let activeHistoryTab = 'favorites';

  const dropOverlay = document.getElementById('dropOverlay');
  const toastContainer = document.getElementById('toastContainer');

  // Toast Notification System
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = '✨';
    if (type === 'success') icon = '✅';
    if (type === 'warn') icon = '⚠️';
    if (type === 'info') icon = 'ℹ️';

    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  // Clipboard Copy Handler
  async function copyText(text, label = 'Prompt') {
    if (!text || !text.trim()) {
      showToast('ไม่มีข้อความให้คัดลอก', 'warn');
      return;
    }

    try {
      if (window.electronAPI && window.electronAPI.copyToClipboard) {
        await window.electronAPI.copyToClipboard(text);
      } else {
        await navigator.clipboard.writeText(text);
      }
      showToast(`คัดลอก ${label} เรียบร้อยแล้ว!`, 'success');

      // Add to recent history
      addToHistory(state.activeCategory, text, getAssembledNegativePrompt());
    } catch (err) {
      console.error('Clipboard copy error:', err);
      showToast('ไม่สามารถคัดลอกได้: ' + err.message, 'warn');
    }
  }

  // Load Saved AI Settings
  function getAISettings() {
    return {
      provider: localStorage.getItem('imagept_ai_provider') || 'gemini',
      apiKey: localStorage.getItem('imagept_ai_apikey') || '',
      model: localStorage.getItem('imagept_ai_model') || '',
      baseUrl: localStorage.getItem('imagept_ai_baseurl') || ''
    };
  }

  function saveAISettings(settings) {
    localStorage.setItem('imagept_ai_provider', settings.provider);
    localStorage.setItem('imagept_ai_apikey', settings.apiKey);
    localStorage.setItem('imagept_ai_model', settings.model);
    localStorage.setItem('imagept_ai_baseurl', settings.baseUrl);
    showToast('บันทึกการตั้งค่า AI เรียบร้อยแล้ว', 'success');
  }

  // Render Sidebar
  function renderSidebar() {
    sidebarNav.innerHTML = '<div class="sidebar-heading">หมวดหมู่รูปภาพ (Categories)</div>';

    const categoriesList = Object.values(CATEGORIES);
    for (const cat of categoriesList) {
      // Hide NSFW exclusive tab if NSFW mode is disabled
      if (cat.nsfwOnly && !state.nsfwMode) continue;

      const navItem = document.createElement('div');
      navItem.className = `category-nav-item ${cat.id === state.activeCategory ? 'active' : ''} ${cat.nsfwOnly ? 'nsfw-item' : ''}`;
      navItem.innerHTML = `
        <span class="category-icon">${cat.icon}</span>
        <span>${cat.title}</span>
      `;

      navItem.addEventListener('click', () => {
        state.activeCategory = cat.id;
        renderSidebar();
        renderCategory(cat.id);
      });

      sidebarNav.appendChild(navItem);
    }
  }

  // 24-Hour Time Mapping Function
  function getTimeInfo(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

    if (totalMinutes < 300) {
      return {
        timeStr,
        icon: '🌌',
        desc: 'ดึกสงัด / เที่ยงคืน (Deep Midnight)',
        prompt: `at deep midnight ${timeStr}, dark starry atmospheric night sky`
      };
    } else if (totalMinutes < 360) {
      return {
        timeStr,
        icon: '🌌',
        desc: 'บลูอาวร์ก่อนรุ่งสาง (Blue Hour Twilight)',
        prompt: `during blue hour twilight at ${timeStr}, cool moody pre-dawn ambient illumination`
      };
    } else if (totalMinutes < 480) {
      return {
        timeStr,
        icon: '🌅',
        desc: 'พระอาทิตย์ขึ้น / เช้าตรู่ (Golden Sunrise)',
        prompt: `during radiant golden sunrise dawn at ${timeStr}, warm rising sunbeams`
      };
    } else if (totalMinutes < 720) {
      return {
        timeStr,
        icon: '☀️',
        desc: 'ยามเช้าแดดสดใส (Crisp Morning Daylight)',
        prompt: `during bright crisp morning daylight at ${timeStr}, fresh clear natural sun illumination`
      };
    } else if (totalMinutes < 840) {
      return {
        timeStr,
        icon: '☀️',
        desc: 'เที่ยงวันแดดจ้า (High Noon Direct Sun)',
        prompt: `at bright high noon ${timeStr}, brilliant overhead direct sun illumination`
      };
    } else if (totalMinutes < 1020) {
      return {
        timeStr,
        icon: '🌤️',
        desc: 'บ่ายคล้อยแดดอุ่น (Warm Afternoon Light)',
        prompt: `on a warm sun-drenched afternoon at ${timeStr}, soft angled warm daylight`
      };
    } else if (totalMinutes < 1140) {
      return {
        timeStr,
        icon: '🌇',
        desc: 'โกลเด้นอาวร์ / พระอาทิตย์ตกดิน (Golden Hour Sunset)',
        prompt: `during magical golden hour sunset at ${timeStr}, fiery warm rim light, radiant sun flare`
      };
    } else if (totalMinutes < 1260) {
      return {
        timeStr,
        icon: '🌆',
        desc: 'ทไวไลท์พลบค่ำ (Twilight Dusk)',
        prompt: `during atmospheric twilight dusk at ${timeStr}, deep violet-blue sky and warm streetlights`
      };
    } else {
      return {
        timeStr,
        icon: '🌃',
        desc: 'กลางคืนแสงนีออน (City Night & Neon Glow)',
        prompt: `at atmospheric city night ${timeStr}, illuminated by glowing streetlights and night reflections`
      };
    }
  }

  // Render Category Details & Option Groups
  function renderCategory(catId) {
    const cat = CATEGORIES[catId];
    if (!cat) return;

    catIcon.textContent = cat.icon;
    catName.textContent = cat.title;
    catDesc.textContent = cat.description;

    // Reset or ensure selectedTags for this category
    if (!state.selectedTags[catId]) {
      state.selectedTags[catId] = {};
    }

    // Render Option Groups with Bilingual Chips
    optionGroupsContainer.innerHTML = '';

    for (const group of cat.groups) {
      // Skip NSFW groups if NSFW mode is off
      if (group.nsfw && !state.nsfwMode) continue;

      if (!state.selectedTags[catId][group.id]) {
        state.selectedTags[catId][group.id] = new Set();
      }
      const selectedSet = state.selectedTags[catId][group.id];

      // Handle 24-Hour X-Axis Time Slider
      if (group.type === 'timeslider') {
        if (!state.timeSliderSettings[catId]) {
          state.timeSliderSettings[catId] = { active: false, minutes: 1050 };
        }
        const timeConfig = state.timeSliderSettings[catId];
        const currentInfo = getTimeInfo(timeConfig.minutes);

        const groupCard = document.createElement('div');
        groupCard.className = 'option-group time-slider-card';

        groupCard.innerHTML = `
          <div class="time-slider-top">
            <div class="group-title">
              <span>${group.title}</span>
            </div>
            <div class="time-controls-actions">
              <div class="time-badge-box">
                <span style="font-size: 16px;">${currentInfo.icon}</span>
                <span class="time-badge-clock">${currentInfo.timeStr} น.</span>
                <span class="time-badge-desc">${currentInfo.desc}</span>
              </div>
              <button class="btn-time-toggle ${timeConfig.active ? 'active' : ''}" type="button">
                ${timeConfig.active ? '✓ กำลังใช้งาน' : '+ กดเปิดใช้ช่วงเวลา'}
              </button>
            </div>
          </div>
          <div class="time-track-wrapper">
            <input type="range" class="time-range-input" min="0" max="1439" step="15" value="${timeConfig.minutes}">
            <div class="time-axis-ticks">
              <span>00:00 (ดึก)</span>
              <span>06:00 (เช้า)</span>
              <span>12:00 (เที่ยง)</span>
              <span>18:00 (เย็น)</span>
              <span>23:59</span>
            </div>
          </div>
        `;

        const sliderInput = groupCard.querySelector('.time-range-input');
        const toggleBtn = groupCard.querySelector('.btn-time-toggle');
        const clockSpan = groupCard.querySelector('.time-badge-clock');
        const descSpan = groupCard.querySelector('.time-badge-desc');
        const iconSpan = groupCard.querySelector('.time-badge-box span');

        function updateSliderUI() {
          const info = getTimeInfo(timeConfig.minutes);
          clockSpan.textContent = `${info.timeStr} น.`;
          descSpan.textContent = info.desc;
          iconSpan.textContent = info.icon;

          if (timeConfig.active) {
            selectedSet.clear();
            selectedSet.add(info.prompt);
          } else {
            selectedSet.clear();
          }
          updateLivePreview();
        }

        sliderInput.addEventListener('input', (e) => {
          timeConfig.minutes = parseInt(e.target.value, 10);
          timeConfig.active = true;
          toggleBtn.className = 'btn-time-toggle active';
          toggleBtn.textContent = '✓ กำลังใช้งาน';
          updateSliderUI();
        });

        toggleBtn.addEventListener('click', () => {
          timeConfig.active = !timeConfig.active;
          if (timeConfig.active) {
            toggleBtn.className = 'btn-time-toggle active';
            toggleBtn.textContent = '✓ กำลังใช้งาน';
          } else {
            toggleBtn.className = 'btn-time-toggle';
            toggleBtn.textContent = '+ กดเปิดใช้ช่วงเวลา';
          }
          updateSliderUI();
        });

        if (timeConfig.active) {
          selectedSet.clear();
          selectedSet.add(currentInfo.prompt);
        }

        optionGroupsContainer.appendChild(groupCard);
        continue;
      }

      const groupCard = document.createElement('div');
      groupCard.className = `option-group ${group.nsfw ? 'nsfw-group' : ''}`;

      const groupHeader = document.createElement('div');
      groupHeader.className = 'group-header';
      groupHeader.innerHTML = `
        <div class="group-title">
          <span>${group.title}</span>
        </div>
        <span style="font-size: 11px; color: var(--text-muted);">${group.multi ? 'เลือกได้หลายตัวเลือก' : 'เลือกได้ 1 ตัวเลือก (ดรอปดาวน์)'}</span>
      `;
      groupCard.appendChild(groupHeader);

      if (!group.multi) {
        // Dropdown for single-choice group
        const selectWrapper = document.createElement('div');
        selectWrapper.className = 'custom-select-wrapper';

        const select = document.createElement('select');
        const hasSelected = selectedSet.size > 0;
        select.className = `custom-select ${hasSelected ? 'has-value' : ''}`;

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = `-- ไม่ระบุ / ไม่เลือก (${group.title.replace(/^[^\s]+\s*/, '')}) --`;
        select.appendChild(defaultOption);

        for (const opt of group.options) {
          const option = document.createElement('option');
          option.value = opt.value;
          option.textContent = opt.label;
          if (selectedSet.has(opt.value)) {
            option.selected = true;
          }
          select.appendChild(option);
        }

        select.addEventListener('change', (e) => {
          const val = e.target.value;
          selectedSet.clear();
          if (val) {
            selectedSet.add(val);
            select.classList.add('has-value');
          } else {
            select.classList.remove('has-value');
          }
          updateLivePreview();
        });

        selectWrapper.appendChild(select);
        groupCard.appendChild(selectWrapper);
      } else {
        // Multi-choice chips
        const chipsBox = document.createElement('div');
        chipsBox.className = 'chips-container';

        for (const opt of group.options) {
          const chip = document.createElement('div');
          const isSelected = selectedSet.has(opt.value);
          chip.className = `chip ${isSelected ? 'active' : ''} ${group.nsfw ? 'nsfw-chip' : ''}`;
          chip.textContent = opt.label;

          chip.addEventListener('click', () => {
            if (selectedSet.has(opt.value)) {
              selectedSet.delete(opt.value);
              chip.classList.remove('active');
            } else {
              selectedSet.add(opt.value);
              chip.classList.add('active');
            }
            updateLivePreview();
          });

          chipsBox.appendChild(chip);
        }

        groupCard.appendChild(chipsBox);
      }

      optionGroupsContainer.appendChild(groupCard);
    }

    updateLivePreview();
  }

  // Render Aspect Ratio Chips
  function renderAspectChips() {
    aspectChipsContainer.innerHTML = '';

    for (const ar of ASPECT_RATIOS) {
      const chip = document.createElement('div');
      const isActive = state.activeAspect === ar.id;
      chip.className = `aspect-chip ${isActive ? 'active' : ''}`;
      
      // Calculate mini aspect box dimensions
      const maxDim = 14;
      let w = maxDim;
      let h = maxDim;
      if (ar.w > ar.h) {
        h = Math.round((ar.h / ar.w) * maxDim);
      } else if (ar.h > ar.w) {
        w = Math.round((ar.w / ar.h) * maxDim);
      }

      chip.innerHTML = `
        <span class="aspect-shape" style="width: ${w}px; height: ${h}px;"></span>
        <span>${ar.id}</span>
      `;

      chip.title = `${ar.label} - ${ar.useCase}`;

      chip.addEventListener('click', () => {
        state.activeAspect = ar.id;
        renderAspectChips();
        updateLivePreview();
      });

      aspectChipsContainer.appendChild(chip);
    }
  }

  // Assembles the Positive Prompt in 5W1H Structured Order
  function getAssembledPositivePrompt() {
    const parts = [];
    const catId = state.activeCategory;
    const cat = CATEGORIES[catId];
    const catGroups = state.selectedTags[catId] || {};

    // Collect all selected tags in group order (5W1H natural storytelling sequence)
    if (cat && cat.groups) {
      for (const group of cat.groups) {
        if (catGroups[group.id]) {
          const tags = Array.from(catGroups[group.id]);
          if (tags.length > 0) {
            parts.push(tags.join(', '));
          }
        }
      }
    } else {
      for (const groupId in catGroups) {
        const tags = Array.from(catGroups[groupId]);
        if (tags.length > 0) {
          parts.push(tags.join(', '));
        }
      }
    }

    // Append custom text if any
    if (state.customText.trim()) {
      parts.push(state.customText.trim());
    }

    // Append Aspect Ratio parameter
    const arObj = ASPECT_RATIOS.find(a => a.id === state.activeAspect);
    let promptStr = parts.join(', ');

    if (arObj && promptStr) {
      promptStr += ` ${arObj.tag}`;
    }

    return promptStr || 'กรุณาเลือกแท็กด้านบน หรือพิมพ์รายละเอียดเพื่อเริ่มสร้าง Prompt';
  }

  // Assembles the Negative Prompt
  function getAssembledNegativePrompt() {
    if (!state.negativeActive) return '';

    const parts = [];
    for (const negId of state.selectedNegativePresets) {
      const p = NEGATIVE_PRESETS.find(n => n.id === negId);
      if (p) parts.push(p.tag);
    }

    if (state.customNegativeText.trim()) {
      parts.push(state.customNegativeText.trim());
    }

    return parts.join(', ');
  }

  // Update Real-time Live Previews
  function updateLivePreview() {
    const positive = getAssembledPositivePrompt();
    livePositivePreview.textContent = positive;

    const words = positive ? positive.trim().split(/\s+/).length : 0;
    promptCharCount.textContent = `${words} คำ (${positive.length} ตัวอักษร)`;

    if (state.negativeActive) {
      negPreviewBox.style.display = 'flex';
      liveNegativePreview.textContent = getAssembledNegativePrompt();
      btnCopyNegative.style.display = 'flex';
    } else {
      negPreviewBox.style.display = 'none';
      btnCopyNegative.style.display = 'none';
    }
  }

  // Randomize current category options
  function randomizeCurrentCategory() {
    const cat = CATEGORIES[state.activeCategory];
    if (!cat) return;

    if (!state.selectedTags[cat.id]) {
      state.selectedTags[cat.id] = {};
    }

    for (const group of cat.groups) {
      if (group.nsfw && !state.nsfwMode) continue;
      state.selectedTags[cat.id][group.id] = new Set();
      
      // Randomly pick 1 option for ~70% of groups
      if (Math.random() > 0.3 && group.options.length > 0) {
        const randOpt = group.options[Math.floor(Math.random() * group.options.length)];
        state.selectedTags[cat.id][group.id].add(randOpt.value);
      }
    }

    renderCategory(cat.id);
    showToast('สุ่มชุดแท็กใหม่เรียบร้อยแล้ว! 🎲', 'info');
  }

  // Reset current category options
  function resetCurrentCategory() {
    const catId = state.activeCategory;
    state.selectedTags[catId] = {};
    state.timeSliderSettings[catId] = { active: false, minutes: 1050 };
    state.customText = '';
    customPromptInput.value = '';
    renderCategory(catId);
    showToast('ล้างค่าเรียบร้อยแล้ว', 'info');
  }

  // Add to History
  function addToHistory(category, positive, negative) {
    if (!positive || positive.startsWith('กรุณาเลือก')) return;
    const item = {
      id: Date.now(),
      category,
      positive,
      negative,
      timestamp: new Date().toLocaleTimeString('th-TH')
    };

    state.history.unshift(item);
    if (state.history.length > 50) state.history.pop();
    localStorage.setItem('imagept_history', JSON.stringify(state.history));
  }

  // Favorites System
  function toggleFavorite() {
    const positive = getAssembledPositivePrompt();
    if (!positive || positive.startsWith('กรุณาเลือก')) {
      showToast('ไม่มี Prompt ที่จะบันทึก', 'warn');
      return;
    }

    const item = {
      id: Date.now(),
      category: state.activeCategory,
      positive,
      negative: getAssembledNegativePrompt(),
      timestamp: new Date().toLocaleDateString('th-TH')
    };

    state.favorites.unshift(item);
    localStorage.setItem('imagept_favorites', JSON.stringify(state.favorites));
    showToast('บันทึกลงในรายการโปรดเรียบร้อย! ★', 'success');
  }

  function renderHistoryModal() {
    historyListContainer.innerHTML = '';
    const list = activeHistoryTab === 'favorites' ? state.favorites : state.history;

    if (list.length === 0) {
      historyListContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted); font-size: 13px;">
          ยังไม่มีรายการ${activeHistoryTab === 'favorites' ? 'โปรด' : 'ประวัติ'}ในขณะนี้
        </div>
      `;
      return;
    }

    for (const item of list) {
      const card = document.createElement('div');
      card.style.cssText = 'background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px;';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-muted);">
          <span>🏷️ หมวด: ${item.category}</span>
          <span>🕒 ${item.timestamp}</span>
        </div>
        <div style="font-size: 12px; color: #e2e8f0; font-family: monospace; line-height: 1.4; max-height: 60px; overflow-y: auto;">
          ${item.positive}
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px;">
          <button class="btn-action copy-main" style="padding: 4px 10px; font-size: 11px;">📋 คัดลอก</button>
          ${activeHistoryTab === 'favorites' ? '<button class="btn-action secondary btn-del-fav" style="padding: 4px 8px; font-size: 11px; color: #fb7185;">🗑️ ลบ</button>' : ''}
        </div>
      `;

      card.querySelector('.copy-main').addEventListener('click', () => {
        copyText(item.positive, 'Prompt');
      });

      if (activeHistoryTab === 'favorites') {
        card.querySelector('.btn-del-fav').addEventListener('click', () => {
          state.favorites = state.favorites.filter(f => f.id !== item.id);
          localStorage.setItem('imagept_favorites', JSON.stringify(state.favorites));
          renderHistoryModal();
          showToast('ลบรายการโปรดแล้ว', 'info');
        });
      }

      historyListContainer.appendChild(card);
    }
  }

  // Handle AI Auto-fill
  async function handleAutoFill() {
    const query = autofillInput.value.trim();
    if (!query) {
      showToast('กรุณากรอกไอเดียที่ต้องการให้ AI ช่วยจัดแท็ก', 'warn');
      return;
    }

    btnAutofill.disabled = true;
    btnAutofill.textContent = 'กำลังค้นหา RAG...';

    try {
      // 1. Search RAG Masterpiece context in Pure JS Vector Store
      let ragMatches = [];
      if (typeof searchSimilar === 'function') {
        ragMatches = searchSimilar(query, 3);
      }

      const aiSettings = getAISettings();

      if (!aiSettings.apiKey && aiSettings.provider !== 'ollama') {
        // Fallback: If no API key provided, use top RAG match directly!
        if (ragMatches.length > 0) {
          const top = ragMatches[0];
          state.activeCategory = top.category;
          state.customText = top.prompt;
          customPromptInput.value = top.prompt;
          state.activeAspect = top.aspect || '16:9';

          renderSidebar();
          renderCategory(top.category);
          renderAspectChips();
          updateLivePreview();

          showToast(`ดึงตัวอย่าง Prompt จาก RAG: "${top.title}" เรียบร้อย (ใส่ API Key ใน Settings เพื่อเปิด AI เต็มระบบ)`, 'info');
          return;
        } else {
          showToast('กรุณาตั้งค่า API Key ในปุ่ม ⚙️ เพื่อใช้งาน AI Auto-fill', 'warn');
          return;
        }
      }

      btnAutofill.textContent = 'AI กำลังวิเคราะห์...';

      // 2. Call AI Service
      const result = await autoFillWithAI(query, ragMatches, aiSettings);

      if (result) {
        if (result.category && CATEGORIES[result.category]) {
          state.activeCategory = result.category;
        }
        if (result.aspectRatio) {
          state.activeAspect = result.aspectRatio;
        }
        if (result.customDetails || result.prompt) {
          state.customText = result.customDetails || result.prompt;
          customPromptInput.value = state.customText;
        }

        renderSidebar();
        renderCategory(state.activeCategory);
        renderAspectChips();
        updateLivePreview();

        showToast('AI จัดแท็กและขยายความ Prompt สำเร็จแล้ว! ✨', 'success');
      }

    } catch (err) {
      console.error('Auto-fill error:', err);
      showToast('เกิดข้อผิดพลาด: ' + err.message, 'warn');
    } finally {
      btnAutofill.disabled = false;
      btnAutofill.innerHTML = '<span>AI Auto-fill</span><span style="font-size: 11px;">↵</span>';
    }
  }

  // Handle Image to Prompt File Processing
  async function processImageFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('กรุณาเลือกไฟล์รูปภาพที่ถูกต้อง', 'warn');
      return;
    }

    state.currentImageMime = file.type;
    imagePromptModal.classList.add('active');
    imageMetadataStatus.textContent = 'กำลังอ่าน Metadata จากรูปภาพ...';
    btnAnalyzeVisionAI.style.display = 'none';

    // Show preview
    const reader = new FileReader();
    reader.onload = async (e) => {
      state.currentImageBase64 = e.target.result;
      imagePreviewImg.src = state.currentImageBase64;
      imagePreviewImg.style.display = 'block';
      imagePlaceholder.style.display = 'none';

      // Read ArrayBuffer for ExifReader
      const arrayBuffer = await file.arrayBuffer();
      state.currentImageBuffer = arrayBuffer;

      try {
        const meta = await extractMetadata(arrayBuffer);
        if (meta.found) {
          imageMetadataStatus.innerHTML = `✅ ตรวจพบ Generation Data จาก <strong>${meta.source}</strong> (ฟรี 100% ออฟไลน์)`;
          extractedPositive.value = meta.positivePrompt;
          extractedNegative.value = meta.negativePrompt;
          showToast(`ดึง Prompt จาก ${meta.source} เรียบร้อย!`, 'success');
        } else {
          imageMetadataStatus.innerHTML = `ℹ️ ไม่พบ Metadata ของ AI ในไฟล์นี้ คุณสามารถกดให้ <strong>Vision AI</strong> ช่วยแกะภาพได้`;
          btnAnalyzeVisionAI.style.display = 'flex';
          extractedPositive.value = '';
          extractedNegative.value = '';
        }
      } catch (err) {
        console.error('Metadata parsing error:', err);
        imageMetadataStatus.textContent = 'ไม่สามารถอ่าน Metadata ได้: ' + err.message;
        btnAnalyzeVisionAI.style.display = 'flex';
      }
    };
    reader.readAsDataURL(file);
  }

  // Event Listeners for UI
  nsfwToggle.checked = state.nsfwMode;
  if (state.nsfwMode) nsfwToggleWrapper.classList.add('nsfw-active');

  nsfwToggle.addEventListener('change', () => {
    state.nsfwMode = nsfwToggle.checked;
    localStorage.setItem('imagept_nsfw', state.nsfwMode);
    if (state.nsfwMode) {
      nsfwToggleWrapper.classList.add('nsfw-active');
      showToast('เปิดโหมด 18+ (ปลดล็อกชุดว่ายน้ำและสไตล์วาบหวิว)', 'warn');
    } else {
      nsfwToggleWrapper.classList.remove('nsfw-active');
      if (state.activeCategory === 'nsfw') {
        state.activeCategory = 'person';
      }
      showToast('ปิดโหมด 18+ (กลับสู่ Safe Mode)', 'info');
    }
    renderSidebar();
    renderCategory(state.activeCategory);
  });

  negToggle.checked = state.negativeActive;
  negToggle.addEventListener('change', () => {
    state.negativeActive = negToggle.checked;
    localStorage.setItem('imagept_neg_active', state.negativeActive);
    updateLivePreview();
  });

  customPromptInput.addEventListener('input', (e) => {
    state.customText = e.target.value;
    updateLivePreview();
  });

  btnCopyPrompt.addEventListener('click', () => {
    copyText(getAssembledPositivePrompt(), 'Positive Prompt');
  });

  btnCopyNegative.addEventListener('click', () => {
    copyText(getAssembledNegativePrompt(), 'Negative Prompt');
  });

  btnCopyNegInline.addEventListener('click', () => {
    copyText(getAssembledNegativePrompt(), 'Negative Prompt');
  });

  btnFavorite.addEventListener('click', toggleFavorite);
  btnRandomize.addEventListener('click', randomizeCurrentCategory);
  btnClear.addEventListener('click', resetCurrentCategory);

  btnAutofill.addEventListener('click', handleAutoFill);
  autofillInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleAutoFill();
  });

  // Settings Modal Handlers
  btnSettings.addEventListener('click', () => {
    const s = getAISettings();
    settingProvider.value = s.provider;
    settingApiKey.value = s.apiKey;
    settingModel.value = s.model;
    settingBaseUrl.value = s.baseUrl;
    settingsModal.classList.add('active');
  });

  btnCloseSettings.addEventListener('click', () => {
    settingsModal.classList.remove('active');
  });

  btnSaveSettings.addEventListener('click', () => {
    saveAISettings({
      provider: settingProvider.value,
      apiKey: settingApiKey.value.trim(),
      model: settingModel.value.trim(),
      baseUrl: settingBaseUrl.value.trim()
    });
    settingsModal.classList.remove('active');
  });

  // History & Favorites Modal Handlers
  btnHistory.addEventListener('click', () => {
    renderHistoryModal();
    historyModal.classList.add('active');
  });

  btnCloseHistory.addEventListener('click', () => {
    historyModal.classList.remove('active');
  });

  tabFavorites.addEventListener('click', () => {
    activeHistoryTab = 'favorites';
    tabFavorites.className = 'btn-header primary';
    tabHistory.className = 'btn-header';
    renderHistoryModal();
  });

  tabHistory.addEventListener('click', () => {
    activeHistoryTab = 'history';
    tabHistory.className = 'btn-header primary';
    tabFavorites.className = 'btn-header';
    renderHistoryModal();
  });

  // Image to Prompt Modal Handlers
  btnOpenImagePrompt.addEventListener('click', () => {
    imagePromptModal.classList.add('active');
  });

  btnCloseImageModal.addEventListener('click', () => {
    imagePromptModal.classList.remove('active');
  });

  btnChooseImage.addEventListener('click', () => {
    filePickerInput.click();
  });

  filePickerInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  });

  btnAnalyzeVisionAI.addEventListener('click', async () => {
    const aiSettings = getAISettings();
    if (!aiSettings.apiKey && aiSettings.provider !== 'ollama') {
      showToast('กรุณาระบุ API Key ในการตั้งค่า (Settings) ก่อนใช้ Vision AI', 'warn');
      return;
    }

    btnAnalyzeVisionAI.disabled = true;
    btnAnalyzeVisionAI.textContent = 'Vision AI กำลังวิเคราะห์องค์ประกอบ...';

    try {
      const res = await analyzeImageWithAI(state.currentImageBase64, state.currentImageMime, aiSettings);
      extractedPositive.value = res.prompt || '';
      extractedNegative.value = res.negativePrompt || '';
      imageMetadataStatus.innerHTML = `✨ Vision AI แกะภาพสำเร็จ! ตรวจพบสไตล์: <strong>${res.detectedStyle || 'ทั่วไป'}</strong> | หมวด: <strong>${res.category || 'person'}</strong>`;
      showToast('Vision AI ถอดรหัสภาพเป็น Prompt สำเร็จแล้ว! ✨', 'success');
    } catch (err) {
      console.error('Vision AI error:', err);
      showToast('Vision AI ล้มเหลว: ' + err.message, 'warn');
    } finally {
      btnAnalyzeVisionAI.disabled = false;
      btnAnalyzeVisionAI.innerHTML = '<span>✨</span><span>ให้ Vision AI วิเคราะห์แกะ Prompt</span>';
    }
  });

  btnCopyExtracted.addEventListener('click', () => {
    const text = extractedPositive.value;
    if (text) copyText(text, 'Prompt ที่แกะได้');
    else showToast('ไม่มี Prompt ให้คัดลอก', 'warn');
  });

  btnLoadToBuilder.addEventListener('click', () => {
    const text = extractedPositive.value;
    if (!text) {
      showToast('ไม่มี Prompt ให้โหลดเข้า Builder', 'warn');
      return;
    }

    state.customText = text;
    customPromptInput.value = text;
    updateLivePreview();
    imagePromptModal.classList.remove('active');
    showToast('โหลดข้อความเข้าสู่ Builder เรียบร้อยแล้ว! 📥', 'success');
  });

  // Global Drag and Drop Handlers
  window.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dropOverlay.classList.add('active');
  });

  dropOverlay.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  dropOverlay.addEventListener('dragleave', (e) => {
    if (e.relatedTarget === null) {
      dropOverlay.classList.remove('active');
    }
  });

  dropOverlay.addEventListener('drop', (e) => {
    e.preventDefault();
    dropOverlay.classList.remove('active');

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  });

  // Initialize UI
  renderSidebar();
  renderCategory(state.activeCategory);
  renderAspectChips();
  updateLivePreview();
});
