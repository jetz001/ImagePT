// QA Automated Verification via MCP Server
// Simulates an autonomous QA client imagining an image concept and generating it using ONLY the MCP tools.

const { spawn } = require('child_process');
const path = require('path');

async function runQATest() {
  console.log('====================================================');
  console.log('🤖 QA MCP INTEGRATION TEST INITIATED');
  console.log('Scenario in QA mind: "สาวไทยวัยรุ่น สายเดี่ยวซาติน กางเกงยีนส์เอวสูง นั่งไขว่ห้างในคาเฟ่มินิมอล ยามเย็น 17:30 น. เลนส์ 85mm สไตล์ฟิล์มอนามอร์ฟิก 35mm"');
  console.log('====================================================\n');

  const serverProcess = spawn('node', [path.join(__dirname, 'server.js')], {
    stdio: ['pipe', 'pipe', 'inherit']
  });

  let messageId = 1;
  const pendingRequests = new Map();

  serverProcess.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(l => l.trim());
    for (const line of lines) {
      try {
        const res = JSON.parse(line);
        if (res.id && pendingRequests.has(res.id)) {
          pendingRequests.get(res.id)(res);
          pendingRequests.delete(res.id);
        }
      } catch (e) {
        // ignore non-json log lines
      }
    }
  });

  function sendRpc(method, params) {
    return new Promise((resolve) => {
      const id = messageId++;
      pendingRequests.set(id, resolve);
      const req = JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n';
      serverProcess.stdin.write(req);
    });
  }

  // 1. Initialize MCP
  console.log('Step 1: Handshake with MCP Server...');
  const initRes = await sendRpc('initialize', {
    protocolVersion: '2024-11-05',
    capabilities: {},
    clientInfo: { name: 'QA-Client', version: '1.0.0' }
  });
  console.log('✅ Handshake complete. Protocol:', initRes.result.protocolVersion);

  // 2. Discover Categories & Options
  console.log('\nStep 2: Inspecting Person Category options from MCP tools...');
  const catRes = await sendRpc('tools/call', {
    name: 'get_preset_categories',
    arguments: { categoryId: 'person' }
  });
  const personCat = JSON.parse(catRes.result.content[0].text).category;
  console.log(`✅ Retrieved Category: ${personCat.title} with ${personCat.groups.length} Groups (Head-to-Toe)`);

  // 3. QA extracts required option tags from available tools
  console.log('\nStep 3: QA selects tags based on the imagined concept:');
  
  // Pick from tops: สายเดี่ยวผ้าซาติน
  const topsGroup = personCat.groups.find(g => g.id === 'tops');
  const satinCamisole = topsGroup.options.find(o => o.value.includes('camisole'));
  console.log(`- Top: ${satinCamisole.label} => "${satinCamisole.value}"`);

  // Pick from bottoms: กางเกงยีนส์เอวสูง
  const bottomsGroup = personCat.groups.find(g => g.id === 'bottoms');
  const highWaistJeans = bottomsGroup.options.find(o => o.value.includes('high-waisted'));
  console.log(`- Bottom: ${highWaistJeans.label} => "${highWaistJeans.value}"`);

  // Pick from posture: นั่งไขว่ห้าง
  const postureGroup = personCat.groups.find(g => g.id === 'posture');
  const sittingCrossed = postureGroup.options.find(o => o.value.includes('legs crossed'));
  console.log(`- Posture: ${sittingCrossed.label} => "${sittingCrossed.value}"`);

  // Pick from location: คาเฟ่มินิมอล
  const locGroup = personCat.groups.find(g => g.id === 'location');
  const cafe = locGroup.options.find(o => o.value.includes('cafe'));
  console.log(`- Location: ${cafe.label} => "${cafe.value}"`);

  // Pick from cameraTech: เลนส์ 85mm f/1.4 โบเก้
  const camGroup = personCat.groups.find(g => g.id === 'cameraTech');
  const bokeh85mm = camGroup.options.find(o => o.value.includes('85mm'));
  console.log(`- Camera: ${bokeh85mm.label} => "${bokeh85mm.value}"`);

  // Pick from style: ภาพยนตร์ฟิล์ม 35mm
  const styleGroup = personCat.groups.find(g => g.id === 'style');
  const cinematicFilm = styleGroup.options.find(o => o.value.includes('cinematic film still'));
  console.log(`- Style: ${cinematicFilm.label} => "${cinematicFilm.value}"`);

  // 4. Generate Masterpiece Prompt via MCP
  console.log('\nStep 4: Calling MCP tool "generate_prompt"...');
  const genRes = await sendRpc('tools/call', {
    name: 'generate_prompt',
    arguments: {
      category: 'person',
      tags: [
        'a stunning young Thai woman, 22 years old',
        'soft face-framing fringe bangs',
        'wearing chic designer dark sunglasses',
        'gentle radiant smile',
        satinCamisole.value,
        highWaistJeans.value,
        'wearing elegant pointed-toe dress pumps',
        'holding a luxury designer clutch handbag',
        sittingCrossed.value,
        cafe.value,
        'on a bright clear sunny day with crisp blue skies',
        'warm romantic and dreamy nostalgic atmosphere',
        'medium half-body portrait shot from waist up',
        'classic studio Rembrandt lighting, dramatic triangle light on cheek',
        bokeh85mm.value,
        cinematicFilm.value
      ],
      time: '17:30', // 24-Hour Slider input!
      aspectRatio: '16:9',
      negativePresetIds: ['anatomy', 'hands', 'face', 'quality', 'watermark']
    }
  });

  const promptOutput = JSON.parse(genRes.result.content[0].text);
  console.log('\n====================================================');
  console.log('🎉 QA GENERATION SUCCESSFUL VIA MCP!');
  console.log('====================================================');
  console.log('📌 POSITIVE PROMPT:');
  console.log(promptOutput.positivePrompt);
  console.log('\n🚫 NEGATIVE PROMPT:');
  console.log(promptOutput.negativePrompt);
  console.log('====================================================\n');

  serverProcess.kill();
  process.exit(0);
}

runQATest().catch(err => {
  console.error('QA Test failed:', err);
  process.exit(1);
});
