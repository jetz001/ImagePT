#!/usr/bin/env node
// Model Context Protocol (MCP) Server for ImagePT
// Exposes prompt generation, RAG vector search, and image metadata parsing over standard stdio

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const { CATEGORIES, ASPECT_RATIOS, NEGATIVE_PRESETS } = require('../data/categories');
const { searchSimilar } = require('../services/vectorStore');
const { extractMetadata } = require('../services/imageToPrompt');

const TOOLS = [
  {
    name: 'generate_prompt',
    description: 'Generates polished positive and negative prompts based on category, selected tags, aspect ratio, and custom text',
    inputSchema: {
      type: 'object',
      properties: {
        category: { type: 'string', description: 'Category ID: person, landscape, logo, product, cover, banner, general, nsfw' },
        tags: { type: 'array', items: { type: 'string' }, description: 'Array of prompt tags or phrases' },
        customText: { type: 'string', description: 'Additional custom prompt details' },
        aspectRatio: { type: 'string', description: 'Aspect ratio: 1:1, 16:9, 9:16, 4:5, 3:2, 21:9' },
        negativePresetIds: { type: 'array', items: { type: 'string' }, description: 'Array of negative preset IDs (anatomy, hands, face, quality, watermark)' }
      },
      required: ['category']
    }
  },
  {
    name: 'search_rag_prompts',
    description: 'Searches master prompt templates in the Pure JS Vector Store using semantic similarity',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query in Thai or English' },
        topK: { type: 'number', description: 'Number of results to return (default 3)' },
        category: { type: 'string', description: 'Optional category filter' }
      },
      required: ['query']
    }
  },
  {
    name: 'get_preset_categories',
    description: 'Retrieves all available categories, tag options, and aspect ratios supported by ImagePT',
    inputSchema: {
      type: 'object',
      properties: {}
    }
  },
  {
    name: 'image_to_prompt',
    description: 'Extracts embedded generation prompt and negative prompt from a Stable Diffusion/ComfyUI image file',
    inputSchema: {
      type: 'object',
      properties: {
        filePath: { type: 'string', description: 'Absolute path to PNG or JPEG image file on disk' }
      },
      required: ['filePath']
    }
  }
];

function getTimeInfo(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;

  if (totalMinutes < 300) {
    return { timeStr, icon: '🌌', desc: 'ดึกสงัด / เที่ยงคืน', prompt: `at deep midnight ${timeStr}, dark starry atmospheric night sky` };
  } else if (totalMinutes < 360) {
    return { timeStr, icon: '🌌', desc: 'บลูอาวร์ก่อนรุ่งสาง', prompt: `during blue hour twilight at ${timeStr}, cool moody pre-dawn ambient illumination` };
  } else if (totalMinutes < 480) {
    return { timeStr, icon: '🌅', desc: 'พระอาทิตย์ขึ้น / เช้าตรู่', prompt: `during radiant golden sunrise dawn at ${timeStr}, warm rising sunbeams` };
  } else if (totalMinutes < 720) {
    return { timeStr, icon: '☀️', desc: 'ยามเช้าแดดสดใส', prompt: `during bright crisp morning daylight at ${timeStr}, fresh clear natural sun illumination` };
  } else if (totalMinutes < 840) {
    return { timeStr, icon: '☀️', desc: 'เที่ยงวันแดดจ้า', prompt: `at bright high noon ${timeStr}, brilliant overhead direct sun illumination` };
  } else if (totalMinutes < 1020) {
    return { timeStr, icon: '🌤️', desc: 'บ่ายคล้อยแดดอุ่น', prompt: `on a warm sun-drenched afternoon at ${timeStr}, soft angled warm daylight` };
  } else if (totalMinutes < 1140) {
    return { timeStr, icon: '🌇', desc: 'โกลเด้นอาวร์ / พระอาทิตย์ตกดิน', prompt: `during magical golden hour sunset at ${timeStr}, fiery warm rim light, radiant sun flare` };
  } else if (totalMinutes < 1260) {
    return { timeStr, icon: '🌆', desc: 'ทไวไลท์พลบค่ำ', prompt: `during atmospheric twilight dusk at ${timeStr}, deep violet-blue sky and warm streetlights` };
  } else {
    return { timeStr, icon: '🌃', desc: 'กลางคืนแสงนีออน', prompt: `at atmospheric city night ${timeStr}, illuminated by glowing streetlights and night reflections` };
  }
}

