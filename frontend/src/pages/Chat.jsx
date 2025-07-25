import { useState } from 'react';
import API from '../api';
import PDFViewer from '../components/PDFViewer';
import ChatBox from '../components/ChatBox';

const Chat = () => {
  const [file, setFile] = useState(null);
  const [pdfPath, setPdfPath] = useState('');
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const upload = async () => {
    const form = new FormData();
    form.append('pdf', file);

    const res = await API.post('/pdf/upload', form);
    const serverPath = `http://localhost:5000/${res.data.filePath}`; // ✅ make file path absolute
    setPdfPath(serverPath);
  };

  return (
    <div className="p-6">
      {!pdfPath && (
        <div className="space-y-4">
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
          <button onClick={upload} className="bg-green-600 text-white px-4 py-2 rounded">
            Upload PDF
          </button>
        </div>
      )}

      {pdfPath && (
        <>
          <p className="text-gray-600 mb-2">
            Page {page} of {numPages}
          </p>
          <PDFViewer file={pdfPath} pageNumber={page} setNumPages={setNumPages} />
          <ChatBox filePath={pdfPath} onCitationClick={(p) => setPage(p)} />
        </>
      )}
    </div>
  );
};

export default Chat;
