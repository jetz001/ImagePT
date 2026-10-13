# ImagePT - AI Image Prompt Studio 🎨✨

**ImagePT** คือโปรแกรม Desktop Application (พัฒนาด้วย Node.js + Electron) สำหรับสร้าง, ออกแบบ, ปรับแต่ง และถอดรหัส Prompt ภาษาอังกฤษระดับมืออาชีพสำหรับ AI Image Generators ชั้นนำ เช่น **Midjourney (v6), Stable Diffusion, FLUX.1, NovelAI, และ DALL-E 3**

---

## 🌟 ฟีเจอร์เด่น (Key Features)

### 1. 👤 สถาปัตยกรรมตัวละครแบบ "หัวจรดเท้า" (Head-to-Toe Architecture)
จัดเรียงองค์ประกอบตัวละครอย่างเป็นระบบตามหลักกายภาพและการเล่าเรื่อง (5W1H):
- **ข้อมูลบุคคล (Identity):** เพศ, ช่วงวัย, สัญชาติ/เชื้อชาติ (Dropdown)
- **ศีรษะและใบหน้า (Head & Face):** ทรงผม, สีผม, แว่นตา/เครื่องประดับศีรษะ, สีหน้าและแววตา
- **เสื้อผ้าท่อนบน (Tops & Upper Body):** สายเดี่ยว (Spaghetti strap), เกาะอก (Tube top), เสื้อกล้ามผ้าร่อง, เสื้อคล้องคอ, เสื้อปาดไหล่, เสื้อครอป, สเวตเตอร์, ฮู้ดดี้, แจ็กเก็ตหนัง ฯลฯ
- **เสื้อผ้าท่อนล่าง (Bottoms & Lower Body):** กางเกงยีนส์เอวสูง, กระโปรงเทนนิส, ขาสั้น, กางเกงคาร์โก้, กางเกงสแล็ค ฯลฯ
- **ชุดเต็มตัวและเดรส (Dresses & Outfits):** เดรสสายเดี่ยวซาติน, ซัมเมอร์เดรสลายดอกไม้, ชุดไทยประยุกต์, สูททำงาน, กี่เพ้า, ฮันบก ฯลฯ
- **รองเท้า (Footwear & Shoes):** สนีกเกอร์, ส้นสูงสายรัด, บูทหนัง, แตะมินิมอล, โลฟเฟอร์, เท้าเปล่า (Dropdown)
- **พร็อพในมือ (Props & Handheld):** แก้วกาแฟ, กล้องฟิล์ม, ร่มใส, ช่อดอกไม้, กระเป๋าถือแบรนด์เนม ฯลฯ
- **อิริยาบถและท่าโพสหลัก (Body Posture):** ท่ายืน, ท่านั่ง, ท่านอน, ท่าเคลื่อนไหว/ก้าวเดิน (Dropdown)

### 2. ⏰ สไลเดอร์แกน X ช่วงเวลา 24 ชม. (24-Hour X-Axis Timeline Slider: 00:00 - 23:59)
- ปรับเลื่อนแถบแกน X ได้อย่างอิสระตลอด 24 ชั่วโมง
- ไล่เฉดสีกลางวัน-กลางคืนแบบไดนามิก (กลางคืน 🌌, บลูอาวร์, พระอาทิตย์ขึ้น 🌅, แดดเช้า ☀️, เที่ยงวัน, บ่ายคล้อย 🌤️, โกลเด้นอาวร์ 🌇, พลบค่ำ 🌆)
- แปลงเป็นคีย์เวิร์ดจัดแสงของเวลาแบบมิลลิวินาที

