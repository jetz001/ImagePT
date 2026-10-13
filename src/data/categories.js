// Data definitions for ImagePT categories, tags, aspect ratios, and negative presets

const CATEGORIES = {
  person: {
    id: 'person',
    title: 'รูปคน (People & Portraits)',
    icon: '👤',
    description: 'ระบบสร้างรูปบุคคลระดับมืออาชีพ เจาะลึกสรีระ สัญชาติ เสื้อผ้า สถานที่ถ่ายทำ พร็อพ ท่าทาง และแสง',
    groups: [
      // 1. ข้อมูลพื้นฐานบุคคล (Basic Identity)
      {
        id: 'genderAge',
        framework: 'WHO',
        frameworkLabel: 'WHO (ใคร)',
        title: '👤 เพศและวัย (Gender & Age)',
        multi: false,
        options: [
          { label: 'หญิงสาว (Young woman)', value: 'a stunning young woman, 22 years old' },
          { label: 'ชายหนุ่ม (Young man)', value: 'a handsome young man, 25 years old' },
          { label: 'ผู้หญิงวัยทำงาน (Mature woman)', value: 'an elegant mature woman, 35 years old' },
          { label: 'ผู้ชายวัยทำงาน (Mature man)', value: 'a sophisticated mature man, 38 years old' },
          { label: 'วัยรุ่นหญิง (Teen girl)', value: 'a cute teenage girl, 18 years old' },
          { label: 'วัยรุ่นชาย (Teen boy)', value: 'a stylish teenage boy, 18 years old' },
          { label: 'ผู้สูงอายุหญิง (Elderly woman)', value: 'a graceful elderly woman with kind smile' },
          { label: 'ผู้สูงอายุชาย (Elderly man)', value: 'a distinguished elderly man with grey beard' }
        ]
      },
      {
        id: 'ethnicity',
        framework: 'WHO',
        frameworkLabel: 'WHO (ใคร)',
        title: '🌍 สัญชาติ / เชื้อชาติ (Ethnicity)',
        multi: false,
        options: [
          { label: 'ไทย (Thai)', value: 'Thai ethnicity' },
          { label: 'เอเชีย (Asian)', value: 'East Asian ethnicity' },
          { label: 'ญี่ปุ่น (Japanese)', value: 'Japanese ethnicity' },
          { label: 'เกาหลี (Korean)', value: 'Korean ethnicity' },
          { label: 'ยุโรป/ฝรั่ง (Caucasian)', value: 'Caucasian European' },
          { label: 'ละติน (Latina/Hispanic)', value: 'Hispanic Latina' },
          { label: 'แอฟริกัน (African)', value: 'African ethnicity' },
          { label: 'ตะวันออกกลาง (Middle Eastern)', value: 'Middle Eastern' }
        ]
      },

      // 2. ส่วนศีรษะและใบหน้า (Head, Hair, Glasses & Expression)
      {
        id: 'hair',
        framework: 'WHO',
        frameworkLabel: 'WHO (ทรงผม)',
        title: '💇 ทรงผมและสีผม (Hair Style & Color)',
        multi: true,
        options: [
          { label: 'ผมยาวสลวย (Long wavy hair)', value: 'long flowing wavy hair' },
          { label: 'ผมบ็อบสั้น (Short chic bob)', value: 'stylish short bob haircut' },
          { label: 'ผมมัดรวบสูง (High ponytail)', value: 'sleek high ponytail' },
          { label: 'ผมหน้าม้า (Bangs / Fringe)', value: 'soft face-framing fringe bangs' },
          { label: 'ผมดัดลอนเกาหลี (Korean curls)', value: 'effortless Korean soft curls' },
          { label: 'ผมสีดำธรรมชาติ (Natural black)', value: 'glossy natural black hair' },
          { label: 'ผมสีน้ำตาลคาราเมล (Caramel brown)', value: 'warm caramel brown hair' },
          { label: 'ผมสีบลอนด์ (Ash blonde)', value: 'ash blonde hair' },
          { label: 'ผมเปียกน้ำ (Wet hair look)', value: 'damp glistening wet hair look' }
        ]
      },
      {
        id: 'headwear',
        framework: 'WHO',
        frameworkLabel: 'WHO (เครื่องประดับศีรษะ/แว่นตา)',
        title: '👓 เครื่องประดับศีรษะและใบหน้า (Headwear & Eyewear)',
        multi: true,
        options: [
          { label: 'แว่นกันแดดดีไซเนอร์ (Designer sunglasses)', value: 'wearing chic designer dark sunglasses' },
          { label: 'แว่นตาเลนส์ใสกรอบบาง (Thin wireframe glasses)', value: 'wearing sophisticated thin round wireframe eyeglasses' },
          { label: 'หมวกเบเรต์สุดชิค (French beret hat)', value: 'wearing a stylish wool French beret hat' },
          { label: 'หมวกแก๊ปสตรีท (Street baseball cap)', value: 'wearing a trendy minimal baseball cap' },
          { label: 'หมวกปีกกว้างซัมเมอร์ (Wide-brim straw hat)', value: 'wearing a wide-brim woven summer straw hat' },
          { label: 'หมวกบีนนี่ไหมพรม (Knit beanie)', value: 'wearing a relaxed slouchy knit beanie hat' },
          { label: 'ที่คาดผมซาติน (Satin headband)', value: 'wearing an elegant padded satin headband' },
          { label: 'หูฟังครอบหูรอบคอ (Headphones around neck)', value: 'wearing sleek matte-black wireless over-ear headphones around neck' },
          { label: 'ต่างหูห่วงทอง (Gold hoop earrings)', value: 'wearing subtle elegant gold hoop earrings' }
        ]
      },
      {
        id: 'expression',
        framework: 'WHO',
        frameworkLabel: 'WHO (สีหน้าและสายตา)',
        title: '😊 การแสดงออกทางสีหน้าและสายตา (Facial Expression & Gaze)',
        multi: true,
        options: [
          { label: 'ยิ้มสดใสเป็นกันเอง (Bright friendly smile)', value: 'gentle radiant smile, warm friendly expression' },
          { label: 'ยิ้มละมุนมุมปาก (Subtle gentle smile)', value: 'subtle serene smile, soft charming expression' },
          { label: 'สุขุมมั่นใจสบตากล้อง (Confident direct gaze)', value: 'confident poised expression, captivating direct eye contact' },
          { label: 'เผลอเป็นธรรมชาติ (Candid spontaneous look)', value: 'candid relaxed posture, spontaneous natural unposed look' },
          { label: 'เหม่อลอยมองออกนอกหน้าต่าง (Contemplative looking away)', value: 'contemplative thoughtful gaze looking away' },
          { label: 'ขยิบตาขี้เล่น (Playful charming wink)', value: 'playful wink with charming smile' },
          { label: 'หน้านิ่งสไตล์แฟชั่นไฮเอนด์ (Editorial neutral fierce look)', value: 'high-fashion neutral expression, fierce high-end model gaze' },
          { label: 'หัวเราะร่าเริงเปี่ยมสุข (Joyful carefree laughter)', value: 'genuine carefree laughter, cheerful uplifting aura' }
        ]
      },

      // 3. ท่อนบน (Tops, Spaghetti Straps & Upper Body)
      {
        id: 'tops',
        framework: 'WHAT',
        frameworkLabel: 'WHAT (ท่อนบน)',
        title: '👚 เสื้อผ้าท่อนบน (Tops & Upper Body)',
        multi: true,
        options: [
          { label: 'สายเดี่ยวเบสิก (Spaghetti strap top)', value: 'wearing a minimalist delicate spaghetti strap top' },
          { label: 'สายเดี่ยวผ้าซาติน (Satin camisole)', value: 'wearing a luxurious silky satin camisole top' },
          { label: 'เสื้อเกาะอก (Strapless tube top)', value: 'wearing a chic fitted strapless tube top' },
          { label: 'เสื้อปาดไหล่ / เปิดไหล่ (Off-shoulder top)', value: 'wearing an elegant off-the-shoulder ruffle top' },
          { label: 'เสื้อคล้องคอ (Halter neck top)', value: 'wearing a stylish backless halter neck top' },
          { label: 'เสื้อครอปท็อป (Trendy crop top)', value: 'wearing a trendy minimalist crop top showing midriff' },
          { label: 'เสื้อกล้ามผ้าร่อง (Ribbed tank top)', value: 'wearing a casual fitted ribbed tank top' },
          { label: 'เสื้อเชิ้ตขาวมินิมอล (Crisp white shirt)', value: 'clean crisp unbuttoned white linen shirt' },
          { label: 'เสื้อสเวตเตอร์ไหมพรม (Oversized knit sweater)', value: 'wearing a cozy oversized chunky knit sweater' },
          { label: 'เสื้อฮู้ดดี้สตรีท (Streetwear hoodie)', value: 'wearing a trendy oversized streetwear hoodie' },
          { label: 'เสื้อยืดกราฟิกโอเวอร์ไซส์ (Graphic oversized tee)', value: 'wearing a vintage oversized graphic t-shirt' },
          { label: 'เสื้อคาร์ดิแกนน่ารัก (Pastel knit cardigan)', value: 'wearing a soft cozy pastel knitted cardigan' },
          { label: 'เสื้อลูกไม้โรแมนติก (Romantic lace blouse)', value: 'wearing a delicate romantic floral lace blouse' },
          { label: 'เสื้อเบลเซอร์แฟชั่น (Modern blazer)', value: 'wearing a tailored chic modern blazer' },
          { label: 'แจ็กเก็ตหนังไบค์เกอร์ (Leather biker jacket)', value: 'wearing a stylish black leather biker jacket' },
          { label: 'แจ็กเก็ตยีนส์ (Denim jacket)', value: 'wearing a classic vintage washed denim jacket' },
          { label: 'โค้ทกันหนาวผ้าวูล (Trench & wool coat)', value: 'wearing an elegant long beige trench wool overcoat' }
        ]
      },

      // 4. ท่อนล่าง (Bottoms, Pants & Skirts)
      {
        id: 'bottoms',
        framework: 'WHAT',
        frameworkLabel: 'WHAT (ท่อนล่าง)',
        title: '👖 เสื้อผ้าท่อนล่าง (Bottoms & Lower Body)',
        multi: true,
        options: [
          { label: 'กางเกงยีนส์เอวสูง (High-waisted jeans)', value: 'fitted high-waisted denim jeans' },
          { label: 'กระโปรงเทนนิสสั้น (Pleated tennis skirt)', value: 'cute pleated tennis mini skirt' },
          { label: 'กางเกงขาสั้นยีนส์ (Denim shorts)', value: 'casual distressed denim cut-off shorts' },
          { label: 'กระโปรงยาวพริ้ว (Flowing maxi skirt)', value: 'breezy flowing floral maxi skirt' },
          { label: 'กางเกงคาร์โก้สตรีท (Cargo pants)', value: 'tactical streetwear wide-leg cargo pants' },
          { label: 'กางเกงสแล็คทำงาน (Tailored trousers)', value: 'elegant high-waist tailored dress trousers' },
          { label: 'กางเกงเลกกิ้งรัดรูป (Athletic leggings)', value: 'sleek form-fitting black athletic yoga leggings' },
          { label: 'กระโปรงหนังทรงสอบ (Leather pencil skirt)', value: 'chic black leather pencil skirt' },
          { label: 'กางเกงขากว้างลินิน (Wide-leg linen pants)', value: 'relaxed comfortable wide-leg white linen trousers' }
        ]
      },

      // 5. ชุดเต็มตัวและเดรส (Dresses & One-piece Outfits)
      {
        id: 'dresses',
        framework: 'WHAT',
        frameworkLabel: 'WHAT (ชุดเต็มตัว/เดรส)',
        title: '👗 ชุดเดรสและชุดเต็มตัว (Dresses & Full Outfits)',
        multi: true,
        options: [
          { label: 'เดรสสายเดี่ยวซาติน (Satin slip dress)', value: 'wearing a sleek silk satin spaghetti-strap slip dress' },
          { label: 'ซัมเมอร์เดรสลายดอกไม้ (Floral summer sundress)', value: 'wearing a breezy floral print summer sundress with thin straps' },
          { label: 'มินิเดรสเกาหลี (Korean pastel mini dress)', value: 'wearing a chic Korean aesthetic pastel mini dress' },
          { label: 'ชุดราตรียาวหรู (Elegant evening gown)', value: 'breathtaking elegant silk evening gown' },
          { label: 'ชุดสูททำงานทางการ (Full business suit)', value: 'tailored elegant modern full business suit' },
          { label: 'ชุดไทยประยุกต์ (Contemporary Thai dress)', value: 'luxurious contemporary modern Thai silk dress' },
          { label: 'ชุดเดรสคอวีผูกเอว (Chic wrap dress)', value: 'wearing an effortless flattering wrap dress' },
          { label: 'ชุดเอี๊ยมยีนส์น่ารัก (Denim overalls)', value: 'wearing cute vintage denim overalls over a t-shirt' },
          { label: 'สปอร์ตบราและเซ็ตออกกำลังกาย (Sports gym set)', value: 'wearing a matching athletic sports bra and gym biker set' },
          { label: 'ชุดว่ายน้ำวันพีซแฟชั่น (Fashion one-piece swimwear)', value: 'wearing an elegant one-piece designer swimsuit' },
          { label: 'ชุดกี่เพ้าโมเดิร์น (Modern Qipao)', value: 'wearing a modern form-fitting silk Qipao with side slit' },
          { label: 'ชุดฮันบกประยุกต์ (Modern Korean Hanbok)', value: 'wearing a graceful modern pastel Korean Hanbok' },
          { label: 'ชุดนักเรียนญี่ปุ่น (Japanese sailor uniform)', value: 'wearing an authentic Japanese high school sailor uniform' },
          { label: 'ไซเบอร์พังก์เทควาร์ (Cyberpunk techwear)', value: 'futuristic tactical cyberpunk techwear with neon accents' },
          { label: 'ชุดเมดคลาสสิก (Victorian maid dress)', value: 'wearing an intricate Victorian french maid dress with lace apron' }
        ]
      },

      // 6. ชุด 18+ (เมื่อเปิดสวิตช์ 18+)
      {
        id: 'clothingNsfw',
        framework: 'WHAT',
        frameworkLabel: 'WHAT (ชุดเซ็กซี่)',
        title: '🔞 ชุดเซ็กซี่ / วาบหวิว (Sensual & Lingerie)',
        nsfw: true,
        multi: true,
        options: [
          { label: 'บิกินี่เซ็กซี่ (Micro bikini)', value: 'wearing a stylish seductive micro bikini' },
          { label: 'สายเดี่ยวลูกไม้คอลึก (Plunging lace camisole)', value: 'wearing a deep plunging lace camisole slip' },
          { label: 'ชุดชั้นในลูกไม้ (Lace lingerie)', value: 'wearing exquisite delicate black lace lingerie, babydoll' },
          { label: 'ชุดผ้าซีทรู (Sheer translucent dress)', value: 'wearing a sheer translucent gauzy evening slip' },
          { label: 'เกาะอกเว้าลึก (Plunging strapless)', value: 'wearing a strapless dress with plunging deep neckline' },
          { label: 'เสื้อคลุมผ้าไหมเปิดไหล่ (Silk robe off-shoulder)', value: 'draped in an open luxury silk robe revealing shoulders' },
          { label: 'ชุดว่ายน้ำวันพีซเว้าสูง (High-cut swimsuit)', value: 'wearing a sleek high-cut one-piece swimsuit' },
          { label: 'เสื้อกล้ามบางเปียกน้ำ (Wet thin camisole)', value: 'wearing a thin fitted wet camisole top' },
          { label: 'บิกินี่ผูกเชือก (String tie bikini)', value: 'wearing a delicate string tie triangle bikini' },
          { label: 'บอดี้สูทตาข่ายซีทรู (Sheer mesh bodysuit)', value: 'wearing a provocative sheer mesh bodysuit' }
        ]
      },

      // 7. รองเท้า (Footwear & Shoes) - Dropdown!
      {
        id: 'shoes',
        framework: 'WHAT',
        frameworkLabel: 'WHAT (รองเท้า)',
        title: '👠 รองเท้า (Footwear & Shoes)',
        multi: false,
        options: [
          { label: 'รองเท้าผ้าใบสนีกเกอร์ (Designer sneakers)', value: 'wearing clean designer streetwear sneakers' },
          { label: 'รองเท้าส้นสูงสายรัด (Strappy high heels)', value: 'wearing elegant strappy stiletto high heels' },
          { label: 'รองเท้าบูทหนังยาว (Knee-high leather boots)', value: 'wearing sleek black knee-high leather boots' },
          { label: 'รองเท้าบูทข้อสั้น (Chunky ankle boots)', value: 'wearing stylish chunky black ankle combat boots' },
          { label: 'รองเท้าแตะมินิมอล (Minimalist slide sandals)', value: 'wearing casual minimalist leather slide sandals' },
          { label: 'รองเท้าโลฟเฟอร์คลาสสิก (Classic loafers)', value: 'wearing polished classic leather penny loafers' },
          { label: 'รองเท้าคัทชูทำงาน (Pointed-toe pumps)', value: 'wearing graceful pointed-toe dress pumps' },
          { label: 'เท้าเปล่าริมหาด/ธรรมชาติ (Barefoot naturally)', value: 'barefoot with natural toes on ground' }
        ]
      },

      // 8. พร็อพและสิ่งของในมือ (Props & Handheld Accessories)
      {
        id: 'props',
        framework: 'WHAT',
        frameworkLabel: 'WHAT (ถืออะไร/พร็อพ)',
        title: '🎒 พร็อพและสิ่งของในมือ (Props & Accessories)',
        multi: true,
        options: [
          { label: 'ถือแก้วกาแฟเซรามิก (Artisan coffee cup)', value: 'gracefully holding a warm ceramic artisan coffee cup' },
          { label: 'ถือกล้องฟิล์ม 35mm (Vintage film camera)', value: 'holding a vintage 35mm rangefinder film camera' },
          { label: 'ถือร่มใสกันฝน (Clear umbrella)', value: 'holding an open clear transparent umbrella' },
          { label: 'ถือช่อดอกไม้สด (Wildflower bouquet)', value: 'holding a fresh colorful blooming wildflower bouquet' },
          { label: 'สะพายกระเป๋าหนังมินิมอล (Leather tote bag)', value: 'carrying a minimalist brown leather tote bag' },
          { label: 'ถือกระเป๋าถือแบรนด์เนม (Designer clutch bag)', value: 'holding a luxury designer clutch handbag' },
          { label: 'ถือหนังสือเปิดอ่าน (Vintage open book)', value: 'holding an open classic novel book' },
          { label: 'ถือแก้วไวน์ก้านยาว (Stemmed wine glass)', value: 'elegantly holding a delicate stemmed wine glass' },
          { label: 'ถือสมาร์ตโฟน (Holding smartphone)', value: 'casually holding a sleek flagship smartphone' }
        ]
      },

      // 9. ท่าโพสและอิริยาบถหลัก (Body Posture: ท่ายืน, ท่านั่ง, ท่านอน, ท่าเคลื่อนไหว) - Dropdown!
      {
        id: 'posture',
        framework: 'WHAT',
        frameworkLabel: 'WHAT (ท่าทาง/อิริยาบถหลัก)',
        title: '💃 ท่าทางและอิริยาบถหลัก (Body Posture: ยืน / นั่ง / นอน / เคลื่อนไหว)',
        multi: false,
        options: [
          // ท่ายืน
          { label: '[ท่ายืน] ยืนตรงสง่างาม (Standing upright poised)', value: 'standing tall with graceful elegant poise' },
          { label: '[ท่ายืน] ยืนท้าวเอวมั่นใจ (Standing hands on hips)', value: 'standing confidently with hands on hips, powerful pose' },
          { label: '[ท่ายืน] ยืนพิงกำแพงสุดเท่ (Standing leaning against wall)', value: 'casually leaning back against wall, relaxed cool stance' },
          { label: '[ท่ายืน] ยืนหันหลังเหลียวมองข้ามไหล่ (Standing looking over shoulder)', value: 'standing looking back over shoulder toward camera' },
          { label: '[ท่ายืน] ยืนกอดอกสุขุม (Standing arms crossed confident)', value: 'standing with arms crossed, sophisticated authoritative posture' },
          // ท่านั่ง
          { label: '[ท่านั่ง] นั่งไขว่ห้างบนเก้าอี้ (Sitting legs crossed on chair)', value: 'elegantly sitting on chair with legs crossed' },
          { label: '[ท่านั่ง] นั่งกอดเข่าสบายๆ (Sitting hugging knees)', value: 'sitting cozily hugging knees, vulnerable relaxed pose' },
          { label: '[ท่านั่ง] นั่งริมหน้าต่างชมวิว (Sitting on window ledge)', value: 'perched gracefully on sunny window ledge looking out' },
          { label: '[ท่านั่ง] นั่งขัดสมาธิบนพื้น (Sitting cross-legged on floor)', value: 'sitting comfortably cross-legged on the floor, zen relaxed pose' },
          { label: '[ท่านั่ง] นั่งเท้าคางบนโต๊ะคาเฟ่ (Sitting resting chin on hand)', value: 'seated at cafe table resting chin gently on hand' },
          { label: '[ท่านั่ง] นั่งชันเข่าบนขั้นบันได (Sitting on stairs knees up)', value: 'casually sitting on stone steps with one knee raised' },
          // ท่านอน
          { label: '[ท่านอน] นอนหงายมองฟ้า (Lying on back looking up)', value: 'lying peacefully on back looking up toward sky' },
          { label: '[ท่านอน] นอนตะแคงเท้าศอก (Reclining sideways on elbow)', value: 'reclining sideways on ground supporting head with hand' },
          { label: '[ท่านอน] นอนคว่ำเท้าคาง (Lying on stomach chin in hands)', value: 'lying playfully on stomach with chin propped on palms' },
          { label: '[ท่านอน] เอนกายพักผ่อนบนเตียง/โซฟา (Reclining relaxed on couch)', value: 'lounging back comfortably on plush luxury couch' },
          // ท่าเคลื่อนไหว
          { label: '[ท่าเคลื่อนไหว] กำลังก้าวเดินเป็นธรรมชาติ (Walking candid stride)', value: 'captured in mid-stride dynamic walking motion toward camera' },
          { label: '[ท่าเคลื่อนไหว] หมุนตัวชุดพริ้วไหว (Graceful twirling motion)', value: 'gracefully twirling around with dress flowing dynamically' },
          { label: '[ท่าเคลื่อนไหว] วิ่งเหยาะๆ ออกกำลังกาย (Jogging athletic motion)', value: 'energetic jogging motion, dynamic athletic lifestyle' }
        ]
      },

      // 10. ท่าทางเซ็กซี่เย้ายวน (เมื่อเปิด 18+)
      {
        id: 'posesNsfw',
        framework: 'WHAT',
        frameworkLabel: 'WHAT (ท่าทางเซ็กซี่)',
        title: '🔞 ท่าทางและเสน่ห์เย้ายวน (Seductive Poses & Allure)',
        nsfw: true,
        multi: true,
        options: [
          { label: 'สายตาเย้ายวน (Seductive sultry gaze)', value: 'intense sultry seductive gaze, hypnotic eyes' },
          { label: 'กัดริมฝีปากเบาๆ (Biting lip)', value: 'gently biting lower lip, alluring expression' },
          { label: 'นอนโพสบนเตียงหรู (Reclining on bed)', value: 'sensually reclining on luxury silk bedsheets' },
          { label: 'หันมองข้ามไหล่ (Looking over shoulder)', value: 'looking back over bare shoulder, provocative stance' },
          { label: 'ผิวฉ่ำวาว (Glistening dewy skin)', value: 'glistening dewy glowing skin with subtle water droplets' },
          { label: 'ทรวดทรงนาฬิกาทราย (Hourglass curves)', value: 'accentuated hourglass silhouette and delicate clavicle' },
          { label: 'แอ่นเอวเซ็กซี่ (Arched back sensual pose)', value: 'graceful arched back pose, soft alluring shadows' }
        ]
      },

      // 11. สถานที่ถ่ายทำ (Location) - Dropdown!
      {
        id: 'location',
        framework: 'WHERE',
        frameworkLabel: 'WHERE (ที่ไหน / สถานที่ถ่ายทำ)',
        title: '📍 สถานที่ถ่ายทำและฉากหลัง (Location & Setting)',
        multi: false,
        options: [
          { label: 'คาเฟ่มินิมอลอบอุ่น (Cozy minimalist cafe)', value: 'in a cozy aesthetic minimalist wooden cafe with warm ambient light' },
          { label: 'ชายหาดริมทะเลเขตร้อน (Tropical ocean beach)', value: 'on a pristine tropical sun-drenched ocean beach with turquoise waves and white sand' },
          { label: 'ถนนคนเดิน / ตรอกนีออนกลางคืน (Neon street alley)', value: 'on a vibrant neon-lit street alley in Tokyo at night, glowing signs' },
          { label: 'สวนดอกไม้ธรรมชาติ (Botanical flower garden)', value: 'in a blooming colorful botanical garden under soft dappled sunlight' },
          { label: 'สตูดิโอถ่ายแบบสีขาวคลีน (White infinity studio)', value: 'in a clean minimalist white infinity cyclorama photo studio backdrop' },
          { label: 'ดาดฟ้าตึกระฟ้าชมวิวเมือง (Skyscraper rooftop)', value: 'on a luxury skyscraper rooftop terrace overlooking glowing city skyline' },
          { label: 'ริมสระว่ายน้ำวิลล่าหรู (Luxury villa pool)', value: 'beside a luxury private villa swimming pool with sparkling turquoise water' },
          { label: 'ห้องนอนเพนต์เฮาส์โมเดิร์น (Penthouse bedroom)', value: 'inside a luxury modern penthouse bedroom with panoramic floor-to-ceiling windows' },
          { label: 'วัดไทย / สถาปัตยกรรมคลาสสิก (Traditional Thai temple)', value: 'at an ornate historic Thai temple with golden pagodas and intricate carvings' },
          { label: 'ตลาดกลางคืน / สตรีทฟู้ด (Night market bazaar)', value: 'at a bustling night market street food bazaar with warm hanging lanterns' },
          { label: 'ร้านหนังสือ / ห้องสมุดวินเทจ (Vintage library)', value: 'in a charming aesthetic vintage bookstore with towering wooden bookshelves' },
          { label: 'ในขบวนรถไฟริมหน้าต่าง (Scenic train window)', value: 'seated comfortably next to a scenic passenger train window passing lush green landscapes' },
          { label: 'สวนสาธารณะร่มรื่น (Green city park)', value: 'in a peaceful sunlit green park under canopy of tall leafy trees' }
        ]
      },

      // 12. ช่วงเวลา 24 ชม. (Time of Day - 24h Slider)
      {
        id: 'timeOfDay',
        type: 'timeslider',
        framework: 'WHEN',
        frameworkLabel: 'WHEN (ช่วงเวลา 24 ชม.)',
        title: '⏰ ช่วงเวลาของวัน (Time of Day: 00:00 - 23:59)',
        multi: false
      },

      // 13. สภาพอากาศและบรรยากาศธรรมชาติ (Weather & Sky)
      {
        id: 'weather',
        framework: 'WHEN',
        frameworkLabel: 'WHEN (สภาพอากาศ)',
        title: '🌧️ สภาพอากาศและบรรยากาศธรรมชาติ (Weather & Sky Conditions)',
        multi: true,
        options: [
          { label: 'วันแดดสดใสท้องฟ้าโปร่ง (Clear sunny day)', value: 'on a bright clear sunny day with crisp blue skies' },
          { label: 'วันฝนพรำถนนเปียกสะท้อน (Gentle rainy day)', value: 'on a gentle rainy day with glistening reflective wet ground' },
          { label: 'สายฝนตกหนักพายุฝน (Heavy cinematic rainstorm)', value: 'in a dramatic heavy cinematic rainstorm with visible rain streaks' },
          { label: 'หมอกจางยามเช้า (Misty morning fog)', value: 'in ethereal rolling morning mist with soft diffused ambient glow' },
          { label: 'ละอองหิมะโปรยปราย (Soft falling snow)', value: 'surrounded by gentle falling snowflakes in cold winter air' },
          { label: 'ลมพัดผมและชุดพริ้วไหว (Breezy wind blowing)', value: 'with a gentle refreshing breeze blowing hair and garments dynamically' },
          { label: 'แดดส่องลอดแมกไม้ (Komorebi sunbeams)', value: 'with dappled sunlight filtering through tree leaves, Japanese komorebi rays' },
          { label: 'เมฆครึ้มมู้ดดราม่า (Overcast moody sky)', value: 'under an atmospheric dramatic overcast cloudy sky' },
          { label: 'รุ้งกินน้ำหลังฝน (Rainbow in sky)', value: 'with a vibrant soft rainbow arching across the distant sky' }
        ]
      },

      // 14. อารมณ์และบรรยากาศเรื่องราว (Mood & Story)
      {
        id: 'mood',
        framework: 'WHY',
        frameworkLabel: 'WHY (ทำไม / อารมณ์ & มู้ดเรื่องราว)',
        title: '💭 อารมณ์และบรรยากาศเรื่องราว (Mood, Emotion & Story)',
        multi: true,
        options: [
          { label: 'อบอุ่นโรแมนติกชวนฝัน (Warm romantic & dreamy)', value: 'warm romantic and dreamy nostalgic atmosphere' },
          { label: 'ดราม่าลึกลับน่าค้นหา (Dramatic mysterious)', value: 'dramatic mysterious and cinematic storytelling aura' },
          { label: 'สดใสเปี่ยมพลังเบิกบาน (Joyful & energetic)', value: 'joyful carefree and vibrant energetic mood' },
          { label: 'สงบนิ่งผ่อนคลายสบายใจ (Peaceful serene zen)', value: 'peaceful serene and tranquil zen stillness' },
          { label: 'หรูหราไฮเอนด์ทรงเสน่ห์ (Prestigious luxury)', value: 'prestigious luxury editorial and confident magnetic aura' },
          { label: 'เหงาคิดถึงคนเดียว (Poetic melancholic solitude)', value: 'poetic melancholic solitude and contemplative mood' }
        ]
      },

      // 15. ระยะภาพและมุมกล้อง (Shot Distance & Angle) - Dropdown!
      {
        id: 'shotType',
        framework: 'HOW',
        frameworkLabel: 'HOW (ถ่ายอย่างไร / ระยะภาพ)',
        title: '📐 ระยะภาพและมุมกล้อง (Shot Distance & Angle)',
        multi: false,
        options: [
          { label: 'โคลสอัพใบหน้า (Close-up portrait)', value: 'intimate extreme close-up portrait, detailed eyes and skin texture' },
          { label: 'ครึ่งตัว (Medium half-body shot)', value: 'medium half-body portrait shot from waist up' },
          { label: 'เต็มตัว (Full-body shot)', value: 'full-length full-body fashion shot' },
          { label: 'มุมระดับสายตา (Eye-level shot)', value: 'straight-on eye-level candid perspective' },
          { label: 'มุมเงยเล็กน้อย (Low angle heroic)', value: 'subtle low angle heroic perspective' }
        ]
      },

      // 16. การจัดแสงถ่ายภาพ (Photography Lighting Setup)
      {
        id: 'lighting',
        framework: 'HOW',
        frameworkLabel: 'HOW (การจัดแสง)',
        title: '💡 การจัดแสงถ่ายภาพ (Photography Lighting Setup)',
        multi: true,
        options: [
          { label: 'แสงสตูดิโอ Rembrandt (Rembrandt portrait lighting)', value: 'classic studio Rembrandt lighting, dramatic triangle light on cheek' },
          { label: 'แสงนุ่มซอฟต์บ็อกซ์ (Softbox diffused light)', value: 'commercial studio lighting with large diffused softboxes, shadowless smooth wrap' },
          { label: 'แสงสะท้อนขอบ Rim Light (Rim light / Backlight glow)', value: 'crisp sharp rim backlighting separating subject from background, glowing halo' },
          { label: 'แสงสปอตไลท์ดราม่า (Dramatic spotlight & chiaroscuro)', value: 'theatrical dramatic spotlight with deep contrasting chiaroscuro shadows' },
          { label: 'แสงธรรมชาติริมหน้าต่าง (Natural window side light)', value: 'soft diffused natural window side light with gentle gradients' },
          { label: 'แสงนีออนสองโทน (Dual-tone cyberpunk neon lights)', value: 'stylized dual-color neon lighting, vivid magenta and cyan rim contrast' },
          { label: 'แสงบิวตี้บัตเตอร์ฟลาย (Beauty butterfly lighting)', value: 'flattering high-angle butterfly beauty lighting, sculpted cheekbones' },
          { label: 'แสงฮาร์ดไลท์เงาคมชัด (Hard direct contrast sunlight)', value: 'high-contrast hard direct directional light with crisp sharp shadows' },
          { label: 'ลำแสงลอดหมอก (Volumetric god rays & crepuscular rays)', value: 'ethereal volumetric god rays beaming through atmospheric haze' },
          { label: 'แสงเทียนสลัวอบอุ่น (Intimate warm candlelit glow)', value: 'intimate low-key warm candlelit illumination, golden dancing flicker' }
        ]
      },

      // 17. เทคนิคกล้องและเลนส์ (Camera & Lens Techniques)
      {
        id: 'cameraTech',
        framework: 'HOW',
        frameworkLabel: 'HOW (เทคนิคเลนส์/กล้อง)',
        title: '📷 เทคนิคกล้องและเลนส์ (Camera & Lens Techniques)',
        multi: true,
        options: [
          { label: 'เลนส์ 85mm f/1.4 โบเก้ละมุน (85mm f/1.4 creamy bokeh)', value: 'shot on 85mm prime lens at f/1.4, creamy smooth circular background bokeh' },
          { label: 'เลนส์มุมกว้าง 24mm (24mm wide angle dynamic)', value: 'shot on 24mm wide angle lens with dramatic dynamic perspective' },
          { label: 'เลนส์ซูมเทเล 200mm (200mm telephoto compressed)', value: 'shot on 200mm telephoto lens with compressed background perspective' },
          { label: 'เลนส์มาโครคมชัดสูง (Macro extreme close-up detail)', value: 'macro lens photography, ultra-sharp intricate microscopic texture' },
          { label: 'ชัตเตอร์สปีดสูงจับจังหวะ (High shutter speed freeze)', value: 'ultra-fast 1/8000s shutter speed freezing dynamic split-second motion' },
          { label: 'ลองเอ็กซ์โพเชอร์ภาพเคลื่อนไหว (Long exposure motion blur)', value: 'artistic long exposure with subtle silky smooth motion blur' },
          { label: 'เลนส์แฟลร์แสงอาทิตย์ (Anamorphic lens flare)', value: 'cinematic anamorphic horizontal lens flare and natural optical glare' },
          { label: 'หน้าชัดหลังละลาย ชัดตื้น (Shallow depth of field)', value: 'extremely shallow depth of field, sharp subject focus against blurred backdrop' },
          { label: 'เลนส์ฟิชอาย 180° (180° Fisheye barrel distortion)', value: 'dramatic 180-degree fisheye lens with curved barrel distortion' }
        ]
      },

      // 18. สไตล์ภาพและเทคนิคศิลปะ (Art Style & Rendering) - Dropdown!
      {
        id: 'style',
        framework: 'HOW',
        frameworkLabel: 'HOW (ถ่ายอย่างไร / สไตล์ภาพ)',
        title: '🎨 สไตล์ภาพและเทคนิคศิลปะ (Art Style & Rendering)',
        multi: false,
        options: [
          { label: 'ภาพถ่ายสมจริงระดับ 8K (Hyperrealistic 8K photo)', value: 'hyperrealistic award-winning 35mm photography, sharp pores, highly detailed, 8k resolution' },
          { label: 'ภาพยนตร์ฟิล์มอนามอร์ฟิก (Cinematic 35mm film)', value: 'cinematic film still, 35mm kodak portra 400 grain, Panavision anamorphic composition' },
          { label: 'ฟิล์มวินเทจเกรน 90s (90s Vintage disposable camera)', value: 'nostalgic 1990s disposable film camera snapshot, authentic grain, soft flash look' },
          { label: 'ภาพโพลารอยด์วินเทจ (Instant Polaroid photo)', value: 'vintage instant polaroid photo, soft washed colors, aesthetic film grain border' },
          { label: 'ขาวดำคอนทราสต์สูงคลาสสิก (High-contrast B&W monochrome)', value: 'timeless fine art black and white photography, dramatic high contrast shadows, Leica monochrome' },
          { label: 'อนิเมะพรีเมียม / ชินไค (Premium Makoto Shinkai anime)', value: 'breathtaking anime key visual, Makoto Shinkai aesthetic, luminous vibrant sky, glowing clouds' },
          { label: 'สตูดิโอจิบลิคลาสสิก (Studio Ghibli hand-drawn animation)', value: 'Studio Ghibli anime style, warm nostalgic gouache painted background, charming hand-drawn feel' },
          { label: 'ภาพวาดดิจิทัล ArtStation (Digital concept art)', value: 'detailed digital concept art, ArtStation trending, masterful digital brushwork, vivid fantasy' },
          { label: '3D เรนเดอร์ Unreal Engine 5 / Octane (Octane 3D render)', value: 'futuristic 3D CGI render, Unreal Engine 5, Octane render, raytracing, subsurface scattering, 8k' },
          { label: 'ภาพสีน้ำนุ่มนวลฟุ้งฝัน (Soft fluid watercolor)', value: 'delicate expressive fluid watercolor illustration, soft wet-on-wet paint bleeds, cotton paper texture' },
          { label: 'ภาพวาดสีน้ำมันเรเนซองส์ (Classic oil painting on canvas)', value: 'classical Renaissance fine art oil painting, textured canvas impasto, rich chiaroscuro' },
          { label: 'ไซเบอร์พังก์เรโทรเวฟ (Cyberpunk Synthwave & Retrowave)', value: 'vibrant cyberpunk retrowave aesthetic, glowing neon grid, magenta and cyan hues, 80s arcade feel' },
          { label: 'แฟชั่นแมกกาซีน Vogue เอดิทอเรียล (High Fashion Vogue editorial)', value: 'high fashion editorial lookbook photography, Vogue magazine cover aesthetic, sharp styling' },
          { label: 'ภาพวาดดินสอสเก็ตช์ (Detailed pencil & charcoal sketch)', value: 'detailed graphite pencil sketch, fine charcoal hatching shading, textured paper' },
          { label: 'ป๊อปอาร์ต / คอมิกบุ๊กวินเทจ (Vintage comic pop art)', value: 'retro comic book pop art illustration, Halftone ben-day dots, bold ink lineart' },
          { label: 'ดับเบิ้ลเอ็กซ์โพเชอร์ภาพซ้อน (Double exposure surrealism)', value: 'surreal double exposure portrait merged with lush nature and city skyline' },
          { label: 'ดาร์กโกธิคแฟนตาซี (Dark Gothic fantasy)', value: 'dark moody gothic fantasy illustration, brooding ethereal atmosphere, baroque elegance' },
          { label: 'มินิมอลโมเดิร์นเวกเตอร์ (Clean minimalist flat vector)', value: 'clean modern minimalist flat vector graphic illustration, crisp shapes, harmonious pastel palette' },
          { label: 'พาสเทลดรีมมี่ฟุ้งฝัน (Dreamy pastel lo-fi aesthetic)', value: 'dreamy soft-focus pastel aesthetic, warm hazy nostalgic glow, dreamy fairytale vibes' },
          { label: 'โลโมกราฟีสีสดขอบมืด (Lomography cross-processed)', value: 'vivid cross-processed Lomography camera, saturated rich colors, heavy dark vignette edges' },
          { label: 'ภาพเรนเดอร์ดินน้ำมันสต็อปโมชัน (Claymation stop-motion)', value: 'charming tactile claymation style, handcrafted clay texture, stop-motion lighting' },
          { label: 'ภาพพิมพ์หินโบราณ (Vintage lithograph & woodcut)', value: 'antique woodblock print lithograph, intricate engraved lines, aged parchment' },
          { label: 'ภาพถ่ายใต้น้ำแสงระยิบ (Dreamy underwater photography)', value: 'submerged underwater photography, floating fabrics, shimmering caustic sun rays' }
        ]
      }
    ]
  },

  nsfw: {
    id: 'nsfw',
    title: '🔞 18+ NSFW Studio (เซ็กซี่ & วาบหวิว)',
    icon: '🔞',
    nsfwOnly: true,
    description: 'หมวดหมู่พิเศษเฉพาะโหมด 18+ รวบรวมแนวภาพถ่ายแบบ Glamour, Boudoir, และ ศิลปะเปลือยระดับมาสเตอร์พีซ',
    groups: [
      {
        id: 'nsfwTheme',
        title: 'แนวภาพ 18+ (NSFW Core Theme)',
        multi: false,
        options: [
          { label: 'ถ่ายแบบเซ็กซี่แฟชั่น (Sensual glamour photography)', value: 'high-end sensual glamour fashion photoshoot, provocative elegance' },
          { label: 'ห้องนอนส่วนตัว (Luxury boudoir photography)', value: 'intimate luxury hotel boudoir photography, moody private bedroom shoot' },
          { label: 'ริมหาดบิกินี่เว้าสูง (Tropical bikini shoot)', value: 'tropical sun-drenched beach bikini shoot, glistening ocean spray' },
          { label: 'ศิลปะเปลือยคลาสสิก (Fine art artistic nude)', value: 'fine art artistic nude photography, chiaroscuro lighting, sculptural human form' },
          { label: 'วาบหวิวโจ่งแจ้ง (Explicit uncensored aesthetics)', value: 'explicit seductive erotic aesthetics, uncensored sensual beauty' }
        ]
      },
      {
        id: 'nsfwSetting',
        title: 'สถานที่และบรรยากาศ (Sensual Setting)',
        multi: true,
        options: [
          { label: 'เตียงนอนผ้าซาติน (Satin bedsheets in penthouse)', value: 'lying on messy silk satin bedsheets in a luxury high-rise penthouse' },
          { label: 'ห้องอาบน้ำกระจกฝ้า (Steamy glass shower)', value: 'steamy transparent glass shower cabin with water condensation' },
          { label: 'อ่างจากุซซี่ฟองสบู่ (Foam bubble jacuzzi)', value: 'relaxing inside a warm marble jacuzzi bath covered in scented bubbles' },
          { label: 'สระว่ายน้ำยามค่ำ (Night private villa pool)', value: 'private villa swimming pool at night with turquoise underwater illumination' },
          { label: 'สตูดิโอผ้าม่านกำมะหยี่ (Velvet studio drapery)', value: 'private photo studio with rich dark velvet curtains and warm backlights' }
        ]
      },
      {
        id: 'nsfwSensory',
        title: 'รายละเอียดสรีระและแสง (Anatomy & Sensory Details)',
        multi: true,
        options: [
          { label: 'ทรวดทรงสมบูรณ์แบบ (Toned curves & waist)', value: 'flawless toned feminine curves, slim waist, accentuated hips' },
          { label: 'เนินอกและไหปลาร้า (Cleavage & delicate collarbone)', value: 'alluring deep cleavage, elegant defined collarbone, smooth shoulders' },
          { label: 'ผิวเปียกหยดน้ำ (Wet skin water droplets)', value: 'beaded water droplets resting on glistening tanned skin' },
          { label: 'แก้มแดงระเรื่อ (Blushing cheeks & parted lips)', value: 'soft rosy flushed cheeks, slightly parted plump lips, heavy breathing' },
          { label: 'แสงสลัวโรแมนติก (Low-key rim lighting)', value: 'dramatic low-key rim lighting highlighting the body curves in dark shadows' }
        ]
      }
    ]
  },

  landscape: {
    id: 'landscape',
    title: 'รูปวิว (Landscapes & Nature)',
    icon: '🏞️',
    description: 'สร้างสรรค์ภาพทิวทัศน์ ธรรมชาติ ภูเขา ทะเล ป่าไม้ และเมืองใหญ่สุดอลังการ',
    groups: [
      {
        id: 'environment',
        title: 'ภูมิประเทศและสถานที่ (Terrain & Environment)',
        multi: false,
        options: [
          { label: 'ภูเขาหิมะและหมอก (Misty snow mountain)', value: 'majestic snow-capped mountain peaks shrouded in morning mist' },
          { label: 'ชายหาดเขตร้อนน้ำใส (Tropical beach)', value: 'pristine tropical turquoise ocean beach, white sand, leaning palm trees' },
          { label: 'ทะเลสาบกระจกสะท้อน (Mirror mountain lake)', value: 'crystal-clear mountain lake with perfect glassy reflection of alpine peaks' },
          { label: 'ป่าฝนและน้ำตก (Emerald rainforest)', value: 'lush emerald mossy rainforest with cascading waterfall and sunbeams' },
          { label: 'เมืองหลวงไซเบอร์พังก์ (Cyberpunk metropolis)', value: 'futuristic cyberpunk city skyline at night, towering holographic neon skyscrapers' },
          { label: 'ทะเลทรายเนินทรายสีทอง (Golden desert dunes)', value: 'endless rolling golden sand dunes under dramatic sweeping wind' },
          { label: 'ท้องฟ้าราตรีทางช้างเผือก (Milky way galaxy)', value: 'stunning night sky with vibrant glowing Milky Way galaxy and shooting stars' }
        ]
      },
      {
        id: 'timeSeason',
        title: 'ช่วงเวลาและฤดูกาล (Time of Day & Season)',
        multi: true,
        options: [
          { label: 'พระอาทิตย์ขึ้น (Sunrise dawn)', value: 'early morning dawn, pink and orange sky' },
          { label: 'แสงแดดยามเย็นสีทอง (Golden hour sunset)', value: 'magical golden hour sunset, warm fiery radiant sunbeams' },
          { label: 'ค่ำคืนใต้แสงจันทร์ (Moonlit night)', value: 'deep midnight illuminated by a brilliant luminous full moon' },
          { label: 'ฤดูใบไม้ร่วงใบไม้แดง (Autumn foliage)', value: 'vibrant autumn season with red and golden maple foliage' },
          { label: 'ฤดูหนาวหิมะโปรย (Winter snowfall)', value: 'serene winter wonderland with gentle falling snow' }
        ]
      },
      {
        id: 'weather',
        title: 'สภาพอากาศและบรรยากาศ (Weather & Atmosphere)',
        multi: true,
        options: [
          { label: 'หมอกบางลอยเรี่ย (Ethereal rolling fog)', value: 'ethereal rolling morning fog weaving through valleys' },
          { label: 'ละอองฝนสดชื่น (Fresh light rain)', value: 'gentle rain shower with reflective wet ground and damp atmosphere' },
          { label: 'พายุฟ้าร้องทรงพลัง (Dramatic thunder storm)', value: 'dramatic dark storm clouds with branching lightning strikes' },
          { label: 'ลำแสงส่องผ่านเมฆ (God rays / Crepuscular)', value: 'epic volumetric god rays breaking through parting clouds' }
        ]
      },
      {
        id: 'composition',
        title: 'มุมมองการถ่ายภาพ (Composition & Perspective)',
        multi: false,
        options: [
          { label: 'โดรนมุมสูง (Aerial drone shot)', value: 'breathtaking top-down aerial drone photography' },
          { label: 'เลนส์มุมกว้างพิเศษ (Ultra-wide angle)', value: 'ultra-wide angle 14mm lens expansive perspective' },
          { label: 'พาโนรามาแนวนอน (Panoramic vista)', value: 'sweeping panoramic vista capturing immense scale' },
          { label: 'เส้นนำสายตา (Leading lines composition)', value: 'artistic composition with winding river leading lines' }
        ]
      }
    ]
  },

  logo: {
    id: 'logo',
    title: 'รูปโลโก้ (Logos & Emblems)',
    icon: '🎨',
    description: 'ออกแบบโลโก้ระดับแบรนด์ มินิมอล 3D ตราสัญลักษณ์ และมาสคอต',
    groups: [
      {
        id: 'logoStyle',
        title: 'สไตล์ของโลโก้ (Logo Design Style)',
        multi: false,
        options: [
          { label: 'มินิมอลเวกเตอร์ (Minimalist flat vector)', value: 'clean modern minimalist flat vector logo design' },
          { label: '3D เงาวาวหรูหรา (3D glossy metallic)', value: 'sleek 3D rendered glossy metallic emblem, subtle bevel and ambient occlusion' },
          { label: 'ตราประทับวินเทจ (Vintage retro emblem)', value: 'vintage retro badge emblem with intricate decorative linework' },
          { label: 'มาสคอตน่ารัก (Cute character mascot)', value: 'friendly adorable character mascot logo, clean vector shapes' },
          { label: 'โมโนแกรมเรขาคณิต (Geometric monogram)', value: 'geometric interlocking monogram lettermark logo, golden ratio' }
        ]
      },
      {
        id: 'industry',
        title: 'หมวดหมู่ธุรกิจ (Industry & Theme)',
        multi: false,
        options: [
          { label: 'เทคโนโลยีและ AI (Tech & Artificial Intelligence)', value: 'for an innovative cutting-edge AI technology startup' },
          { label: 'กาแฟและคาเฟ่ (Artisan Coffee Shop)', value: 'for a cozy specialty artisan coffee roastery' },
          { label: 'แฟชั่นและความหรูหรา (High Fashion Luxury)', value: 'for a prestigious luxury fashion and perfume boutique' },
          { label: 'ธรรมชาติและสุขภาพ (Eco Wellness & Organic)', value: 'for an organic eco-friendly wellness and botanical brand' },
          { label: 'เกมและอีสปอร์ต (Gaming & Esports)', value: 'for a competitive esports gaming team, sharp aggressive crest' },
          { label: 'อสังหาริมทรัพย์ (Modern Architecture & Real Estate)', value: 'for a premier modern architecture and real estate group' }
        ]
      },
      {
        id: 'colorPalette',
        title: 'โทนสีและพื้นผิว (Color Palette & Texture)',
        multi: true,
        options: [
          { label: 'ทองคำหรูหรา (Luxurious gold & black)', value: 'luxurious metallic gold foil on matte black' },
          { label: 'ไล่เฉดสีโมเดิร์น (Vibrant modern gradient)', value: 'vibrant modern purple-to-cyan smooth gradient' },
          { label: 'เอิร์ธโทนมินิมอล (Earthy organic tones)', value: 'warm organic earth tones, terracotta and sage green' },
          { label: 'ขาวดำเรียบหรู (Monochrome black & white)', value: 'timeless monochrome black and white high contrast' }
        ]
      },
      {
        id: 'background',
        title: 'พื้นหลังและการจัดวาง (Background & Presentation)',
        multi: false,
        options: [
          { label: 'พื้นขาวล้วนสะอาด (Plain solid white)', value: 'isolated on plain solid white background, zero shadows, Dribbble trending' },
          { label: 'พื้นดำด้านหรู (Solid matte dark)', value: 'isolated on premium dark charcoal background' },
          { label: 'กระดาษปั๊มฟอยล์ (Mockup embossed paper)', value: 'embossed letterpress logo mockup on textured craft paper' }
        ]
      }
    ]
  },

  product: {
    id: 'product',
    title: 'รูปสินค้า (Product Photography)',
    icon: '📦',
    description: 'ถ่ายภาพสินค้าสำหรับโฆษณา แคตตาล็อก และอีคอมเมิร์ซระดับลักชัวรี',
    groups: [
      {
        id: 'productType',
        title: 'ชนิดสินค้า (Product Category)',
        multi: false,
        options: [
          { label: 'เครื่องสำอาง/สกินแคร์ (Cosmetics & Skincare bottle)', value: 'luxury glass serum skincare dropper bottle' },
          { label: 'แก้วกาแฟพรีเมียม (Coffee beverage cup)', value: 'artisanal iced matcha latte in sleek fluted glass' },
          { label: 'หูฟังไร้สายไฮเอนด์ (Wireless headphones)', value: 'futuristic matte-black wireless over-ear headphones' },
          { label: 'รองเท้าผ้าใบแฟชั่น (Sneakers)', value: 'trendsetting designer athletic sneaker' },
          { label: 'น้ำหอมขวดแก้วหรู (Luxury perfume bottle)', value: 'crystal cut luxury perfume fragrance bottle with gold cap' },
          { label: 'สมาร์ตโฟน/แกดเจ็ต (Smart gadget)', value: 'ultra-thin flagship titanium smartphone' }
        ]
      },
      {
        id: 'pedestal',
        title: 'แท่นวางและฉากประกอบ (Podium & Display Setting)',
        multi: true,
        options: [
          { label: 'แท่นหินอ่อนหรู (Luxury white marble podium)', value: 'resting on an elegant carved white Carrara marble pedestal' },
          { label: 'ฐานหินธรรมชาติ (Rough natural stone)', value: 'placed on rough textured volcanic stone with subtle moss' },
          { label: 'ลอยกลางน้ำกระเด็น (Floating with water splash)', value: 'dynamically floating surrounded by crystal-clear dynamic water splash' },
          { label: 'ฉากมินิมอลโมเดิร์น (Minimalist pastel studio)', value: 'displayed in a clean minimalist architectural arch niche' },
          { label: 'ล้อมรอบด้วยใบไม้ธรรมชาติ (Surrounded by botanicals)', value: 'surrounded by fresh lush monstera leaves and soft eucalyptus' }
        ]
      },
      {
        id: 'studioLighting',
        title: 'การจัดแสงสตูดิโอ (Studio Commercial Lighting)',
        multi: true,
        options: [
          { label: 'แสงนุ่มซอฟต์บ็อกซ์ (Softbox diffusion)', value: 'commercial studio lighting with large diffused softboxes, flawless reflections' },
          { label: 'แสงสะท้อนขอบสินค้า (Sharp rim backlight)', value: 'crisp rim backlighting accentuating the sleek product contours' },
          { label: 'แสงแดดพาดผ่านหน้าต่าง (Dappled window sunlight)', value: 'warm dappled sunlight casting elegant palm leaf shadows' },
          { label: 'แสงสะท้อนผิวน้ำ (Caustic water reflections)', value: 'mesmerizing shimmering caustic water light ripples' }
        ]
      },
      {
        id: 'cameraAngle',
        title: 'มุมกล้องการถ่าย (Camera Angle)',
        multi: false,
        options: [
          { label: 'มุมตรงระดับสายตา (Eye-level commercial hero)', value: 'front-facing eye-level commercial hero shot' },
          { label: 'มุมเอียง 45 องศา (45-degree elevated angle)', value: 'flattering 45-degree angle studio photography' },
          { label: 'มุมบนแนวราบ (Top-down flat lay)', value: 'top-down bird-eye flat lay arrangement' },
          { label: 'มาโครเก็บรายละเอียดผิว (Macro texture detail)', value: 'macro close-up shot capturing crisp product material textures' }
        ]
      }
    ]
  },

  cover: {
    id: 'cover',
    title: 'รูปปก (Covers & Thumbnails)',
    icon: '📖',
    description: 'สร้างปกหนังสือ นิตยสาร YouTube Thumbnail และพอดแคสต์ที่ดึงดูดสายตา',
    groups: [
      {
        id: 'coverFormat',
        title: 'ประเภทของปก (Cover Format)',
        multi: false,
        options: [
          { label: 'ปกหนังสือ/นิยาย (Book cover art)', value: 'bestseller fantasy book cover illustration' },
          { label: 'ปก YouTube Thumbnail (High-CTR YouTube thumbnail)', value: 'high-CTR viral YouTube thumbnail composition, bold vibrant contrast' },
          { label: 'ปกนิตยสารแฟชั่น (Vogue style magazine cover)', value: 'high-fashion glossy magazine editorial cover portrait' },
          { label: 'ปกพอดแคสต์/อัลบั้มเพลง (Podcast / Music album cover)', value: 'modern album vinyl cover art, artistic conceptual aesthetic' }
        ]
      },
      {
        id: 'focalPoint',
        title: 'จุดดึงดูดสายตา (Dramatic Focal Point)',
        multi: true,
        options: [
          { label: 'ตัวละครเอกโดดเด่น (Central hero protagonist)', value: 'charismatic protagonist standing heroically in center' },
          { label: 'ประตูลึกลับเรืองแสง (Mysterious glowing portal)', value: 'mysterious glowing ethereal gateway in background' },
          { label: 'การแสดงอารมณ์ตื่นเต้น (Shocked / Excited expression)', value: 'dramatic emotional expression with wide eyes, high energy' },
          { label: 'เงาร่างท่ามกลางหมอก (Silhouette in back light)', value: 'dramatic dark silhouette figure backlit by intense halo light' }
        ]
      },
      {
        id: 'layoutComposition',
        title: 'การจัดองค์ประกอบและพื้นที่ว่าง (Layout & Typography Space)',
        multi: true,
        options: [
          { label: 'เว้นที่ว่างด้านบนสำหรับชื่อเรื่อง (Top negative copy space)', value: 'clean empty negative space at the top reserved for bold title typography' },
          { label: 'องค์ประกอบแนวทะแยงทรงพลัง (Dynamic diagonal)', value: 'powerful dynamic diagonal composition creating depth and movement' },
          { label: 'สีตัดกันสะดุดตา (High contrast complementary colors)', value: 'eye-catching color contrast, vivid saturation and deep darks' }
        ]
      }
    ]
  },

  banner: {
    id: 'banner',
    title: 'รูปบาร์ / แบนเนอร์ (Banners & Headers)',
    icon: '🏷️',
    description: 'แบนเนอร์เว็บไซต์ Hero Header ภาพปก Facebook, Twitter และโฆษณาแนวนอน',
    groups: [
      {
        id: 'bannerType',
        title: 'ประเภทแบนเนอร์ (Banner Type & Proportion)',
        multi: false,
        options: [
          { label: 'Web Hero Header (แนวนอน 16:9 / 21:9)', value: 'modern website landing page hero banner header, ultrawide format' },
          { label: 'ภาพปก Facebook / Twitter (Social media cover)', value: 'social media header banner, panoramic horizontal banner' },
          { label: 'แบนเนอร์โฆษณาโปรโมชัน (Promo advertising banner)', value: 'sleek digital promotional advertisement banner' }
        ]
      },
      {
        id: 'bannerLayout',
        title: 'การจัดวางภาพและพื้นที่ลงข้อความ (Layout Balance)',
        multi: false,
        options: [
          { label: 'วัตถุอยู่ขวา เว้นว่างซ้ายสำหรับตัวหนังสือ (Subject right, text left)', value: 'focal visual element on the right, ample clean negative space on the left for text' },
          { label: 'วัตถุอยู่ซ้าย เว้นว่างขวาสำหรับตัวหนังสือ (Subject left, text right)', value: 'focal visual element on the left, clean open negative space on the right for headline' },
          { label: 'วัตถุอยู่กึ่งกลางสมมาตร (Centered balanced composition)', value: 'balanced symmetrical composition with central subject' },
          { label: 'ภาพลวดลายแอบสแตรกต์ทั้งแผ่น (Full abstract backdrop)', value: 'seamless wide abstract background texture with smooth gradients' }
        ]
      },
      {
        id: 'bannerTheme',
        title: 'ธีมภาพแบนเนอร์ (Banner Visual Theme)',
        multi: true,
        options: [
          { label: 'คลื่นเทคโนโลยี 3D (3D tech abstract flowing waves)', value: 'futuristic 3D flowing glossy waves, glassmorphism ribbons, tech ambiance' },
          { label: 'โต๊ะทำงานมินิมอล (Flat lay creative workspace)', value: 'aesthetic modern desk flat lay with laptop, coffee, and green plant' },
          { label: 'ไล่เฉดสีนีออนโมเดิร์น (Vibrant neon gradient mesh)', value: 'smooth modern mesh gradient backdrop with luminous soft glows' },
          { label: 'เมืองหลวงยามค่ำพาโนรามา (Panoramic night city lights)', value: 'panoramic night skyline with soft blurred bokeh lights' }
        ]
      }
    ]
  },

  general: {
    id: 'general',
    title: 'หมวดทั่วไป / สไตล์ (Styles & Modifiers)',
    icon: '✨',
    description: 'รวมพลังแห่งการปรับแต่งคุณภาพ เลนส์กล้อง การเรนเดอร์ และโทนสีสากล',
    groups: [
      {
        id: 'qualityModifiers',
        title: 'คุณภาพและการเรนเดอร์ (Quality & Engine)',
        multi: true,
        options: [
          { label: 'มาสเตอร์พีซ 8K (Masterpiece 8k)', value: 'masterpiece, highest quality, 8k resolution, extremely detailed' },
          { label: 'ภาพถ่ายชนะรางวัล (Award-winning photography)', value: 'award-winning National Geographic quality photography' },
          { label: 'Unreal Engine 5 (UE5 Cinematic Render)', value: 'rendered in Unreal Engine 5, Octane render, photorealistic global illumination' },
          { label: 'ความคมชัดระดับสตูดิโอ (Sharp crystal-clear focus)', value: 'crystal-clear sharp focus, fine micro-textures, zero blur' }
        ]
      },
      {
        id: 'colorGrading',
        title: 'โทนสีและมู้ดอารมณ์ (Color Grading & Mood)',
        multi: true,
        options: [
          { label: 'โทนภาพยนตร์สากล (Teal and Orange cinematic)', value: 'cinematic teal and orange color grade, rich film contrast' },
          { label: 'โทนสว่างมินิมอล (High-key airy bright)', value: 'bright airy high-key atmosphere, clean fresh light' },
          { label: 'โทนดาร์กหรูหรา (Dark moody moody aesthetic)', value: 'moody dark atmosphere, rich shadows, mysterious low-key tones' },
          { label: 'โทนพาสเทลละมุน (Pastel dreamlike)', value: 'dreamy pastel color palette, soft glowing highlights' },
          { label: 'ขาวดำคลาสสิก (Timeless monochrome black & white)', value: 'classic black and white noir photography with rich deep blacks' }
        ]
      },
      {
        id: 'lensAngle',
        title: 'เลนส์และมุมมองกล้อง (Camera Lens & Perspective)',
        multi: true,
        options: [
          { label: 'เลนส์ไพรม์ 35mm สตรีท (35mm prime)', value: 'shot on 35mm prime lens, natural street documentary look' },
          { label: 'เลนส์พอร์ตเทรต 85mm โบเก้ (85mm f/1.2)', value: 'shot on 85mm f/1.2 lens, silky smooth background bokeh blur' },
          { label: 'เลนส์มุมกว้าง 16mm (16mm ultra-wide)', value: '16mm wide-angle lens, expansive dynamic field of view' },
          { label: 'เลนส์อะนามอร์ฟิกจอกว้าง (Anamorphic widescreen)', value: 'anamorphic widescreen lens with horizontal blue lens flare' }
        ]
      }
    ]
  }
};

