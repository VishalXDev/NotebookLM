import { Document, Page } from 'react-pdf';
import { useState, useEffect } from 'react';
import '../pdf-worker'; // 👈 Loads PDF.js worker

const PDFViewer = ({ file, pageNumber, setNumPages }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔍 PDFViewer received file URL:", file);
  }, [file]);

  return (
    <div className="w-full flex justify-center mt-4">
      <Document
        file={file}
        onLoadSuccess={({ numPages }) => {
          setNumPages(numPages);
          setError(null);
        }}
        onLoadError={(err) => {
          console.error('PDF load error:', err.message);
          setError('❌ Failed to load PDF file.');
        }}
      >
        <Page pageNumber={pageNumber} width={600} />
      </Document>

      {error && (
        <p className="text-red-600 mt-2">{error}</p>
      )}
    </div>
  );
};

export default PDFViewer;