### 3. 💡 การจัดแสง & 📷 เทคนิคกล้อง & 🎨 สไตล์ภาพจัดเต็ม
- **การจัดแสงบริสุทธิ์ (Pure Lighting Setup):** Rembrandt, Softbox, Rim Backlight, Spotlight Chiaroscuro, Window light, Neon dual-tone, God rays, Candlelit
- **เทคนิคเลนส์และกล้อง (Camera Techniques):** เลนส์ 85mm f/1.4 โบเก้, เลนส์มุมกว้าง 24mm, เลนส์เทเล 200mm, เลนส์มาโคร, สปีดชัตเตอร์สูง, ลองเอ็กซ์โพเชอร์, แฟลร์แสง
- **สไตล์ภาพและศิลปะกว่า 24 สไตล์ (Art Style & Rendering):** ภาพถ่ายสมจริง 8K, ภาพยนตร์ฟิล์มอนามอร์ฟิก 35mm, ฟิล์มวินเทจ 90s, โพลารอยด์, ขาวดำคอนทราสต์สูง, อนิเมะ Makoto Shinkai, สตูดิโอจิบลิ, 3D Unreal Engine 5 / Octane, สีน้ำ, สีน้ำมันเรเนซองส์, ไซเบอร์พังก์เรโทรเวฟ, Vogue Editorial ฯลฯ

### 4. 🔞 โหมด 18+ (NSFW Mode) ปลดล็อกได้ตามต้องการ
- สวิตช์เปิด/ปิดโหมด 18+ ที่มุมขวาบน
- ปลดล็อกหมวดหมู่พิเศษ **18+ NSFW Studio** (Sensual Glamour, Boudoir, Fine Art Nude, Lingerie)

### 5. 📷 Hybrid Image-to-Prompt (ถอดรหัสรูปเป็น Prompt)
- **ออฟไลน์ 100% (ExifReader):** ลากไฟล์ภาพ PNG จาก Stable Diffusion A1111, ComfyUI, NovelAI มาปล่อย อ่าน Prompt, Negative Prompt, Seed, Steps ได้ทันทีโดยไม่ต้องต่ออินเทอร์เน็ต
- **Vision AI Mode:** มีปุ่มส่งให้ Gemini / OpenAI / OpenRouter ช่วยถอดรหัสรูปถ่ายทั่วไปได้ทันที

### 6. 🧠 Pure JS Vector Store & Universal AI Auto-fill
- ค้นหาตัวอย่าง Prompt ระดับมาสเตอร์พีซด้วย Cosine Similarity แบบออฟไลน์
- รองรับการเชื่อมต่อ AI: OpenAI, Google Gemini, OpenRouter, และ Ollama (Local)

### 7. 🔌 Built-in Model Context Protocol (MCP Server)
- รองรับมาตรฐาน MCP (stdio JSON-RPC) ให้ AI Agent หรือระบบภายนอกเรียกใช้งานเครื่องมือได้ทันที
- คำสั่งทดสอบ: `npm run mcp:server -- --test`

---

## 🚀 การติดตั้งและเริ่มใช้งาน (Installation & Run)

```bash
# ติดตั้ง dependencies
npm install

# รันแอปพลิเคชัน Desktop
npm start

# รัน MCP Server สำหรับ AI Agent
npm run mcp:server
```

---

## 🛠️ โครงสร้างโปรเจกต์ (Project Structure)

```
ImagePT/
├── main.js                  # Electron Main Process (Single-Instance, GPU Cache Safety)
├── preload.js               # Secure IPC Preload Bridge
├── package.json
├── src/
│   ├── index.html           # Desktop GUI UI
│   ├── js/
│   │   └── app.js           # Core Application Logic, Reactive State & Event Listeners
│   ├── styles/
│   │   └── app.css          # Dark Mode Modern UI Styles & 24h Slider Track
│   ├── data/
│   │   ├── categories.js    # Data definitions (Head-to-Toe, 24h Time, Styles, Lighting)
│   │   └── promptsKnowledge.js # Vector Store RAG knowledgebase
│   ├── services/
│   │   ├── vectorStore.js   # Pure JS Offline Vector Store (Cosine Similarity)
│   │   ├── aiService.js     # Universal AI Client (Gemini, OpenAI, OpenRouter, Ollama)
│   │   └── imageToPrompt.js # ExifReader PNG Metadata extraction
│   └── mcp/
│       ├── server.js        # Built-in Model Context Protocol Server
│       └── qa_test.js       # QA Automated Verification Suite
```

---

## 📄 License
MIT License
