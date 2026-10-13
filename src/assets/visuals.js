// Embedded high quality SVG diagrams and visual cards for inline previews

const VISUALS = {
  // Shot Distance SVG Diagrams
  shots: {
    'Close-up': {
      title: 'โคลสอัพใบหน้า (Close-up)',
      subtitle: 'เน้นรายละเอียดดวงตา ผิว และอารมณ์',
      value: 'intimate extreme close-up portrait, detailed eyes and skin texture',
      svg: `<svg viewBox="0 0 100 100" class="visual-svg">
        <rect width="100" height="100" rx="12" fill="#131b2e" />
        <circle cx="50" cy="50" r="32" fill="#2d3748" stroke="#6366f1" stroke-width="2.5" />
        <circle cx="40" cy="45" r="4" fill="#a5b4fc" />
        <circle cx="60" cy="45" r="4" fill="#a5b4fc" />
        <path d="M 42 60 Q 50 68 58 60" stroke="#f43f5e" stroke-width="2" fill="none" stroke-linecap="round" />
        <path d="M 28 35 Q 50 15 72 35" stroke="#818cf8" stroke-width="3" fill="none" stroke-linecap="round" />
        <rect x="18" y="18" width="64" height="64" rx="4" fill="none" stroke="#e0e7ff" stroke-width="1.5" stroke-dasharray="4,4" />
      </svg>`
    },
    'Half-body': {
      title: 'ครึ่งตัว (Medium Shot)',
      subtitle: 'เห็นตั้งแต่ช่วงเอวขึ้นไป เหมาะกับพอร์ตเทรตมาตรฐาน',
      value: 'medium half-body portrait shot from waist up',
      svg: `<svg viewBox="0 0 100 100" class="visual-svg">
        <rect width="100" height="100" rx="12" fill="#131b2e" />
        <circle cx="50" cy="32" r="16" fill="#2d3748" stroke="#6366f1" stroke-width="2" />
        <path d="M 28 85 L 32 55 Q 50 50 68 55 L 72 85 Z" fill="#3b4252" stroke="#818cf8" stroke-width="2" />
        <rect x="14" y="10" width="72" height="80" rx="4" fill="none" stroke="#e0e7ff" stroke-width="1.5" stroke-dasharray="4,4" />
      </svg>`
    },
    'Full-body': {
      title: 'เต็มตัว (Full-body)',
      subtitle: 'เห็นศีรษะจรดปลายเท้า แสดงเสื้อผ้าและสภาพแวดล้อม',
      value: 'full-length full-body fashion shot',
      svg: `<svg viewBox="0 0 100 100" class="visual-svg">
        <rect width="100" height="100" rx="12" fill="#131b2e" />
        <circle cx="50" cy="20" r="9" fill="#2d3748" stroke="#6366f1" stroke-width="1.5" />
        <path d="M 38 48 L 42 33 Q 50 30 58 33 L 62 48 Z" fill="#3b4252" stroke="#818cf8" stroke-width="1.5" />
        <path d="M 43 48 L 41 85 M 57 48 L 59 85" stroke="#a5b4fc" stroke-width="3" stroke-linecap="round" />
        <line x1="30" y1="88" x2="70" y2="88" stroke="#4c566a" stroke-width="2" stroke-linecap="round" />
      </svg>`
    },
    'Eye-level': {
      title: 'ระดับสายตา (Eye-level)',
      subtitle: 'มุมมองธรรมชาติ ตรงไปตรงมา เชื่อมโยงความรู้สึกได้ดี',
      value: 'straight-on eye-level candid perspective',
      svg: `<svg viewBox="0 0 100 100" class="visual-svg">
        <rect width="100" height="100" rx="12" fill="#131b2e" />
        <path d="M 15 50 Q 50 20 85 50 Q 50 80 15 50 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
        <circle cx="50" cy="50" r="14" fill="#0f172a" stroke="#818cf8" stroke-width="2" />
        <circle cx="50" cy="50" r="6" fill="#38bdf8" />
      </svg>`
    }
  },

  // Art Styles Visual Cards
  styles: {
    'Photorealistic': {
      title: 'ภาพถ่ายสมจริง (Photorealistic)',
      tag: 'hyperrealistic award-winning 35mm photography, sharp pores, 8k resolution',
      badge: 'Realism',
      color: '#38bdf8',
      svg: `<svg viewBox="0 0 120 75" class="visual-card-svg">
        <defs>
          <linearGradient id="photoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
        </defs>
        <rect width="120" height="75" rx="8" fill="url(#photoGrad)" />
        <circle cx="60" cy="38" r="22" fill="#1e293b" stroke="#38bdf8" stroke-width="2" />
        <circle cx="60" cy="38" r="16" fill="#0f172a" stroke="#60a5fa" stroke-width="1.5" />
        <circle cx="56" cy="34" r="4" fill="#93c5fd" opacity="0.8" />
        <path d="M 35 18 L 45 18 L 48 14 L 72 14 L 75 18 L 85 18" stroke="#94a3b8" stroke-width="1.5" fill="none" />
      </svg>`
    },
    'Cinematic': {
      title: 'ภาพยนตร์ (Cinematic Film)',
      tag: 'cinematic film still, 35mm kodak grain, Panavision composition',
      badge: 'Movie Look',
      color: '#f59e0b',
      svg: `<svg viewBox="0 0 120 75" class="visual-card-svg">
        <rect width="120" height="75" rx="8" fill="#111827" />
        <rect x="0" y="8" width="120" height="59" fill="#1f2937" />
        <path d="M 15 25 L 35 25 L 25 40 Z" fill="#f59e0b" opacity="0.6" />
        <path d="M 85 50 Q 105 20 115 45" stroke="#06b6d4" stroke-width="2" fill="none" />
        <circle cx="60" cy="38" r="12" fill="#f59e0b" opacity="0.3" filter="blur(2px)" />
        <line x1="0" y1="8" x2="120" y2="8" stroke="#f59e0b" stroke-width="2" />
        <line x1="0" y1="67" x2="120" y2="67" stroke="#f59e0b" stroke-width="2" />
      </svg>`
    },
    'Anime': {
      title: 'อนิเมะพรีเมียม (Anime Art)',
      tag: 'breathtaking anime key visual, Makoto Shinkai aesthetic, luminous vibrant art',
      badge: 'Anime',
      color: '#ec4899',
      svg: `<svg viewBox="0 0 120 75" class="visual-card-svg">
        <defs>
          <linearGradient id="animeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#31103f" />
            <stop offset="100%" stop-color="#191d3a" />
          </linearGradient>
        </defs>
        <rect width="120" height="75" rx="8" fill="url(#animeGrad)" />
        <path d="M 20 60 Q 60 10 100 60" stroke="#f472b6" stroke-width="2.5" fill="none" />
        <circle cx="60" cy="30" r="14" fill="#fb7185" opacity="0.3" />
        <polygon points="60,18 63,26 71,26 65,31 67,39 60,34 53,39 55,31 49,26 57,26" fill="#fdf2f8" />
        <circle cx="35" cy="45" r="2" fill="#f472b6" />
        <circle cx="85" cy="40" r="3" fill="#38bdf8" />
      </svg>`
    },
    '3D Render': {
      title: '3D เรนเดอร์ (UE5 / Octane)',
      tag: 'rendered in Unreal Engine 5, Octane render, photorealistic global illumination',
      badge: '3D CGI',
      color: '#8b5cf6',
      svg: `<svg viewBox="0 0 120 75" class="visual-card-svg">
        <rect width="120" height="75" rx="8" fill="#18132b" />
        <polygon points="60,14 88,30 60,46 32,30" fill="#6d28d9" stroke="#c084fc" stroke-width="1.5" />
        <polygon points="32,30 60,46 60,68 32,52" fill="#4c1d95" stroke="#c084fc" stroke-width="1.5" />
        <polygon points="88,30 60,46 60,68 88,52" fill="#5b21b6" stroke="#c084fc" stroke-width="1.5" />
      </svg>`
    },
    'Cyberpunk': {
      title: 'ไซเบอร์พังก์ (Cyberpunk Neon)',
      tag: 'futuristic cyberpunk aesthetic, glowing neon lights, rain reflections, high contrast',
      badge: 'Sci-Fi',
      color: '#06b6d4',
      svg: `<svg viewBox="0 0 120 75" class="visual-card-svg">
        <rect width="120" height="75" rx="8" fill="#090d16" />
        <line x1="10" y1="55" x2="110" y2="55" stroke="#06b6d4" stroke-width="2" />
        <line x1="20" y1="20" x2="40" y2="55" stroke="#ec4899" stroke-width="2" stroke-dasharray="3,3" />
        <rect x="50" y="25" width="20" height="30" fill="none" stroke="#06b6d4" stroke-width="1.5" />
        <text x="60" y="45" fill="#f43f5e" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">AI</text>
      </svg>`
    },
    'Watercolor': {
      title: 'สีน้ำศิลปะ (Watercolor)',
      tag: 'delicate expressive watercolor illustration with soft color bleeds, textured paper',
      badge: 'Painting',
      color: '#10b981',
      svg: `<svg viewBox="0 0 120 75" class="visual-card-svg">
        <rect width="120" height="75" rx="8" fill="#0f261d" />
        <circle cx="45" cy="38" r="18" fill="#10b981" opacity="0.4" filter="blur(3px)" />
        <circle cx="70" cy="40" r="16" fill="#06b6d4" opacity="0.4" filter="blur(3px)" />
        <path d="M 30 50 Q 60 20 90 45" stroke="#34d399" stroke-width="2" fill="none" stroke-linecap="round" />
      </svg>`
    }
  },

  // Lighting Visual Cards
  lighting: {
    'Golden Hour': {
      title: 'แสงอาทิตย์ยามเย็น (Golden Hour)',
      tag: 'warm golden hour sunset lighting, soft golden rim light',
      color: '#f59e0b',
      svg: `<svg viewBox="0 0 80 50" class="visual-mini-svg">
        <rect width="80" height="50" rx="6" fill="#2b1a06" />
        <circle cx="40" cy="38" r="20" fill="#f59e0b" opacity="0.9" />
        <line x1="40" y1="8" x2="40" y2="15" stroke="#fbbf24" stroke-width="2" />
        <line x1="20" y1="18" x2="25" y2="23" stroke="#fbbf24" stroke-width="2" />
        <line x1="60" y1="18" x2="55" y2="23" stroke="#fbbf24" stroke-width="2" />
      </svg>`
    },
    'Studio Softbox': {
      title: 'สตูดิโอซอฟต์บ็อกซ์ (Studio Softbox)',
      tag: 'professional studio Rembrandt lighting, balanced key light',
      color: '#e2e8f0',
      svg: `<svg viewBox="0 0 80 50" class="visual-mini-svg">
        <rect width="80" height="50" rx="6" fill="#1e293b" />
        <polygon points="15,10 35,18 35,32 15,40" fill="#475569" stroke="#94a3b8" stroke-width="1.5" />
        <path d="M 35 25 L 68 12 M 35 25 L 70 25 M 35 25 L 68 38" stroke="#f8fafc" stroke-width="1.5" stroke-dasharray="3,3" />
      </svg>`
    },
    'Neon Glow': {
      title: 'นีออนไซเบอร์พังก์ (Neon Glow)',
      tag: 'moody cyberpunk neon rim lights, vivid blue and magenta reflections',
      color: '#f43f5e',
      svg: `<svg viewBox="0 0 80 50" class="visual-mini-svg">
        <rect width="80" height="50" rx="6" fill="#14081c" />
        <circle cx="30" cy="25" r="12" fill="#06b6d4" opacity="0.6" filter="blur(2px)" />
        <circle cx="50" cy="25" r="12" fill="#f43f5e" opacity="0.6" filter="blur(2px)" />
        <line x1="10" y1="42" x2="70" y2="42" stroke="#e879f9" stroke-width="2" />
      </svg>`
    },
    'Rembrandt': {
      title: 'ดรามาติกแสงเงา (Rembrandt Dramatic)',
      tag: 'low-key warm candlelit intimate atmosphere, soft deep shadows, dramatic contrast',
      color: '#d97706',
      svg: `<svg viewBox="0 0 80 50" class="visual-mini-svg">
        <rect width="80" height="50" rx="6" fill="#0f0c07" />
        <path d="M 10 10 L 45 40 L 10 40 Z" fill="#d97706" opacity="0.5" />
        <circle cx="48" cy="22" r="10" fill="#3b2712" stroke="#d97706" stroke-width="1.5" />
      </svg>`
    }
  },

  // Location Visual Cards (WHERE)
  locations: {
    'Cafe': {
      title: 'คาเฟ่อบอุ่น (Cozy Cafe)',
      value: 'in a cozy aesthetic minimalist wooden cafe with warm ambient light',
      color: '#d97706',
      svg: `<svg viewBox="0 0 120 75" class="visual-card-svg">
        <rect width="120" height="75" rx="8" fill="#20150a" />
        <rect x="20" y="45" width="80" height="6" rx="2" fill="#78350f" />
        <ellipse cx="60" cy="40" rx="14" ry="4" fill="#92400e" />
        <path d="M 48 40 L 51 28 Q 60 28 69 28 L 72 40 Z" fill="#b45309" stroke="#d97706" stroke-width="1.5" />
        <path d="M 56 22 Q 58 16 56 12 M 64 22 Q 66 16 64 12" stroke="#fef3c7" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.6" />
      </svg>`
    },
    'Beach': {
      title: 'ชายหาดทะเล (Tropical Beach)',
      value: 'on a pristine tropical sun-drenched ocean beach with turquoise waves and white sand',
      color: '#06b6d4',
      svg: `<svg viewBox="0 0 120 75" class="visual-card-svg">
        <rect width="120" height="75" rx="8" fill="#082f49" />
        <circle cx="85" cy="22" r="12" fill="#fbbf24" opacity="0.8" />
        <path d="M 0 52 Q 30 45 60 52 Q 90 58 120 50 L 120 75 L 0 75 Z" fill="#0284c7" />
        <path d="M 0 62 Q 40 58 80 64 Q 100 66 120 62 L 120 75 L 0 75 Z" fill="#fde68a" />
      </svg>`
    },
    'Neon Street': {
      title: 'ตรอกนีออน (Neon Street)',
      value: 'on a vibrant neon-lit street alley in Tokyo at night, glowing signs',
      color: '#f43f5e',
      svg: `<svg viewBox="0 0 120 75" class="visual-card-svg">
        <rect width="120" height="75" rx="8" fill="#090514" />
        <line x1="25" y1="10" x2="25" y2="65" stroke="#06b6d4" stroke-width="3" />
        <line x1="95" y1="15" x2="95" y2="65" stroke="#f43f5e" stroke-width="3" />
        <polygon points="45,65 75,65 65,30 55,30" fill="#1e1135" stroke="#a855f7" stroke-width="1.5" />
        <ellipse cx="60" cy="65" rx="40" ry="8" fill="#3b0764" opacity="0.5" />
      </svg>`
    },
    'Rooftop': {
      title: 'ดาดฟ้าตึก (Rooftop Vista)',
      value: 'on a luxury skyscraper rooftop terrace overlooking glowing city skyline',
      color: '#6366f1',
      svg: `<svg viewBox="0 0 120 75" class="visual-card-svg">
        <rect width="120" height="75" rx="8" fill="#0b0f19" />
        <rect x="15" y="35" width="16" height="40" fill="#1e293b" />
        <rect x="35" y="20" width="22" height="55" fill="#334155" />
        <rect x="62" y="28" width="18" height="47" fill="#1e293b" />
        <rect x="85" y="15" width="20" height="60" fill="#475569" />
        <line x1="0" y1="65" x2="120" y2="65" stroke="#6366f1" stroke-width="2" />
      </svg>`
    },
    'Garden': {
      title: 'สวนธรรมชาติ (Flower Garden)',
      value: 'in a blooming colorful botanical garden under soft dappled sunlight',
      color: '#10b981',
      svg: `<svg viewBox="0 0 120 75" class="visual-card-svg">
        <rect width="120" height="75" rx="8" fill="#062215" />
        <circle cx="35" cy="50" r="16" fill="#047857" opacity="0.7" />
        <circle cx="85" cy="45" r="20" fill="#059669" opacity="0.7" />
        <circle cx="60" cy="55" r="5" fill="#f43f5e" />
        <circle cx="45" cy="45" r="4" fill="#fbbf24" />
        <circle cx="78" cy="40" r="4" fill="#ec4899" />
      </svg>`
    },
    'Studio': {
      title: 'สตูดิโอสีขาว (White Studio)',
      value: 'in a clean minimalist white infinity cyclorama photo studio backdrop',
      color: '#e2e8f0',
      svg: `<svg viewBox="0 0 120 75" class="visual-card-svg">
        <rect width="120" height="75" rx="8" fill="#1e293b" />
        <path d="M 20 60 Q 60 55 100 60 L 100 20 Q 60 20 20 20 Z" fill="#f8fafc" opacity="0.9" />
        <ellipse cx="60" cy="55" rx="25" ry="5" fill="#94a3b8" opacity="0.5" />
      </svg>`
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VISUALS };
}
