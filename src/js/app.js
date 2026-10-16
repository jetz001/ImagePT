// Main Application Logic for ImagePT AI Studio (Friendly UI/UX Edition)

document.addEventListener('DOMContentLoaded', () => {
  // Quick Starter Templates per Category
  const QUICK_TEMPLATES = {
    person: [
      {
        id: 'cafe_girl',
        icon: '☕',
        name: 'สาวคาเฟ่มินิมอล',
        sub: 'ละมุน อบอุ่น เลนส์ 85mm',
        aspect: '4:5',
        timeMinutes: 960, // 16:00
        tags: {
          genderAge: ['a stunning young woman, 22 years old'],
          ethnicity: ['Thai ethnicity'],
          hair: ['effortless Korean soft curls', 'warm caramel brown hair'],
          expression: ['gentle radiant smile, warm friendly expression'],
          tops: ['wearing a soft cozy pastel knitted cardigan'],
          bottoms: ['fitted high-waisted denim jeans'],
          props: ['gracefully holding a warm ceramic artisan coffee cup'],
          posture: ['seated at cafe table resting chin gently on hand'],
          location: ['in a cozy aesthetic minimalist wooden cafe with warm ambient light'],
          shotType: ['medium half-body portrait shot from waist up'],
          lighting: ['soft diffused natural window side light with gentle gradients'],
          cameraTech: ['shot on 85mm prime lens at f/1.4, creamy smooth circular background bokeh'],
          style: ['hyperrealistic award-winning 35mm photography, sharp pores, highly detailed, 8k resolution']
        }
      },
      {
        id: 'beach_sunset',
        icon: '🌅',
        name: 'ริมหาดโกลเด้นอาวร์',
        sub: 'เดรสซาติน แสงเย็นโรแมนติก',
        aspect: '9:16',
        timeMinutes: 1050, // 17:30
        tags: {
          genderAge: ['a stunning young woman, 22 years old'],
          ethnicity: ['Thai ethnicity'],
          hair: ['long flowing wavy hair'],
          expression: ['subtle serene smile, soft charming expression'],
          dresses: ['wearing a sleek silk satin spaghetti-strap slip dress'],
          shoes: ['barefoot with natural toes on ground'],
          posture: ['standing looking back over shoulder toward camera'],
          location: ['on a pristine tropical sun-drenched ocean beach with turquoise waves and white sand'],
          weather: ['with a gentle refreshing breeze blowing hair and garments dynamically'],
          mood: ['warm romantic and dreamy nostalgic atmosphere'],
          shotType: ['medium half-body portrait shot from waist up'],
          lighting: ['crisp sharp rim backlighting separating subject from background, glowing halo'],
          cameraTech: ['shot on 85mm prime lens at f/1.4, creamy smooth circular background bokeh'],
          style: ['cinematic film still, 35mm kodak portra 400 grain, Panavision anamorphic composition']
        }
      },
      {
        id: 'cyber_street',
        icon: '🌃',
        name: 'สตรีทโตเกียวนีออน',
        sub: 'เท่ ไซเบอร์พังก์ ยามค่ำคืน',
        aspect: '16:9',
        timeMinutes: 1290, // 21:30
        tags: {
          genderAge: ['a stunning young woman, 22 years old'],
          ethnicity: ['Japanese ethnicity'],
          hair: ['stylish short bob haircut'],
          headwear: ['wearing sleek matte-black wireless over-ear headphones around neck'],
          expression: ['confident poised expression, captivating direct eye contact'],
          tops: ['wearing a trendy minimalist crop top showing midriff', 'wearing a stylish black leather biker jacket'],
          bottoms: ['tactical streetwear wide-leg cargo pants'],
          shoes: ['wearing clean designer streetwear sneakers'],
          posture: ['casually leaning back against wall, relaxed cool stance'],
          location: ['on a vibrant neon-lit street alley in Tokyo at night, glowing signs'],
          weather: ['on a gentle rainy day with glistening reflective wet ground'],
          shotType: ['medium half-body portrait shot from waist up'],
          lighting: ['stylized dual-color neon lighting, vivid magenta and cyan rim contrast'],
          cameraTech: ['cinematic anamorphic horizontal lens flare and natural optical glare'],
          style: ['cinematic film still, 35mm kodak portra 400 grain, Panavision anamorphic composition']
        }
      },
      {
        id: 'thai_contemporary',
        icon: '⛩️',
        name: 'สาวชุดไทยประยุกต์',
        sub: 'สง่างาม วัดไทย แสงเช้า',
        aspect: '4:5',
        timeMinutes: 450, // 07:30
        tags: {
          genderAge: ['a stunning young woman, 22 years old'],
          ethnicity: ['Thai ethnicity'],
          hair: ['long flowing wavy hair', 'glossy natural black hair'],
          expression: ['subtle serene smile, soft charming expression'],
          dresses: ['luxurious contemporary modern Thai silk dress'],
          posture: ['standing tall with graceful elegant poise'],
          location: ['at an ornate historic Thai temple with golden pagodas and intricate carvings'],
          mood: ['peaceful serene and tranquil zen stillness'],
          shotType: ['medium half-body portrait shot from waist up'],
          cameraTech: ['shot on 85mm prime lens at f/1.4, creamy smooth circular background bokeh'],
          style: ['hyperrealistic award-winning 35mm photography, sharp pores, highly detailed, 8k resolution']
        }
      },
      {
        id: 'vogue_studio',
        icon: '📸',
        name: 'แฟชั่น Vogue สตูดิโอ',
        sub: 'ไฮเอนด์ คมชัดระดับแมกกาซีน',
        aspect: '4:5',
        timeMinutes: null,
        tags: {
          genderAge: ['an elegant mature woman, 35 years old'],
          ethnicity: ['Caucasian European'],
          headwear: ['wearing chic designer dark sunglasses', 'wearing subtle elegant gold hoop earrings'],
          expression: ['high-fashion neutral expression, fierce high-end model gaze'],
          dresses: ['tailored elegant modern full business suit'],
          shoes: ['wearing elegant strappy stiletto high heels'],
          posture: ['standing confidently with hands on hips, powerful pose'],
          location: ['in a clean minimalist white infinity cyclorama photo studio backdrop'],
          mood: ['prestigious luxury editorial and confident magnetic aura'],
          shotType: ['full-length full-body fashion shot'],
          lighting: ['classic studio Rembrandt lighting, dramatic triangle light on cheek'],
          style: ['high fashion editorial lookbook photography, Vogue magazine cover aesthetic, sharp styling']
        }
      },
      {
        id: 'nsfw_boudoir',
        icon: '🔥',
        name: 'Luxury Boudoir (18+)',
        sub: 'ชุดลูกไม้ ห้องเพนต์เฮาส์หรู',
        nsfw: true,
        aspect: '4:5',
        timeMinutes: 1320,
        tags: {
          genderAge: ['a stunning young woman, 22 years old'],
          ethnicity: ['Thai ethnicity'],
          hair: ['long flowing wavy hair'],
          clothingNsfw: ['wearing exquisite delicate black lace lingerie, babydoll', 'draped in an open luxury silk robe revealing shoulders'],
          posesNsfw: ['intense sultry seductive gaze, hypnotic eyes', 'sensually reclining on luxury silk bedsheets'],
          location: ['inside a luxury modern penthouse bedroom with panoramic floor-to-ceiling windows'],
          lighting: ['intimate low-key warm candlelit illumination, golden dancing flicker'],
          cameraTech: ['shot on 85mm prime lens at f/1.4, creamy smooth circular background bokeh'],
          style: ['hyperrealistic award-winning 35mm photography, sharp pores, highly detailed, 8k resolution']
        }
      }
    ],
    nsfw: [
      {
        id: 'nsfw_glamour',
        icon: '💋',
        name: 'Glamour Bedroom',
        sub: 'เตียงซาติน แสงริมไลท์สลัว',
        aspect: '4:5',
        tags: {
          nsfwTheme: ['intimate luxury hotel boudoir photography, moody private bedroom shoot'],
          nsfwSetting: ['lying on messy silk satin bedsheets in a luxury high-rise penthouse'],
          nsfwSensory: ['flawless toned feminine curves, slim waist, accentuated hips', 'dramatic low-key rim lighting highlighting the body curves in dark shadows']
        }
      },
      {
        id: 'nsfw_bikini_pool',
        icon: '🏖️',
        name: 'Private Villa Pool',
        sub: 'สระว่ายน้ำวิลล่า ผิวฉ่ำหยดน้ำ',
        aspect: '9:16',
        tags: {
          nsfwTheme: ['tropical sun-drenched beach bikini shoot, glistening ocean spray'],
          nsfwSetting: ['private villa swimming pool at night with turquoise underwater illumination'],
          nsfwSensory: ['beaded water droplets resting on glistening tanned skin', 'alluring deep cleavage, elegant defined collarbone, smooth shoulders']
        }
      }
    ],
    landscape: [
      {
        id: 'swiss_alps',
        icon: '🏔️',
        name: 'ทะเลสาบภูเขาหิมะ',
        sub: 'กระจกสะท้อน แสงเช้าตรู่',
        aspect: '16:9',
        tags: {
          environment: ['crystal-clear mountain lake with perfect glassy reflection of alpine peaks'],
          timeSeason: ['early morning dawn, pink and orange sky'],
          weather: ['ethereal rolling morning fog weaving through valleys'],
          composition: ['ultra-wide angle 14mm lens expansive perspective']
        }
      },
      {
        id: 'cyber_city',
        icon: '🌆',
        name: 'มหานครไซเบอร์พังก์',
        sub: 'ตึกระฟ้านีออน ฝนพรำมุมโดรน',
        aspect: '21:9',
        tags: {
          environment: ['futuristic cyberpunk city skyline at night, towering holographic neon skyscrapers'],
          weather: ['gentle rain shower with reflective wet ground and damp atmosphere'],
          composition: ['breathtaking top-down aerial drone photography']
        }
      }
    ],
    logo: [
      {
        id: 'tech_minimal',
        icon: '🤖',
        name: 'โลโก้ AI Tech มินิมอล',
        sub: 'เวกเตอร์ไล่เฉดสีโมเดิร์น',
        aspect: '1:1',
        tags: {
          logoStyle: ['clean modern minimalist flat vector logo design'],
          industry: ['for an innovative cutting-edge AI technology startup'],
          colorPalette: ['vibrant modern purple-to-cyan smooth gradient'],
          background: ['isolated on premium dark charcoal background']
        }
      },
      {
        id: 'coffee_badge',
        icon: '☕',
        name: 'โลโก้คาเฟ่วินเทจ',
        sub: 'เอิร์ธโทน อบอุ่น พื้นขาว',
        aspect: '1:1',
        tags: {
          logoStyle: ['vintage retro badge emblem with intricate decorative linework'],
          industry: ['for a cozy specialty artisan coffee roastery'],
          colorPalette: ['warm organic earth tones, terracotta and sage green'],
          background: ['isolated on plain solid white background, zero shadows, Dribbble trending']
        }
      }
    ],
    product: [
      {
        id: 'luxury_serum',
        icon: '✨',
        name: 'สกินแคร์หรูบนหินอ่อน',
        sub: 'แสงแดดลอดใบไม้ สตูดิโอ',
        aspect: '4:5',
        tags: {
          productType: ['luxury glass serum skincare dropper bottle'],
          pedestal: ['resting on an elegant carved white Carrara marble pedestal', 'surrounded by fresh lush monstera leaves and soft eucalyptus'],
          studioLighting: ['warm dappled sunlight casting elegant palm leaf shadows'],
          cameraAngle: ['front-facing eye-level commercial hero shot']
        }
      },
      {
        id: 'splash_perfume',
        icon: '💧',
        name: 'น้ำหอมกลางหยดน้ำ',
        sub: 'ลอยตัว น้ำกระเด็น คมชัดสูง',
        aspect: '1:1',
        tags: {
          productType: ['crystal cut luxury perfume fragrance bottle with gold cap'],
          pedestal: ['dynamically floating surrounded by crystal-clear dynamic water splash'],
          studioLighting: ['crisp rim backlighting accentuating the sleek product contours'],
          cameraAngle: ['flattering 45-degree angle studio photography']
        }
      }
    ],
    cover: [
      {
        id: 'yt_viral',
        icon: '▶️',
        name: 'ปก YouTube หยุดนิ้ว',
        sub: 'สีสด คอนทราสต์สูง มีพื้นที่วางข้อความ',
        aspect: '16:9',
        tags: {
          coverFormat: ['high-CTR viral YouTube thumbnail composition, bold vibrant contrast'],
          focalPoint: ['dramatic emotional expression with wide eyes, high energy'],
          layoutComposition: ['clean empty negative space at the top reserved for bold title typography', 'eye-catching color contrast, vivid saturation and deep darks']
        }
      }
    ],
    banner: [
      {
        id: 'web_hero',
        icon: '🌐',
        name: 'Web Hero Banner',
        sub: 'คลื่น 3D ล้ำสมัย เว้นซ้ายวางคำ',
        aspect: '21:9',
        tags: {
          bannerType: ['modern website landing page hero banner header, ultrawide format'],
          bannerLayout: ['focal visual element on the right, ample clean negative space on the left for text'],
          bannerTheme: ['futuristic 3D flowing glossy waves, glassmorphism ribbons, tech ambiance']
        }
      }
    ],
    general: [
      {
        id: 'cinema_boost',
        icon: '🎬',
        name: 'อัปเกรดภาพระดับหนังโรง',
        sub: '8K + Teal & Orange + Anamorphic',
        aspect: '16:9',
        tags: {
          qualityModifiers: ['masterpiece, highest quality, 8k resolution, extremely detailed'],
          colorGrading: ['cinematic teal and orange color grade, rich film contrast'],
          lensAngle: ['anamorphic widescreen lens with horizontal blue lens flare']
        }
      }
    ]
  };

  // 5W1H Step Metadata for Guided Navigation
  const FRAMEWORK_STEPS = [
    { id: 'ALL', label: '🌟 ทั้งหมด (All)', desc: 'แสดงทุกหมวดย่อย' },
    { id: 'WHO', label: '👤 1. ตัวละคร (WHO)', desc: 'เพศ วัย สัญชาติ ทรงผม สีหน้า' },
    { id: 'WHAT', label: '👗 2. เสื้อผ้า & ท่าโพส (WHAT)', desc: 'ท่อนบน ท่อนล่าง เดรส รองเท้า พร็อพ ท่าทาง' },
    { id: 'WHERE', label: '📍 3. สถานที่ (WHERE)', desc: 'ฉากหลังและโลเคชันถ่ายทำ' },
    { id: 'WHEN', label: '⏰ 4. เวลา & อากาศ (WHEN)', desc: 'ช่วงเวลา 24 ชม. และสภาพอากาศ' },
    { id: 'WHY', label: '💭 5. อารมณ์ภาพ (WHY)', desc: 'มู้ดแอนด์โทนของเรื่องราว' },
    { id: 'HOW', label: '📷 6. มุมกล้อง & สไตล์ (HOW)', desc: 'ระยะภาพ การจัดแสง เลนส์ และสไตล์ศิลปะ' }
  ];

  // Quick Time Presets for 24h Slider
  const TIME_PRESETS = [
    { label: '🌌 เที่ยงคืน (00:00)', mins: 0 },
    { label: '🌅 เช้าตรู่ (06:30)', mins: 390 },
    { label: '☀️ แดดเช้า (09:00)', mins: 540 },
    { label: '🌤️ บ่ายคล้อย (15:30)', mins: 930 },
    { label: '🌇 โกลเด้นอาวร์ (17:30)', mins: 1050 },
    { label: '🌆 พลบค่ำ (19:00)', mins: 1140 },
    { label: '🌃 กลางคืนนีออน (21:30)', mins: 1290 }
  ];

  // Application State
  const state = {
    activeCategory: 'person',
    activeFrameworkStep: 'ALL',
    tagSearchQuery: '',
    postureSubFilter: 'ALL',
    activeTemplateId: null,
    targetPlatform: localStorage.getItem('imagept_platform') || 'midjourney', // 'midjourney' | 'flux' | 'sd'
    dockCollapsed: false,
    selectedTags: {}, // { [catId]: { [groupId]: Set of string values } }
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
  const catIcon = document.getElementById('catIcon');
  const catName = document.getElementById('catName');
  const catDesc = document.getElementById('catDesc');
  const frameworkNavBar = document.getElementById('frameworkNavBar');
  const tagSearchInput = document.getElementById('tagSearchInput');
  const btnClearTagSearch = document.getElementById('btnClearTagSearch');
  const templatesBanner = document.getElementById('templatesBanner');
  const templatesContainer = document.getElementById('templatesContainer');
  const optionGroupsContainer = document.getElementById('optionGroupsContainer');
  const customPromptInput = document.getElementById('customPromptInput');
  const aspectChipsContainer = document.getElementById('aspectChipsContainer');
  const livePositivePreview = document.getElementById('livePositivePreview');
  const liveNegativePreview = document.getElementById('liveNegativePreview');
  const negPreviewBox = document.getElementById('negPreviewBox');
  const negPresetsBar = document.getElementById('negPresetsBar');
  const promptCharCount = document.getElementById('promptCharCount');
  const selectedCountLabel = document.getElementById('selectedCountLabel');
  const selectedPillsContainer = document.getElementById('selectedPillsContainer');
  const bottomDock = document.getElementById('bottomDock');
  const btnToggleDock = document.getElementById('btnToggleDock');
  const dockToggleIcon = document.getElementById('dockToggleIcon');
  const dockToggleText = document.getElementById('dockToggleText');
  const favCountBadge = document.getElementById('favCountBadge');

  // Buttons & Controls
  const nsfwToggle = document.getElementById('nsfwToggle');
  const nsfwToggleWrapper = document.getElementById('nsfwToggleWrapper');
  const negToggle = document.getElementById('negToggle');
  const btnCopyPrompt = document.getElementById('btnCopyPrompt');
  const btnCopyPosInline = document.getElementById('btnCopyPosInline');
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
  const imagePreviewContainer = document.getElementById('imagePreviewContainer');
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

  // Helper: Split bilingual label "สายเดี่ยวผ้าซาติน (Satin camisole)" into structured HTML
  function formatBilingualChip(rawLabel) {
    const clean = rawLabel.replace(/^\[[^\]]+\]\s*/, ''); // strip [ท่ายืน] prefix if any
    const match = clean.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    if (match) {
      return `<span class="chip-th">${match[1].trim()}</span><span class="chip-en">${match[2].trim()}</span>`;
    }
    return `<span class="chip-th">${clean}</span>`;
  }

  // Helper: Get short Thai name for active selection pill
  function getShortLabel(rawLabel) {
    const clean = rawLabel.replace(/^\[[^\]]+\]\s*/, '');
    const match = clean.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
    return match ? match[1].trim() : clean;
  }

  // Helper: Count total selected tags in a category
  function getCategorySelectedCount(catId) {
    const catGroups = state.selectedTags[catId];
    if (!catGroups) return 0;
    let total = 0;
    for (const gId in catGroups) {
      total += catGroups[gId].size;
    }
    return total;
  }

  // Update Favorites Header Badge
  function updateFavBadge() {
    if (state.favorites.length > 0) {
      favCountBadge.style.display = 'inline-block';
      favCountBadge.textContent = state.favorites.length;
    } else {
      favCountBadge.style.display = 'none';
    }
  }

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
    }, 2600);
  }

  // Clipboard Copy Handler
  async function copyText(text, label = 'Prompt') {
    if (!text || !text.trim() || text.startsWith('💡 ยังไม่ได้เลือกแท็ก')) {
      showToast('กรุณาเลือกแท็กอย่างน้อย 1 รายการก่อนคัดลอก', 'warn');
      return;
    }

    try {
      if (window.electronAPI && window.electronAPI.copyToClipboard) {
        await window.electronAPI.copyToClipboard(text);
      } else {
        await navigator.clipboard.writeText(text);
      }
      showToast(`คัดลอก ${label} เรียบร้อยแล้ว! พร้อมนำไปวางใน AI`, 'success');
      addToHistory(state.activeCategory, text, getAssembledNegativePrompt());
    } catch (err) {
      console.error('Clipboard copy error:', err);
      showToast('ไม่สามารถคัดลอกได้: ' + err.message, 'warn');
    }
  }

  // Load & Save AI Settings
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

  // Render Sidebar with Selection Count Badges
  function renderSidebar() {
    sidebarNav.innerHTML = '<div class="sidebar-heading">1. เลือกหมวดหมู่ภาพ</div>';

    const categoriesList = Object.values(CATEGORIES);
    for (const cat of categoriesList) {
      if (cat.nsfwOnly && !state.nsfwMode) continue;

      const count = getCategorySelectedCount(cat.id);
      const navItem = document.createElement('div');
      navItem.className = `category-nav-item ${cat.id === state.activeCategory ? 'active' : ''} ${cat.nsfwOnly ? 'nsfw-item' : ''}`;
      navItem.innerHTML = `
        <div class="category-nav-left">
          <span class="category-icon">${cat.icon}</span>
          <span class="category-nav-title">${cat.title.replace(/\s*\([^)]*\)/, '')}</span>
        </div>
        ${count > 0 ? `<span class="category-nav-badge">${count}</span>` : ''}
      `;
      navItem.title = cat.title;

      navItem.addEventListener('click', () => {
        state.activeCategory = cat.id;
        state.activeFrameworkStep = 'ALL';
        state.tagSearchQuery = '';
        tagSearchInput.value = '';
        btnClearTagSearch.style.display = 'none';
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
        desc: 'โกลเด้นอาวร์ / พระอาทิตย์ตกดิน (Golden Hour)',
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

  // Render Quick Starter Templates Bar
  function renderQuickTemplates(catId) {
    const rawTemplates = QUICK_TEMPLATES[catId] || [];
    const templates = rawTemplates.filter(t => !t.nsfw || state.nsfwMode);

    if (templates.length === 0) {
      templatesBanner.style.display = 'none';
      return;
    }

    templatesBanner.style.display = 'flex';
    templatesContainer.innerHTML = '';

    for (const tpl of templates) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `template-card ${state.activeTemplateId === tpl.id ? 'active' : ''} ${tpl.nsfw ? 'nsfw-template' : ''}`;
      card.innerHTML = `
        <span class="template-emoji">${tpl.icon}</span>
        <div class="template-info">
          <span class="template-name">${tpl.name}</span>
          <span class="template-sub">${tpl.sub}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        applyQuickTemplate(catId, tpl);
      });

      templatesContainer.appendChild(card);
    }
  }

  // Apply a 1-Click Starter Template
  function applyQuickTemplate(catId, tpl) {
    state.activeTemplateId = tpl.id;
    state.selectedTags[catId] = {};

    const cat = CATEGORIES[catId];
    if (cat) {
      for (const group of cat.groups) {
        state.selectedTags[catId][group.id] = new Set();
        if (tpl.tags && tpl.tags[group.id]) {
          for (const val of tpl.tags[group.id]) {
            state.selectedTags[catId][group.id].add(val);
          }
        }
      }
    }

    if (typeof tpl.timeMinutes === 'number') {
      state.timeSliderSettings[catId] = { active: true, minutes: tpl.timeMinutes };
      const info = getTimeInfo(tpl.timeMinutes);
      if (!state.selectedTags[catId]['timeOfDay']) {
        state.selectedTags[catId]['timeOfDay'] = new Set();
      }
      state.selectedTags[catId]['timeOfDay'].add(info.prompt);
    } else if (state.timeSliderSettings[catId]) {
      state.timeSliderSettings[catId].active = false;
    }

    if (tpl.aspect) {
      state.activeAspect = tpl.aspect;
      renderAspectChips();
    }

    renderSidebar();
    renderCategory(catId);
    showToast(`โหลดเทมเพลต "${tpl.name}" เรียบร้อย! ปรับแต่งแท็กต่อได้เลย ✨`, 'success');
  }

  // Render 5W1H Step Filter Tabs
  function renderFrameworkNav(cat) {
    const hasFrameworks = cat.groups.some(g => Boolean(g.framework));
    if (!hasFrameworks) {
      frameworkNavBar.innerHTML = '';
      return;
    }

    frameworkNavBar.innerHTML = '';
    const catGroups = state.selectedTags[cat.id] || {};

    for (const step of FRAMEWORK_STEPS) {
      // Count selected tags in this framework step
      let stepCount = 0;
      for (const g of cat.groups) {
        if (g.nsfw && !state.nsfwMode) continue;
        if (step.id === 'ALL' || g.framework === step.id) {
          if (catGroups[g.id]) stepCount += catGroups[g.id].size;
        }
      }

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `framework-tab ${state.activeFrameworkStep === step.id ? 'active' : ''}`;
      btn.title = step.desc;
      btn.innerHTML = `
        <span>${step.label}</span>
        ${stepCount > 0 ? `<span class="framework-tab-count">${stepCount}</span>` : ''}
      `;

      btn.addEventListener('click', () => {
        state.activeFrameworkStep = step.id;
        renderCategory(cat.id);
      });

      frameworkNavBar.appendChild(btn);
    }
  }

  // Render Visual SVG Cards inside matching Option Groups (location, shotType, lighting, style)
  function renderGroupVisualCards(group, selectedSet, catId) {
    if (typeof VISUALS === 'undefined') return null;

    let visualMap = null;
    if (group.id === 'shotType') visualMap = VISUALS.shots;
    else if (group.id === 'style') visualMap = VISUALS.styles;
    else if (group.id === 'lighting') visualMap = VISUALS.lighting;
    else if (group.id === 'location') visualMap = VISUALS.locations;

    if (!visualMap) return null;

    const grid = document.createElement('div');
    grid.className = 'visual-cards-grid';

    for (const key in visualMap) {
      const item = visualMap[key];
      const targetVal = item.value || item.tag;
      // Match either exact value or partial match in group options
      const matchedOpt = (group.options || []).find(o => o.value === targetVal || o.value.includes(key.toLowerCase()));
      const finalValue = matchedOpt ? matchedOpt.value : targetVal;
      const isSelected = selectedSet.has(finalValue);

      const card = document.createElement('div');
      card.className = `visual-card ${isSelected ? 'active' : ''}`;
      card.innerHTML = `
        ${item.svg}
        <div class="visual-card-title">${item.title}</div>
        ${item.subtitle ? `<div class="visual-card-sub">${item.subtitle}</div>` : ''}
      `;

      card.addEventListener('click', () => {
        state.activeTemplateId = null;
        if (selectedSet.has(finalValue)) {
          selectedSet.delete(finalValue);
        } else {
          if (!group.multi) selectedSet.clear();
          selectedSet.add(finalValue);
        }
        renderSidebar();
        renderCategory(catId);
      });

      grid.appendChild(card);
    }

    return grid;
  }

  // Render Category Details & Option Groups
  function renderCategory(catId) {
    const cat = CATEGORIES[catId];
    if (!cat) return;

    catIcon.textContent = cat.icon;
    catName.textContent = cat.title;
    catDesc.textContent = cat.description;

    if (!state.selectedTags[catId]) {
      state.selectedTags[catId] = {};
    }

    renderQuickTemplates(catId);
    renderFrameworkNav(cat);

    optionGroupsContainer.innerHTML = '';
    const query = state.tagSearchQuery.trim().toLowerCase();

    for (const group of cat.groups) {
      if (group.nsfw && !state.nsfwMode) continue;
      if (state.activeFrameworkStep !== 'ALL' && group.framework && group.framework !== state.activeFrameworkStep) {
        continue;
      }

      if (!state.selectedTags[catId][group.id]) {
        state.selectedTags[catId][group.id] = new Set();
      }
      const selectedSet = state.selectedTags[catId][group.id];

      // Handle 24-Hour X-Axis Time Slider
      if (group.type === 'timeslider') {
        if (query && !group.title.toLowerCase().includes(query) && !'เวลา time เช้า เย็น ค่ำ คืน'.includes(query)) {
          continue;
        }

        if (!state.timeSliderSettings[catId]) {
          state.timeSliderSettings[catId] = { active: false, minutes: 1050 };
        }
        const timeConfig = state.timeSliderSettings[catId];
        const currentInfo = getTimeInfo(timeConfig.minutes);

        const groupCard = document.createElement('div');
        groupCard.className = `option-group time-slider-card ${timeConfig.active ? 'has-selection' : ''}`;

        const fwBadge = group.framework
          ? `<span class="badge-5w1h ${group.framework.toLowerCase()}">${group.framework}</span>`
          : '';

        groupCard.innerHTML = `
          <div class="time-slider-top">
            <div class="group-title">
              ${fwBadge}
              <span>${group.title}</span>
            </div>
            <div class="time-controls-actions">
              <div class="time-badge-box">
                <span class="time-icon-span" style="font-size: 16px;">${currentInfo.icon}</span>
                <span class="time-badge-clock">${currentInfo.timeStr} น.</span>
                <span class="time-badge-desc">${currentInfo.desc}</span>
              </div>
              <button class="btn-time-toggle ${timeConfig.active ? 'active' : ''}" type="button">
                ${timeConfig.active ? '✓ เปิดใช้เวลาแล้ว (คลิกเพื่อปิด)' : '+ เปิดระบุเวลา'}
              </button>
            </div>
          </div>
          <div class="time-presets-row"></div>
          <div class="time-track-wrapper">
            <input type="range" class="time-range-input" min="0" max="1439" step="15" value="${timeConfig.minutes}">
            <div class="time-axis-ticks">
              <span>00:00 (เที่ยงคืน)</span>
              <span>06:00 (รุ่งเช้า)</span>
              <span>12:00 (เที่ยงวัน)</span>
              <span>17:30 (โกลเด้นอาวร์)</span>
              <span>23:59 (ดึก)</span>
            </div>
          </div>
        `;

        const presetsRow = groupCard.querySelector('.time-presets-row');
        const sliderInput = groupCard.querySelector('.time-range-input');
        const toggleBtn = groupCard.querySelector('.btn-time-toggle');
        const clockSpan = groupCard.querySelector('.time-badge-clock');
        const descSpan = groupCard.querySelector('.time-badge-desc');
        const iconSpan = groupCard.querySelector('.time-icon-span');

        function syncTimeState() {
          const info = getTimeInfo(timeConfig.minutes);
          clockSpan.textContent = `${info.timeStr} น.`;
          descSpan.textContent = info.desc;
          iconSpan.textContent = info.icon;
          sliderInput.value = timeConfig.minutes;

          if (timeConfig.active) {
            groupCard.classList.add('has-selection');
            toggleBtn.className = 'btn-time-toggle active';
            toggleBtn.textContent = '✓ เปิดใช้เวลาแล้ว (คลิกเพื่อปิด)';
            selectedSet.clear();
            selectedSet.add(info.prompt);
          } else {
            groupCard.classList.remove('has-selection');
            toggleBtn.className = 'btn-time-toggle';
            toggleBtn.textContent = '+ เปิดระบุเวลา';
            selectedSet.clear();
          }

          // Update preset active states
          presetsRow.querySelectorAll('.time-preset-btn').forEach(btn => {
            const m = parseInt(btn.dataset.mins, 10);
            btn.classList.toggle('active', timeConfig.active && Math.abs(timeConfig.minutes - m) <= 20);
          });

          renderSidebar();
          renderFrameworkNav(cat);
          updateLivePreview();
        }

        // Render Quick Time Preset Buttons
        for (const preset of TIME_PRESETS) {
          const pBtn = document.createElement('button');
          pBtn.type = 'button';
          pBtn.dataset.mins = preset.mins;
          pBtn.className = `time-preset-btn ${timeConfig.active && Math.abs(timeConfig.minutes - preset.mins) <= 20 ? 'active' : ''}`;
          pBtn.textContent = preset.label;
          pBtn.addEventListener('click', () => {
            timeConfig.minutes = preset.mins;
            timeConfig.active = true;
            syncTimeState();
          });
          presetsRow.appendChild(pBtn);
        }

        sliderInput.addEventListener('input', (e) => {
          timeConfig.minutes = parseInt(e.target.value, 10);
          timeConfig.active = true;
          syncTimeState();
        });

        toggleBtn.addEventListener('click', () => {
          timeConfig.active = !timeConfig.active;
          syncTimeState();
        });

        if (timeConfig.active) {
          selectedSet.clear();
          selectedSet.add(currentInfo.prompt);
        }

        optionGroupsContainer.appendChild(groupCard);
        continue;
      }

      // Filter options by search query
      const filteredOptions = (group.options || []).filter(opt => {
        if (!query) return true;
        return (
          opt.label.toLowerCase().includes(query) ||
          opt.value.toLowerCase().includes(query) ||
          group.title.toLowerCase().includes(query)
        );
      });

      if (filteredOptions.length === 0) continue;

      const groupCard = document.createElement('div');
      groupCard.className = `option-group ${group.nsfw ? 'nsfw-group' : ''} ${selectedSet.size > 0 ? 'has-selection' : ''}`;

      const fwBadge = group.framework
        ? `<span class="badge-5w1h ${group.framework.toLowerCase()}">${group.framework}</span>`
        : '';

      const groupHeader = document.createElement('div');
      groupHeader.className = 'group-header';
      groupHeader.innerHTML = `
        <div class="group-title">
          ${fwBadge}
          <span>${group.title}</span>
        </div>
        <div class="group-header-right">
          ${selectedSet.size > 0 ? `<button type="button" class="btn-group-clear" title="ล้างตัวเลือกในหมวดย่อยนี้">ล้าง (${selectedSet.size})</button>` : ''}
          <span class="group-hint-badge ${group.multi ? 'multi' : 'single'}">
            ${group.multi ? 'เลือกได้หลายข้อ' : 'เลือกได้ 1 ข้อ (คลิกซ้ำเพื่อเอาออก)'}
          </span>
        </div>
      `;

      const clearGroupBtn = groupHeader.querySelector('.btn-group-clear');
      if (clearGroupBtn) {
        clearGroupBtn.addEventListener('click', () => {
          selectedSet.clear();
          state.activeTemplateId = null;
          renderSidebar();
          renderCategory(catId);
        });
      }

      groupCard.appendChild(groupHeader);

      // Optional Visual SVG Preview Cards (for shotType, style, lighting, location)
      if (!query) {
        const visualGrid = renderGroupVisualCards(group, selectedSet, catId);
        if (visualGrid) {
          groupCard.appendChild(visualGrid);
        }
      }

      // Special Sub-Filter Bar for Posture (ยืน / นั่ง / นอน / เคลื่อนไหว)
      if (group.id === 'posture' && !query) {
        const postureTabs = [
          { id: 'ALL', label: 'ทั้งหมด' },
          { id: '[ท่ายืน]', label: '🧍 ท่ายืน' },
          { id: '[ท่านั่ง]', label: '🪑 ท่านั่ง' },
          { id: '[ท่านอน]', label: '🛌 ท่านอน' },
          { id: '[ท่าเคลื่อนไหว]', label: '🏃 เคลื่อนไหว' }
        ];
        const subBar = document.createElement('div');
        subBar.className = 'subfilter-bar';
        for (const pt of postureTabs) {
          const sBtn = document.createElement('button');
          sBtn.type = 'button';
          sBtn.className = `subfilter-btn ${state.postureSubFilter === pt.id ? 'active' : ''}`;
          sBtn.textContent = pt.label;
          sBtn.addEventListener('click', () => {
            state.postureSubFilter = pt.id;
            renderCategory(catId);
          });
          subBar.appendChild(sBtn);
        }
        groupCard.appendChild(subBar);
      }

      // Render Interactive Chips (Both Single-Select and Multi-Select are now 1-click chips!)
      const chipsBox = document.createElement('div');
      chipsBox.className = 'chips-container';

      for (const opt of filteredOptions) {
        if (group.id === 'posture' && !query && state.postureSubFilter !== 'ALL') {
          if (!opt.label.startsWith(state.postureSubFilter)) continue;
        }

        const chip = document.createElement('div');
        const isSelected = selectedSet.has(opt.value);
        chip.className = `chip ${!group.multi ? 'single-choice' : ''} ${isSelected ? 'active' : ''} ${group.nsfw ? 'nsfw-chip' : ''}`;
        chip.innerHTML = formatBilingualChip(opt.label);
        chip.title = `Prompt: "${opt.value}"`;

        chip.addEventListener('click', () => {
          state.activeTemplateId = null;
          if (selectedSet.has(opt.value)) {
            selectedSet.delete(opt.value);
          } else {
            if (!group.multi) {
              selectedSet.clear();
            }
            selectedSet.add(opt.value);
          }
          renderSidebar();
          renderCategory(catId);
        });

        chipsBox.appendChild(chip);
      }

      groupCard.appendChild(chipsBox);
      optionGroupsContainer.appendChild(groupCard);
    }

    updateLivePreview();
  }

  // Render Active Selected Tags Tray in Bottom Dock
  function renderSelectedTagsTray() {
    const catId = state.activeCategory;
    const cat = CATEGORIES[catId];
    const catGroups = state.selectedTags[catId] || {};
    const activeItems = [];

    if (cat && cat.groups) {
      for (const group of cat.groups) {
        const set = catGroups[group.id];
        if (!set || set.size === 0) continue;

        if (group.type === 'timeslider') {
          const timeCfg = state.timeSliderSettings[catId];
          if (timeCfg && timeCfg.active) {
            const info = getTimeInfo(timeCfg.minutes);
            activeItems.push({
              groupId: group.id,
              isTime: true,
              label: `⏰ ${info.timeStr} น.`,
              value: info.prompt
            });
          }
          continue;
        }

        for (const val of set) {
          const matchedOpt = (group.options || []).find(o => o.value === val);
          const shortName = matchedOpt ? getShortLabel(matchedOpt.label) : val.slice(0, 24);
          activeItems.push({
            groupId: group.id,
            label: shortName,
            value: val
          });
        }
      }
    }

    selectedCountLabel.textContent = `แท็กที่เลือก (${activeItems.length}):`;
    selectedPillsContainer.innerHTML = '';

    if (activeItems.length === 0) {
      selectedPillsContainer.innerHTML = `<span class="tray-empty-hint">ยังไม่ได้เลือกแท็ก — คลิกเลือกแท็กด้านบน หรือกด "เทมเพลตเริ่มด่วน" เพื่อเริ่มต้น</span>`;
      return;
    }

    for (const item of activeItems) {
      const pill = document.createElement('span');
      pill.className = 'selected-pill';
      pill.innerHTML = `
        <span>${item.label}</span>
        <button type="button" class="selected-pill-remove" title="ลบแท็กนี้ออก">✕</button>
      `;

      pill.querySelector('.selected-pill-remove').addEventListener('click', () => {
        state.activeTemplateId = null;
        if (item.isTime && state.timeSliderSettings[catId]) {
          state.timeSliderSettings[catId].active = false;
        }
        if (catGroups[item.groupId]) {
          catGroups[item.groupId].delete(item.value);
        }
        renderSidebar();
        renderCategory(catId);
      });

      selectedPillsContainer.appendChild(pill);
    }
  }

  // Render Negative Prompt Preset Toggle Chips
  function renderNegativePresetsBar() {
    if (!negPresetsBar || typeof NEGATIVE_PRESETS === 'undefined') return;
    negPresetsBar.innerHTML = '';

    for (const preset of NEGATIVE_PRESETS) {
      const isAct = state.selectedNegativePresets.has(preset.id);
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `neg-preset-chip ${isAct ? 'active' : ''}`;
      chip.textContent = `${isAct ? '✓ ' : '+ '}${getShortLabel(preset.label)}`;
      chip.title = `คลิกเพื่อเปิด/ปิดการกัน: ${preset.tag}`;

      chip.addEventListener('click', () => {
        if (state.selectedNegativePresets.has(preset.id)) {
          state.selectedNegativePresets.delete(preset.id);
        } else {
          state.selectedNegativePresets.add(preset.id);
        }
        renderNegativePresetsBar();
        updateLivePreview();
      });

      negPresetsBar.appendChild(chip);
    }
  }

  // Render Aspect Ratio Chips
  function renderAspectChips() {
    aspectChipsContainer.innerHTML = '';

    for (const ar of ASPECT_RATIOS) {
      const chip = document.createElement('div');
      const isActive = state.activeAspect === ar.id;
      chip.className = `aspect-chip ${isActive ? 'active' : ''}`;

      const maxDim = 13;
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

      chip.title = `${ar.label} - เหมาะสำหรับ: ${ar.useCase}`;

      chip.addEventListener('click', () => {
        state.activeAspect = ar.id;
        renderAspectChips();
        updateLivePreview();
      });

      aspectChipsContainer.appendChild(chip);
    }
  }

  // Assembles the Positive Prompt in 5W1H Structured Order + Target AI Platform Formatting
  function getAssembledPositivePrompt() {
    const parts = [];
    const catId = state.activeCategory;
    const cat = CATEGORIES[catId];
    const catGroups = state.selectedTags[catId] || {};

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

    if (state.customText.trim()) {
      parts.push(state.customText.trim());
    }

    let promptStr = parts.join(', ');
    if (!promptStr) {
      return '💡 ยังไม่ได้เลือกแท็ก — ลองคลิกเลือก "เทมเพลตเริ่มด่วน" ด้านบน หรือจิ้มเลือกแท็กที่ชอบได้เลย!';
    }

    const arObj = ASPECT_RATIOS.find(a => a.id === state.activeAspect);

    if (state.targetPlatform === 'midjourney') {
      if (arObj) promptStr += ` ${arObj.tag}`;
    } else if (state.targetPlatform === 'flux') {
      if (arObj) promptStr += `, ${arObj.text}`;
    } else if (state.targetPlatform === 'sd') {
      if (!promptStr.toLowerCase().includes('masterpiece')) {
        promptStr = `masterpiece, best quality, ultra-detailed, ${promptStr}`;
      }
    }

    return promptStr;
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

  // Update Real-time Live Previews & Active Selection Tray
  function updateLivePreview() {
    renderSelectedTagsTray();

    const positive = getAssembledPositivePrompt();
    livePositivePreview.textContent = positive;

    const isPlaceholder = positive.startsWith('💡 ยังไม่ได้เลือกแท็ก');
    const words = !isPlaceholder && positive ? positive.trim().split(/\s+/).length : 0;
    promptCharCount.textContent = isPlaceholder ? '0 คำ' : `${words} คำ (${positive.length} ตัวอักษร)`;

    if (state.negativeActive) {
      negPreviewBox.style.display = 'flex';
      liveNegativePreview.textContent = getAssembledNegativePrompt() || '(ไม่ได้เลือกคำสั่งคัดออก)';
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

    state.activeTemplateId = null;
    if (!state.selectedTags[cat.id]) {
      state.selectedTags[cat.id] = {};
    }

    for (const group of cat.groups) {
      if (group.nsfw && !state.nsfwMode) continue;
      state.selectedTags[cat.id][group.id] = new Set();

      if (group.type === 'timeslider') {
        const randPreset = TIME_PRESETS[Math.floor(Math.random() * TIME_PRESETS.length)];
        state.timeSliderSettings[cat.id] = { active: true, minutes: randPreset.mins };
        state.selectedTags[cat.id][group.id].add(getTimeInfo(randPreset.mins).prompt);
        continue;
      }

      if (Math.random() > 0.25 && group.options && group.options.length > 0) {
        const randOpt = group.options[Math.floor(Math.random() * group.options.length)];
        state.selectedTags[cat.id][group.id].add(randOpt.value);
      }
    }

    renderSidebar();
    renderCategory(cat.id);
    showToast('สุ่มชุดแท็กไอเดียใหม่เรียบร้อยแล้ว! 🎲', 'info');
  }

  // Reset current category options
  function resetCurrentCategory() {
    const catId = state.activeCategory;
    state.activeTemplateId = null;
    state.selectedTags[catId] = {};
    state.timeSliderSettings[catId] = { active: false, minutes: 1050 };
    state.customText = '';
    customPromptInput.value = '';
    renderSidebar();
    renderCategory(catId);
    showToast('ล้างตัวเลือกทั้งหมดในหมวดนี้แล้ว', 'info');
  }

  // Add to History
  function addToHistory(category, positive, negative) {
    if (!positive || positive.startsWith('💡')) return;
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
    if (!positive || positive.startsWith('💡')) {
      showToast('กรุณาเลือกแท็กเพื่อสร้าง Prompt ก่อนบันทึก', 'warn');
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
    updateFavBadge();
    showToast('บันทึกเก็บเข้าคลังรายการโปรดเรียบร้อย! ★', 'success');
  }

  function renderHistoryModal() {
    historyListContainer.innerHTML = '';
    const list = activeHistoryTab === 'favorites' ? state.favorites : state.history;

    if (list.length === 0) {
      historyListContainer.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted); font-size: 13px;">
          ยังไม่มีรายการใน${activeHistoryTab === 'favorites' ? 'รายการโปรด' : 'ประวัติการคัดลอก'}
        </div>
      `;
      return;
    }

    for (const item of list) {
      const card = document.createElement('div');
      card.style.cssText = 'background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: 10px; padding: 12px 14px; display: flex; flex-direction: column; gap: 8px;';
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--text-muted);">
          <span>🏷️ หมวดหมู่: <strong>${item.category}</strong></span>
          <span>🕒 ${item.timestamp}</span>
        </div>
        <div style="font-size: 12px; color: #e2e8f0; font-family: monospace; line-height: 1.45; max-height: 65px; overflow-y: auto; user-select: text;">
          ${item.positive}
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 2px;">
          <button class="btn-action secondary btn-load-hist" style="padding: 4px 10px; font-size: 11px;">📥 นำมาแก้ไขต่อ</button>
          <button class="btn-action copy-main btn-copy-hist" style="padding: 4px 10px; font-size: 11px;">📋 คัดลอก</button>
          ${activeHistoryTab === 'favorites' ? '<button class="btn-action secondary btn-del-fav" style="padding: 4px 8px; font-size: 11px; color: #fb7185;">🗑️ ลบ</button>' : ''}
        </div>
      `;

      card.querySelector('.btn-copy-hist').addEventListener('click', () => {
        copyText(item.positive, 'Prompt');
      });

      card.querySelector('.btn-load-hist').addEventListener('click', () => {
        if (CATEGORIES[item.category]) {
          state.activeCategory = item.category;
        }
        state.customText = item.positive.replace(/\s*--ar\s+\S+/g, '').trim();
        customPromptInput.value = state.customText;
        historyModal.classList.remove('active');
        renderSidebar();
        renderCategory(state.activeCategory);
        showToast('นำ Prompt มาใส่ในช่องรายละเอียดเพิ่มเติมแล้ว', 'info');
      });

      if (activeHistoryTab === 'favorites') {
        card.querySelector('.btn-del-fav').addEventListener('click', () => {
          state.favorites = state.favorites.filter(f => f.id !== item.id);
          localStorage.setItem('imagept_favorites', JSON.stringify(state.favorites));
          updateFavBadge();
          renderHistoryModal();
          showToast('ลบออกจากรายการโปรดแล้ว', 'info');
        });
      }

      historyListContainer.appendChild(card);
    }
  }

  // Handle AI Auto-fill
  async function handleAutoFill() {
    const query = autofillInput.value.trim();
    if (!query) {
      showToast('กรุณาพิมพ์ไอเดียสั้นๆ ในช่องค้นหาด้านบนก่อนครับ', 'warn');
      autofillInput.focus();
      return;
    }

    btnAutofill.disabled = true;
    btnAutofill.textContent = 'กำลังค้นหา...';

    try {
      let ragMatches = [];
      if (typeof searchSimilar === 'function') {
        ragMatches = searchSimilar(query, 3);
      }

      const aiSettings = getAISettings();

      if (!aiSettings.apiKey && aiSettings.provider !== 'ollama') {
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

          showToast(`ดึงโครงสร้างใกล้เคียง: "${top.title}" เรียบร้อย!`, 'success');
          return;
        } else {
          showToast('กรุณาตั้งค่า API Key ในปุ่ม ⚙️ ตั้งค่า AI เพื่อใช้งาน AI เต็มรูปแบบ', 'warn');
          return;
        }
      }

      btnAutofill.textContent = 'AI กำลังจัดแท็ก...';

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
      btnAutofill.innerHTML = '<span>AI จัดแท็กให้</span><span style="font-size: 11px; opacity: 0.85;">↵</span>';
    }
  }

  // Handle Image to Prompt File Processing
  async function processImageFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('กรุณาเลือกไฟล์รูปภาพที่ถูกต้อง (PNG, JPG, WEBP)', 'warn');
      return;
    }

    state.currentImageMime = file.type;
    imagePromptModal.classList.add('active');
    imageMetadataStatus.textContent = 'กำลังอ่านข้อมูล Metadata จากรูปภาพ...';
    btnAnalyzeVisionAI.style.display = 'none';

    const reader = new FileReader();
    reader.onload = async (e) => {
      state.currentImageBase64 = e.target.result;
      imagePreviewImg.src = state.currentImageBase64;
      imagePreviewImg.style.display = 'block';
      imagePlaceholder.style.display = 'none';

      const arrayBuffer = await file.arrayBuffer();
      state.currentImageBuffer = arrayBuffer;

      try {
        const meta = await extractMetadata(arrayBuffer);
        if (meta.found) {
          imageMetadataStatus.innerHTML = `✅ ตรวจพบข้อมูล Prompt จาก <strong>${meta.source}</strong> (แกะสำเร็จทันทีแบบออฟไลน์)`;
          extractedPositive.value = meta.positivePrompt;
          extractedNegative.value = meta.negativePrompt;
          showToast(`ดึง Prompt จาก ${meta.source} เรียบร้อย!`, 'success');
        } else {
          imageMetadataStatus.innerHTML = `ℹ️ รูปนี้ไม่มี Metadata ฝังอยู่ — กดปุ่ม <strong>Vision AI</strong> ด้านล่างเพื่อให้ AI ช่วยดูภาพแล้วเขียน Prompt ให้ได้เลย`;
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

  // Event Listeners for Tag Search Box
  tagSearchInput.addEventListener('input', (e) => {
    state.tagSearchQuery = e.target.value;
    btnClearTagSearch.style.display = state.tagSearchQuery ? 'inline-block' : 'none';
    renderCategory(state.activeCategory);
  });

  btnClearTagSearch.addEventListener('click', () => {
    state.tagSearchQuery = '';
    tagSearchInput.value = '';
    btnClearTagSearch.style.display = 'none';
    renderCategory(state.activeCategory);
  });

  // Event Listeners for Target AI Platform Selector
  document.querySelectorAll('.platform-btn').forEach(btn => {
    if (btn.dataset.platform === state.targetPlatform) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', () => {
      state.targetPlatform = btn.dataset.platform;
      localStorage.setItem('imagept_platform', state.targetPlatform);
      document.querySelectorAll('.platform-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateLivePreview();
      showToast(`เปลี่ยนฟอร์แมต Prompt เป็นสำหรับ ${btn.textContent} แล้ว`, 'info');
    });
  });

  // Collapsible Bottom Dock Toggle
  btnToggleDock.addEventListener('click', () => {
    state.dockCollapsed = !state.dockCollapsed;
    bottomDock.classList.toggle('collapsed', state.dockCollapsed);
    dockToggleIcon.textContent = state.dockCollapsed ? '▲' : '▼';
    dockToggleText.textContent = state.dockCollapsed ? 'ขยายแถบ' : 'ย่อแถบ';
  });

  // NSFW & Negative Toggles
  nsfwToggle.checked = state.nsfwMode;
  if (state.nsfwMode) nsfwToggleWrapper.classList.add('nsfw-active');

  nsfwToggle.addEventListener('change', () => {
    state.nsfwMode = nsfwToggle.checked;
    localStorage.setItem('imagept_nsfw', state.nsfwMode);
    if (state.nsfwMode) {
      nsfwToggleWrapper.classList.add('nsfw-active');
      showToast('เปิดโหมด 18+ (ปลดล็อกชุดเซ็กซี่และหมวด 18+ Studio)', 'warn');
    } else {
      nsfwToggleWrapper.classList.remove('nsfw-active');
      if (state.activeCategory === 'nsfw') {
        state.activeCategory = 'person';
      }
      showToast('ปิดโหมด 18+ (กลับสู่โหมดปกติ)', 'info');
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

  if (btnCopyPosInline) {
    btnCopyPosInline.addEventListener('click', () => {
      copyText(getAssembledPositivePrompt(), 'Positive Prompt');
    });
  }

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

  if (imagePreviewContainer) {
    imagePreviewContainer.addEventListener('click', () => {
      filePickerInput.click();
    });
  }

  filePickerInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      processImageFile(e.target.files[0]);
    }
  });

  btnAnalyzeVisionAI.addEventListener('click', async () => {
    const aiSettings = getAISettings();
    if (!aiSettings.apiKey && aiSettings.provider !== 'ollama') {
      showToast('กรุณาระบุ API Key ในปุ่ม ⚙️ ตั้งค่า AI ก่อนใช้ Vision AI', 'warn');
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

  // Close modals when clicking outside modal-box
  [settingsModal, imagePromptModal, historyModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
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
  updateFavBadge();
  renderNegativePresetsBar();
  renderSidebar();
  renderCategory(state.activeCategory);
  renderAspectChips();
  updateLivePreview();
});
