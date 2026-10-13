// Pure JavaScript Vector Store & Semantic RAG Search Engine
// Fast in-memory vector index with Cosine Similarity

let PROMPTS_KNOWLEDGE = [];
try {
  const mod = require('../data/promptsKnowledge');
  PROMPTS_KNOWLEDGE = mod.PROMPTS_KNOWLEDGE || [];
} catch (e) {
  if (typeof window !== 'undefined' && window.PROMPTS_KNOWLEDGE) {
    PROMPTS_KNOWLEDGE = window.PROMPTS_KNOWLEDGE;
  }
}

/**
 * Tokenizes text into lowercase terms and n-grams for semantic matching
 * @param {string} text 
 * @returns {Array<string>}
 */
function tokenize(text) {
  if (!text) return [];
  // Support both English words and Thai syllable/word sequences
  const clean = text.toLowerCase().replace(/[,.:;!?'"()\[\]{}\/\\-]/g, ' ');
  const words = clean.split(/\s+/).filter(w => w.length > 1);

  // Generate 2-char and 3-char sub-grams for Thai/partial matching
  const ngrams = [];
  for (const word of words) {
    if (word.length >= 3) {
      for (let i = 0; i <= word.length - 3; i++) {
        ngrams.push(word.slice(i, i + 3));
      }
    }
  }

  return [...words, ...ngrams];
}

/**
 * Builds term frequency vector from tokens
 * @param {Array<string>} tokens 
 * @returns {Map<string, number>}
 */
function termFrequencyVector(tokens) {
  const vec = new Map();
  for (const token of tokens) {
    vec.set(token, (vec.get(token) || 0) + 1);
  }
  return vec;
}

/**
 * Computes Cosine Similarity between two term frequency vectors
 * @param {Map<string, number>} vecA 
 * @param {Map<string, number>} vecB 
 * @returns {number} 0.0 to 1.0
 */
function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (const [term, valA] of vecA.entries()) {
    normA += valA * valA;
    if (vecB.has(term)) {
      dotProduct += valA * vecB.get(term);
    }
  }

  for (const valB of vecB.values()) {
    normB += valB * valB;
  }

  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Search the knowledge base for similar prompt templates
 * @param {string} query 
 * @param {number} topK 
 * @param {string} [filterCategory]
 * @returns {Array<Object>}
 */
function searchSimilar(query, topK = 3, filterCategory = null) {
  const queryTokens = tokenize(query);
  const queryVec = termFrequencyVector(queryTokens);

  if (queryVec.size === 0) return [];

  const candidates = PROMPTS_KNOWLEDGE.filter(item => {
    if (filterCategory && item.category !== filterCategory) return false;
    return true;
  });

  const scored = candidates.map(item => {
    // Combine keywords, title, and prompt text for document vector
    const docText = `${item.title} ${(item.keywords || []).join(' ')} ${item.prompt}`;
    const docTokens = tokenize(docText);
    const docVec = termFrequencyVector(docTokens);

    const score = cosineSimilarity(queryVec, docVec);
    return {
      ...item,
      score: Math.round(score * 1000) / 1000
    };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    tokenize,
    termFrequencyVector,
    cosineSimilarity,
    searchSimilar
  };
}
