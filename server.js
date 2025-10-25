const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require('docx');

const app = express();
const port = 8899;

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Parse JSON bodies
app.use(express.json());

// Handle profile image upload
app.post('/upload-image', upload.single('profileImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ 
    success: true, 
    filePath: `/uploads/${req.file.filename}` 
  });
});

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Add this route to handle DOCX export
app.post('/export-docx', express.json({ limit: '10mb' }), async (req, res) => {
  try {
    const { html, filename } = req.body;
    
    // Create a new document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Resume",
              heading: HeadingLevel.TITLE
            }),
            new Paragraph({
              text: "This is a basic conversion of your resume to DOCX format. For better formatting, please use the PDF export option."
            })
            // In a real implementation, you would parse the HTML and convert it to docx elements
          ]
        }
      ]
    });
    
    // Generate the document
    const buffer = await Packer.toBuffer(doc);
    
    // Set response headers
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    
    // Send the document
    res.send(buffer);
  } catch (error) {
    console.error('Error generating DOCX:', error);
    res.status(500).json({ error: 'Failed to generate DOCX file' });
  }
});

// Start the server
const host = process.env.HOST || '0.0.0.0';
app.listen(port, host, () => {
  // Build friendly URLs for console output
  const localUrl = `http://localhost:${port}`;
  let networkUrl = null;
  try {
    const os = require('os');
    const nets = os.networkInterfaces();
    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Prefer IPv4, non-internal
        if (net.family === 'IPv4' && !net.internal) {
          networkUrl = `http://${net.address}:${port}`;
          break;
        }
      }
      if (networkUrl) break;
    }
  } catch (e) {
    // ignore
  }

  console.log('Resume builder running:');
  console.log(`  Local:            ${localUrl}`);
  if (networkUrl) {
    console.log(`  On Your Network:  ${networkUrl}`);
  }
  if (host && host !== '0.0.0.0') {
    console.log(`  Bound to:         ${host}:${port}`);
  }
});