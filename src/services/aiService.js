// Universal AI Auto-fill Service
// Supports OpenAI, Google Gemini, OpenRouter, and Local Ollama

/**
 * Calls LLM to auto-fill tags, category, and prompt based on user idea and RAG context
 * @param {string} userIdea - e.g. "ผู้หญิงไทยยืนถือแก้วกาแฟริมทะเลช่วงพระอาทิตย์ตก"
 * @param {Array<Object>} ragContext - Top RAG matched templates
 * @param {Object} aiSettings - { provider, apiKey, model, baseUrl }
 * @returns {Promise<Object>}
 */
async function autoFillWithAI(userIdea, ragContext, aiSettings) {
  const { provider = 'gemini', apiKey, model, baseUrl } = aiSettings;

  if (!apiKey && provider !== 'ollama') {
    throw new Error('กรุณาระบุ API Key ในการตั้งค่า (Settings) ก่อนใช้งานระบบ AI Auto-fill');
  }

  const contextText = (ragContext || []).map((item, idx) => 
    `[Template ${idx + 1}] Title: ${item.title} | Category: ${item.category} | Prompt: ${item.prompt} | Negative: ${item.negative} | Aspect: ${item.aspect}`
  ).join('\n');

  const systemInstruction = `You are an elite prompt engineering director for AI visual generators (Midjourney, Stable Diffusion, FLUX, DALL-E).
The user provides a creative idea in Thai or English.
Use the provided RAG Masterpiece Templates as inspiration where relevant.
Output ONLY a valid JSON object without markdown formatting or code blocks in this exact structure:
{
  "category": "one of: person, landscape, logo, product, cover, banner, general, nsfw",
  "aspectRatio": "one of: 1:1, 16:9, 9:16, 4:5, 3:2, 21:9",
  "prompt": "complete polished English positive prompt ready for Midjourney/SD/FLUX",
  "negativePrompt": "comma separated negative prompt keywords to prevent defects",
  "customDetails": "English descriptive details matching the user intention",
  "suggestedTags": ["list", "of", "key", "english", "tags"]
}`;

  const userPrompt = `User Idea: "${userIdea}"\n\nRAG Context Knowledge:\n${contextText || 'None'}\n\nGenerate optimal structured prompt JSON.`;

  if (provider === 'gemini') {
    const targetModel = model || 'gemini-1.5-flash';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            { text: systemInstruction },
            { text: userPrompt }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.3,
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
    if (!candidateText) throw new Error('No response from Gemini API');
    return JSON.parse(candidateText.trim());

  } else if (provider === 'openai' || provider === 'openrouter') {
    const defaultUrl = provider === 'openrouter' ? 'https://openrouter.ai/api/v1' : 'https://api.openai.com/v1';
    const endpoint = (baseUrl ? baseUrl.replace(/\/$/, '') : defaultUrl) + '/chat/completions';
    const targetModel = model || (provider === 'openrouter' ? 'meta-llama/llama-3.3-70b-instruct:free' : 'gpt-4o-mini');

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
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3
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
    const targetModel = model || 'llama3';

    const requestBody = {
      model: targetModel,
      stream: false,
      format: 'json',
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: userPrompt }
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
  module.exports = { autoFillWithAI };
}