function handleToolCall(name, args) {
  if (name === 'get_preset_categories') {
    if (args && args.categoryId) {
      const cat = CATEGORIES[args.categoryId];
      if (!cat) throw new Error(`Category not found: ${args.categoryId}`);
      return {
        category: cat,
        aspectRatios: ASPECT_RATIOS,
        negativePresets: NEGATIVE_PRESETS
      };
    }
    return {
      categories: Object.keys(CATEGORIES).map(k => ({
        id: CATEGORIES[k].id,
        title: CATEGORIES[k].title,
        description: CATEGORIES[k].description,
        groups: CATEGORIES[k].groups
      })),
      aspectRatios: ASPECT_RATIOS,
      negativePresets: NEGATIVE_PRESETS
    };
  }

  if (name === 'search_rag_prompts') {
    const results = searchSimilar(args.query, args.topK || 3, args.category);
    return { results };
  }

  if (name === 'generate_prompt') {
    const parts = [];
    if (args.tags && args.tags.length > 0) {
      parts.push(args.tags.join(', '));
    }
    if (args.time) {
      let mins = 1050; // default 17:30
      if (typeof args.time === 'number') {
        mins = args.time;
      } else if (typeof args.time === 'string' && args.time.includes(':')) {
        const [h, m] = args.time.split(':').map(Number);
        mins = (h * 60) + (m || 0);
      }
      const tInfo = getTimeInfo(mins);
      parts.push(tInfo.prompt);
    }
    if (args.customText && args.customText.trim()) {
      parts.push(args.customText.trim());
    }

    let positive = parts.join(', ');
    if (args.aspectRatio) {
      const ar = ASPECT_RATIOS.find(a => a.id === args.aspectRatio);
      if (ar) {
        positive += ` ${ar.tag}`;
      }
    }

    const negParts = [];
    if (args.negativePresetIds && args.negativePresetIds.length > 0) {
      for (const negId of args.negativePresetIds) {
        const p = NEGATIVE_PRESETS.find(n => n.id === negId);
        if (p) negParts.push(p.tag);
      }
    }
    if (args.customNegative && args.customNegative.trim()) {
      negParts.push(args.customNegative.trim());
    }

    return {
      positivePrompt: positive.trim(),
      negativePrompt: negParts.join(', ').trim()
    };
  }

  if (name === 'image_to_prompt') {
    if (!fs.existsSync(args.filePath)) {
      throw new Error(`File not found: ${args.filePath}`);
    }
    const buffer = fs.readFileSync(args.filePath);
    return extractMetadata(buffer);
  }

  throw new Error(`Unknown tool: ${name}`);
}

// Test Mode CLI support
if (process.argv.includes('--test')) {
  console.log('Testing ImagePT MCP Server tools...');
  console.log('Available Tools:', TOOLS.map(t => t.name));
  const cats = handleToolCall('get_preset_categories', {});
  console.log('Categories count:', cats.categories.length);
  const rag = handleToolCall('search_rag_prompts', { query: 'cyberpunk neon' });
  console.log('RAG sample count:', rag.results.length);
  console.log('MCP Server test passed successfully!');
  process.exit(0);
}

// Standard JSON-RPC stdio protocol
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', async (line) => {
  if (!line.trim()) return;

  try {
    const request = JSON.parse(line);
    const id = request.id;

    if (request.method === 'initialize') {
      const response = {
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: {
            name: 'imagept-mcp-server',
            version: '1.0.0'
          }
        }
      };
      console.log(JSON.stringify(response));
      return;
    }

    if (request.method === 'tools/list') {
      const response = {
        jsonrpc: '2.0',
        id,
        result: { tools: TOOLS }
      };
      console.log(JSON.stringify(response));
      return;
    }

    if (request.method === 'tools/call') {
      const { name, arguments: toolArgs } = request.params;
      const toolResult = await handleToolCall(name, toolArgs || {});
      const response = {
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: JSON.stringify(toolResult, null, 2)
            }
          ]
        }
      };
      console.log(JSON.stringify(response));
      return;
    }

    // Default response for unhandled methods
    console.log(JSON.stringify({
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: 'Method not found' }
    }));

  } catch (err) {
    console.log(JSON.stringify({
      jsonrpc: '2.0',
      id: null,
      error: { code: -32603, message: err.message }
    }));
  }
});
