// Masterpiece prompt knowledgebase for Pure JS Vector Store & RAG Semantic Search

const PROMPTS_KNOWLEDGE = [
  {
    id: 'thai-portrait-1',
    category: 'person',
    title: 'หญิงสาวไทยในชุดร่วมสมัยยามเย็น',
    keywords: ['thai', 'woman', 'portrait', 'silk', 'golden hour', 'street', 'bangkok', 'งาม', 'คนไทย', 'ชุดไทย'],
    prompt: 'a stunning young Thai woman, 22 years old, wearing contemporary modern Thai silk dress, gentle radiant smile, long flowing wavy hair, warm golden hour sunset lighting, shot on 85mm prime lens f/1.4, creamy smooth background bokeh, hyperrealistic 8k resolution, award-winning photography',
    negative: 'bad anatomy, deformed, mutated, extra limbs, bad hands, blurry, watermark',
    aspect: '4:5'
  },
  {
    id: 'cyberpunk-city-1',
    category: 'landscape',
    title: 'มหานครไซเบอร์พังก์สายฝนและนีออน',
    keywords: ['cyberpunk', 'city', 'neon', 'rain', 'futuristic', 'night', 'skyscrapers', 'เมือง', 'อนาคต'],
    prompt: 'futuristic cyberpunk city skyline at night, towering holographic neon skyscrapers, gentle rain shower with reflective wet asphalt, glowing magenta and cyan light ribbons, cinematic film still, anamorphic widescreen lens flare, masterpiece, ultra-detailed',
    negative: 'lowres, bad quality, blurry, pixelated, daytime, sunny',
    aspect: '16:9'
  },
  {
    id: 'luxury-skincare-1',
    category: 'product',
    title: 'ขวดสกินแคร์หรูหราบนแท่นหินอ่อน',
    keywords: ['cosmetic', 'skincare', 'bottle', 'marble', 'pedestal', 'luxury', 'commercial', 'สินค้า', 'เครื่องสำอาง'],
    prompt: 'luxury glass serum skincare dropper bottle, resting on an elegant carved white Carrara marble pedestal, surrounded by fresh lush monstera leaves, commercial studio lighting with large diffused softboxes, caustic water light ripples, 8k commercial photography',
    negative: 'watermark, text, low quality, dirty, scratches, deformed',
    aspect: '1:1'
  },
  {
    id: 'tech-logo-1',
    category: 'logo',
    title: 'โลโก้มินิมอลเวกเตอร์สตาร์ตอัป AI',
    keywords: ['logo', 'minimalist', 'vector', 'tech', 'ai', 'startup', 'geometric', 'โลโก้', 'เทคโนโลยี'],
    prompt: 'clean modern minimalist flat vector logo design, geometric interlocking monogram lettermark, for an innovative cutting-edge AI technology startup, vibrant modern purple-to-cyan smooth gradient, isolated on plain solid white background, zero shadows, Dribbble trending',
    negative: 'realistic photograph, 3d render, watermark, complex noise, grunge',
    aspect: '1:1'
  },
  {
    id: 'fantasy-book-cover-1',
    category: 'cover',
    title: 'ปกหนังสือนิยายแฟนตาซีดินแดนเวทมนตร์',
    keywords: ['book', 'cover', 'novel', 'fantasy', 'magic', 'portal', 'hero', 'ปก', 'นิยาย'],
    prompt: 'bestseller fantasy book cover illustration, charismatic protagonist standing heroically in center, mysterious glowing ethereal gateway in background, clean empty negative space at the top reserved for bold title typography, dramatic cinematic lighting, ArtStation trending, 8k resolution',
    negative: 'bad anatomy, extra limbs, text on body, low quality, blurry',
    aspect: '4:5'
  },
  {
    id: 'web-hero-banner-1',
    category: 'banner',
    title: 'แบนเนอร์เว็บไซต์คลื่น 3D นวัตกรรม',
    keywords: ['banner', 'web', 'hero', 'header', 'waves', '3d', 'abstract', 'แบนเนอร์', 'หัวเว็บ'],
    prompt: 'modern website landing page hero banner header, ultrawide format, futuristic 3D flowing glossy waves, glassmorphism ribbons, tech ambiance, focal visual element on the right, ample clean negative space on the left for text, vibrant neon gradient mesh, 8k resolution',
    negative: 'cluttered, low resolution, artifacts, chaotic, ugly',
    aspect: '21:9'
  },
  {
    id: 'nsfw-boudoir-1',
    category: 'nsfw',
    title: 'ถ่ายแบบ Boudoir หรูหราในห้องนอนเพนต์เฮาส์',
    keywords: ['boudoir', 'sensual', 'glamour', 'lingerie', 'penthouse', 'satin', 'cleavage', 'เซ็กซี่', 'ชุดชั้นใน', 'วาบหวิว'],
    prompt: 'intimate luxury hotel boudoir photography, wearing exquisite delicate black lace lingerie, sensually reclining on luxury silk bedsheets, alluring deep cleavage, glistening dewy glowing skin, low-key warm candlelit intimate atmosphere, soft deep shadows, 35mm film grain, masterpiece',
    negative: 'bad anatomy, deformed, mutated, extra fingers, blurry, watermark, ugly',
    aspect: '4:5'
  },
  {
    id: 'anime-shinkai-1',
    category: 'person',
    title: 'สาวอนิเมะใต้ท้องฟ้าฤดูร้อนสไตล์ชินไค',
    keywords: ['anime', 'girl', 'sky', 'clouds', 'summer', 'shinkai', 'อนิเมะ', 'การ์ตูน'],
    prompt: 'breathtaking anime key visual, Makoto Shinkai aesthetic, cute teenage girl with windblown hair, looking at cumulus clouds under vast blue sky, radiant sunbeams, luminous vibrant art, highly detailed anime illustration, 8k resolution',
    negative: 'photorealistic, 3d render, deformed face, bad hands, lowres',
    aspect: '16:9'
  },
  {
    id: 'alpine-lake-1',
    category: 'landscape',
    title: 'ทะเลสาบสะท้อนยอดเขาหิมะยามพระอาทิตย์ขึ้น',
    keywords: ['lake', 'mountain', 'snow', 'sunrise', 'reflection', 'nature', 'วิว', 'ภูเขา', 'ธรรมชาติ'],
    prompt: 'crystal-clear mountain lake with perfect glassy reflection of alpine peaks, early morning dawn, pink and orange sky, soft drifting fog, ultra-wide angle 14mm lens expansive perspective, National Geographic award-winning landscape photography, 8k resolution',
    negative: 'people, buildings, trash, blurry, overcast, low quality',
    aspect: '16:9'
  },
  {
    id: 'vintage-cafe-logo-1',
    category: 'logo',
    title: 'โลโก้ตราประทับร้านกาแฟคลาสสิก',
    keywords: ['coffee', 'cafe', 'vintage', 'emblem', 'badge', 'craft', 'ร้านกาแฟ'],
    prompt: 'vintage retro badge emblem with intricate decorative linework, for a cozy specialty artisan coffee roastery, earthy organic tones, terracotta and warm gold, isolated on plain solid white background, clean vector design',
    negative: 'colorful, 3d, gradient, noisy, messy',
    aspect: '1:1'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PROMPTS_KNOWLEDGE };
}
