const OpenAI = require('openai');
const dotenv = require('dotenv');
const natural = require('natural');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const CHUNK_SIZE = 800;

function splitIntoChunks(text) {
  const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [];
  const chunks = [];
  let chunk = '';

  for (let i = 0; i < sentences.length; i++) {
    if ((chunk + sentences[i]).length > CHUNK_SIZE) {
      chunks.push(chunk.trim());
      chunk = '';
    }
    chunk += sentences[i] + ' ';
  }

  if (chunk) chunks.push(chunk.trim());

  return chunks.map((chunk, idx) => ({ chunk, page: `Page ${idx + 1}` }));
}

async function getEmbedding(text) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });

  return response.data[0].embedding;
}

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));
  return dotProduct / (magA * magB);
}

async function getRelevantChunks(pdfText, question) {
  const chunks = splitIntoChunks(pdfText);
  const questionEmbedding = await getEmbedding(question);

  const scoredChunks = await Promise.all(
    chunks.map(async (chunkObj) => {
      const embedding = await getEmbedding(chunkObj.chunk);
      const score = cosineSimilarity(embedding, questionEmbedding);
      return { ...chunkObj, score };
    })
  );

  scoredChunks.sort((a, b) => b.score - a.score);
  return scoredChunks.slice(0, 4); // Top 4 chunks
}

module.exports = { getRelevantChunks };
