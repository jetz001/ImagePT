// Image-to-Prompt Hybrid Engine
// 1. Offline Mode: Extracts Stable Diffusion / ComfyUI / NovelAI metadata using ExifReader
// 2. Online Mode: Multimodal Vision AI (Gemini, OpenAI, OpenRouter) for general images

let ExifReader;
try {
  ExifReader = require('exifreader');
} catch (e) {
  // Browser context fallback if loaded via script tag
  if (typeof window !== 'undefined' && window.ExifReader) {
    ExifReader = window.ExifReader;
  }
}

/**
 * Extracts embedded generation metadata from image buffer using ExifReader
 * @param {ArrayBuffer|Buffer} arrayBuffer 
 * @returns {Object} Extracted prompt, negative prompt, and parameters
 */
async function extractMetadata(arrayBuffer) {
  if (!ExifReader) {
    throw new Error('ExifReader library is not loaded');
  }

  const tags = await ExifReader.load(arrayBuffer, { expanded: true });
  
  let positivePrompt = '';
  let negativePrompt = '';
  let parametersRaw = '';
  let source = 'none';

  // 1. Stable Diffusion WebUI (A1111 / Forge) in PNG Text Chunk "parameters"
  if (tags.png && tags.png.parameters && tags.png.parameters.description) {
    parametersRaw = tags.png.parameters.description;
    source = 'Stable Diffusion WebUI';
  } else if (tags.xmp && tags.xmp.parameters && tags.xmp.parameters.description) {
    parametersRaw = tags.xmp.parameters.description;
    source = 'Stable Diffusion (XMP)';
  } else if (tags.UserComment && tags.UserComment.description) {
    parametersRaw = tags.UserComment.description;
    source = 'UserComment';
  }

  // Parse SD WebUI parameters format
  if (parametersRaw) {
    const negMarker = 'Negative prompt:';
    const stepsMarker = 'Steps:';

    const negIdx = parametersRaw.indexOf(negMarker);
    const stepsIdx = parametersRaw.indexOf(stepsMarker);

    if (negIdx !== -1) {
      positivePrompt = parametersRaw.substring(0, negIdx).trim();
      if (stepsIdx !== -1 && stepsIdx > negIdx) {
        negativePrompt = parametersRaw.substring(negIdx + negMarker.length, stepsIdx).trim();
      } else {
        negativePrompt = parametersRaw.substring(negIdx + negMarker.length).trim();
      }
    } else if (stepsIdx !== -1) {
      positivePrompt = parametersRaw.substring(0, stepsIdx).trim();
    } else {
      positivePrompt = parametersRaw.trim();
    }
  }

  // 2. ComfyUI workflow / prompt chunks
  if (!positivePrompt && tags.png) {
    if (tags.png.prompt && tags.png.prompt.description) {
      try {
        const comfyPrompt = JSON.parse(tags.png.prompt.description);
        source = 'ComfyUI';
        // Scan nodes for CLIPTextEncode positive and negative
        for (const nodeId in comfyPrompt) {
          const node = comfyPrompt[nodeId];
          if (node.class_type === 'CLIPTextEncode' && node.inputs && node.inputs.text) {
            const textVal = String(node.inputs.text).trim();
            if (!positivePrompt) {
              positivePrompt = textVal;
            } else if (!negativePrompt && (textVal.includes('bad') || textVal.includes('ugly') || textVal.includes('low quality'))) {
              negativePrompt = textVal;
            }
          }
        }
      } catch (err) {
        // Not JSON
      }
    }
  }

  // 3. NovelAI / NovelAI Software tags
  if (!positivePrompt && tags.png && tags.png.Comment) {
    try {
      const nai = JSON.parse(tags.png.Comment.description);
      if (nai.prompt) {
        positivePrompt = nai.prompt;
        negativePrompt = nai.uc || '';
        source = 'NovelAI';
      }
    } catch (e) {}
  }

  return {
    found: Boolean(positivePrompt || negativePrompt),
    positivePrompt: positivePrompt || '',
    negativePrompt: negativePrompt || '',
    source: source,
    raw: parametersRaw
  };
}

/**
 * Sends image to Multimodal Vision AI for reverse prompt engineering
 * @param {string} imageBase64 - Base64 encoded image
 * @param {string} mimeType - e.g. "image/jpeg", "image/png"
 * @param {Object} aiSettings - { provider, apiKey, model, baseUrl }
 */
async function analyzeImageWithAI(imageBase64, mimeType, aiSettings) {
  const { provider = 'gemini', apiKey, model, baseUrl } = aiSettings;

  if (!apiKey && provider !== 'ollama') {
    throw new Error('กรุณาระบุ API Key ในการตั้งค่า (Settings) ก่อนใช้งานระบบ Vision AI');
  }

  const systemInstruction = `You are a world-class prompt engineer for AI image generators (Midjourney, Stable Diffusion, FLUX, DALL-E).
Analyze the provided image in detail: subject, composition, art style, camera shot, lighting, atmosphere, and colors.
Return ONLY a valid JSON object in this exact schema, without markdown formatting or code blocks:
{
  "prompt": "detailed comprehensive positive prompt in English",
  "negativePrompt": "recommended negative prompt in English",
  "category": "one of: person, landscape, logo, product, cover, banner, general, nsfw",
  "aspectRatio": "one of: 1:1, 16:9, 9:16, 4:5, 3:2, 21:9",
  "detectedStyle": "e.g. Photorealistic, Cinematic, Anime, 3D Render"
}`;

  if (provider === 'gemini') {
    const targetModel = model || 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const requestBody = {
      contents: [
        {
          parts: [
            { text: systemInstruction },
            {
              inline_data: {
                mime_type: mimeType || 'image/jpeg',
                data: cleanBase64
              }
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.2,
        response_mime_type: 'application/json'
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Gemini API Error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) throw new Error('No response from Gemini Vision');
    return JSON.parse(candidateText.trim());

  } else if (provider === 'openai' || provider === 'openrouter') {
    const defaultUrl = provider === 'openrouter' ? 'https://openrouter.ai/api/v1' : 'https://api.openai.com/v1';
    const endpoint = (baseUrl ? baseUrl.replace(/\/$/, '') : defaultUrl) + '/chat/completions';
    const targetModel = model || (provider === 'openrouter' ? 'meta-llama/llama-3.2-11b-vision-instruct:free' : 'gpt-4o-mini');

    const cleanBase64Url = imageBase64.startsWith('data:') ? imageBase64 : `data:${mimeType};base64,${imageBase64}`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    };
    if (provider === 'openrouter') {
      headers['HTTP-Referer'] = 'https://github.com/ImagePT';
      headers['X-Title'] = 'ImagePT AI Studio';
    }

    const requestBody = {
      model: targetModel,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: systemInstruction },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Reverse engineer this image and output the master prompt JSON.' },
            { type: 'image_url', image_url: { url: cleanBase64Url } }
          ]
        }
      ]
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`${provider.toUpperCase()} API Error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    return JSON.parse(content.trim());

  } else if (provider === 'ollama') {
    const endpoint = (baseUrl ? baseUrl.replace(/\/$/, '') : 'http://localhost:11434') + '/api/chat';
    const targetModel = model || 'llava';
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const requestBody = {
      model: targetModel,
      stream: false,
      format: 'json',
      messages: [
        {
          role: 'user',
          content: systemInstruction,
          images: [cleanBase64]
        }
      ]
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Ollama Error: ${errText}`);
    }

    const data = await res.json();
    return JSON.parse(data.message.content.trim());
  }

  throw new Error(`Unsupported provider: ${provider}`);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { extractMetadata, analyzeImageWithAI };
}
