const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const shortid = require('shortid');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Google Drive API setup
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'YOUR_REDIRECT_URI';
const REFRESH_TOKEN = 'YOUR_REFRESH_TOKEN';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileMetadata = { name: req.file.originalname };
    const media = { mimeType: req.file.mimetype, body: fs.createReadStream(filePath) };

    const driveResponse = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, webViewLink, webContentLink',
    });

    fs.unlinkSync(filePath); // Remove file from server after upload

    const shortLink = shortid.generate();
    res.send({ shortLink: shortLink, fileLink: driveResponse.data.webContentLink });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file to Google Drive');
  }
});

app.get('/file/:shortLink', (req, res) => {
  const shortLink = req.params.shortLink;
  // Retrieve the file link from your database and respond with the link
  res.send({ fileLink: 'https://example.com/fileLink' }); // Placeholder
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
