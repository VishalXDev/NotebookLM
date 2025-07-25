📚 NotebookLM Clone – PDF Chat Assistant

A full-stack web application inspired by Google NotebookLM. This app allows users to upload large PDF files, read them in a viewer, and ask questions via an AI-powered chat interface — complete with page citations and direct PDF navigation.

---

## 🚀 Features

- ✅ Upload large PDF files
- ✅ View PDFs directly in the browser
- ✅ Ask questions about the content in a chat interface
- ✅ Get AI-generated responses with in-text citations
- ✅ Clickable citation buttons scroll to exact PDF page
- ✅ Extracted content vectorized for efficient search
- ✅ Fully responsive UI with smooth user experience

---

## 🛠 Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-pdf](https://github.com/wojtekmaj/react-pdf)
- Vite

### Backend
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Multer](https://github.com/expressjs/multer) (for file upload)
- [pdf-parse](https://www.npmjs.com/package/pdf-parse)
- [OpenAI API](https://platform.openai.com/) (for chat responses)
- [cors](https://www.npmjs.com/package/cors)

---

## ⚙️ Setup Instructions

### 📦 Prerequisites
- Node.js v18+
- npm
- OpenAI API Key (for AI integration)

---

### 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
Runs at: http://localhost:5173

🔧 Backend Setup
bash
Copy
Edit
cd backend
npm install
node server.js
Runs at: http://localhost:5000

✅ Make sure the backend is serving static files from /uploads.

📁 File Upload + Chat Flow
Upload a PDF

PDF displays in the viewer

Ask questions in the chat

Click citation to scroll to referenced PDF page

🌐 Deployment
You can deploy this app using:

Netlify or Vercel for frontend

Render or Railway for backend

✅ Ensure the backend /uploads directory is properly exposed.
✅ Update API endpoints in frontend/src/api.js accordingly.

📌 Known Limitations
Currently supports single PDF at a time

Citation accuracy may vary based on OpenAI model response quality

No user authentication (optional feature)

📁 Folder Structure
bash
Copy
Edit
NotebookLM-main/
│
├── frontend/
│   └── React app (PDF Viewer, ChatBox, Tailwind UI)
│
├── backend/
│   ├── server.js
│   ├── controllers/pdfController.js
│   ├── routes/pdfRoutes.js
│   ├── uploads/
│   └── utils/
📬 Submission Notes
✅ Source code zipped (not on GitHub)

✅ Hosted frontend + backend available (optional deployment)

✅ This README + clean code structure provided

Built with ❤️ for the Take-Home Assignment: Google NotebookLM Clone