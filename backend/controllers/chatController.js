const fs = require('fs');
const pdfParse = require('pdf-parse'); // ✅ needed for binary PDF parsing
const { getRelevantChunks } = require('../utils/vectorizer');
const axios = require('axios');

exports.askQuestion = async (req, res) => {
  try {
    const { question, filePath } = req.body;

    if (!question || !filePath) {
      return res.status(400).json({ error: 'Missing question or filePath' });
    }

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'PDF file not found. Please re-upload.' });
    }

    // ✅ Parse the PDF content properly
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);
    const pdfText = pdfData.text;

    // ✅ Get top relevant chunks from vectorizer
    const relevantChunks = await getRelevantChunks(pdfText, question);
    const context = relevantChunks.map(c => c.chunk).join('\n');

    const prompt = `
You are a helpful assistant. Use the following context extracted from a PDF to answer the question:

Context:
${context}

Question:
${question}

Answer with citations like [Page X] for each reference.
`;

    // ✅ Call OpenAI Chat Completion API
    const completion = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You answer questions based on PDF context.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const answer = completion.data.choices[0].message.content;
    res.status(200).json({ answer, citations: relevantChunks.map(c => c.page) });
  } catch (err) {
    console.error('Error in askQuestion:', err);
    res.status(500).json({ error: 'Failed to process question' });
  }
};