const ASPECT_RATIOS = [
  { id: '1:1', label: '1:1 จัตุรัส (Square)', tag: '--ar 1:1', text: '1:1 square aspect ratio', w: 1, h: 1, useCase: 'Instagram Feed, Profile' },
  { id: '16:9', label: '16:9 แนวนอนกว้าง (Widescreen)', tag: '--ar 16:9', text: '16:9 widescreen landscape', w: 16, h: 9, useCase: 'YouTube, Desktop, TV' },
  { id: '9:16', label: '9:16 แนวตั้งยาว (Stories/TikTok)', tag: '--ar 9:16', text: '9:16 vertical orientation', w: 9, h: 16, useCase: 'Reels, Shorts, TikTok' },
  { id: '4:5', label: '4:5 พอร์ตเทรต (Social Portrait)', tag: '--ar 4:5', text: '4:5 portrait ratio', w: 4, h: 5, useCase: 'Instagram Post, Mobile' },
  { id: '3:2', label: '3:2 คลาสสิกกล้อง (DSLR Photo)', tag: '--ar 3:2', text: '3:2 classic photo ratio', w: 3, h: 2, useCase: 'Standard Photography' },
  { id: '21:9', label: '21:9 ซีนีมาติก (Ultrawide Cinema)', tag: '--ar 21:9', text: '21:9 ultrawide cinematic ratio', w: 21, h: 9, useCase: 'Epic Movie Vista, Banner' }
];

const NEGATIVE_PRESETS = [
  { id: 'anatomy', label: 'สรีระเสีย (Bad Anatomy)', tag: 'bad anatomy, deformed, mutated, extra limbs, missing limbs, fused fingers, extra fingers, malformed limbs' },
  { id: 'hands', label: 'มือผิดรูป (Bad Hands)', tag: 'bad hands, mutated hands, missing fingers, extra digits, poorly drawn hands' },
  { id: 'face', label: 'ใบหน้าเบี้ยว (Poor Face)', tag: 'ugly, deformed face, poorly drawn face, disfigured, cloned face, crossed eyes' },
  { id: 'quality', label: 'คุณภาพต่ำ (Low Quality)', tag: 'lowres, bad quality, blurry, pixelated, jpeg artifacts, compression artifacts' },
  { id: 'watermark', label: 'ลายน้ำและตัวหนังสือ (Watermark/Text)', tag: 'watermark, signature, text, username, logo, copyright notice' },
  { id: 'lighting', label: 'แสงไม่สมดุล (Bad Lighting)', tag: 'overexposed, underexposed, harsh flash, blown-out highlights' }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CATEGORIES, ASPECT_RATIOS, NEGATIVE_PRESETS };
}
