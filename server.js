try {
  require('dotenv').config();
} catch (error) {
  console.error('dotenv module is not installed. Please run "npm install dotenv".');
  process.exit(1);
}

const express = require('express');
const path = require('path');
const fs = require('fs');
const { searchVideos, getVideos } = require('./youtube');
const app = express();
const PORT = process.env.PORT || 3002;

try {
} catch (error) {
  console.error('One or more required modules are not installed. Please check the require statements and run "npm install".');
  process.exit(1);
}

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api-key', (req, res) => {
  res.json({ apiKey: process.env.YOUTUBE_API_KEY });
});

app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q;
    const videos = await searchVideos(query);
    res.json(videos);
  } catch (error) {
    console.error('Error searching videos:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/videos', async (req, res) => {
  try {
    const videoConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'videoConfig.json'), 'utf8'));
    const videos = await getVideos(videoConfig.videoIds);
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});