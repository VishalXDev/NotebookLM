import { useState } from 'react';
import API from '../api';

const ChatBox = ({ filePath, onCitationClick }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);

  const ask = async () => {
    const res = await API.post('/chat/ask', { question, filePath });
    setMessages([...messages, { question, answer: res.data.answer, citations: res.data.citations }]);
    setQuestion('');
  };

  return (
    <div className="p-4 w-full max-w-3xl">
      <div className="space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className="border p-3 rounded bg-gray-100">
            <p className="font-bold">You: {msg.question}</p>
            <p className="mt-2 whitespace-pre-line">{msg.answer}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {msg.citations.map((page, idx) => (
                <button
                  key={idx}
                  className="text-sm px-2 py-1 bg-blue-100 rounded"
                  onClick={() => onCitationClick(parseInt(page.replace('Page ', '')))}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-4 gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about the PDF..."
        />
        <button onClick={ask} className="bg-blue-600 text-white px-4 py-2 rounded">
          Ask
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
