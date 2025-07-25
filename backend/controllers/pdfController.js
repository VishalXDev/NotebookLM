const fs = require('fs');
const pdfParse = require('pdf-parse');

exports.uploadPDF = async (req, res) => {
  try {
    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    // Extracted content: pdfData.text
    res.status(200).json({
      message: 'PDF uploaded successfully',
      text: pdfData.text,
      filePath,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process PDF', details: err.message });
  }
};
