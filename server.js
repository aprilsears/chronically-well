require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const { google } = require('googleapis');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware to parse JSON data
app.use(express.json());

//CORS middleware
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Validate API credentials
if (!process.env.NUTRITIONIX_APP_ID || !process.env.NUTRITIONIX_API_KEY) {
    console.error('Missing Nutritionix API credentials');
    process.exit(1);
}

// YouTube API setup
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

// YouTube API endpoint
app.get('/api/youtube/videos', async (req, res) => {
  try {
    const videoIds = req.query.ids.split(',');
    const response = await youtube.videos.list({
      part: 'snippet,contentDetails,statistics',
      id: videoIds.join(',')
    });
    res.json(response.data.items);
  } catch (error) {
    console.error('Error fetching YouTube data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to fetch YouTube data' });
  }
});

// Nutritionix API integration
app.post('/api/nutrition', async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ error: 'Query is required' });
        }

        console.log('Received query:', query); 

        const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', 
            { query },
            {
                headers: {
                    'x-app-id': process.env.NUTRITIONIX_APP_ID,
                    'x-app-key': process.env.NUTRITIONIX_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (!response.data) {
            throw new Error('No data received from Nutritionix API');
        }

        console.log('Nutritionix API response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching nutrition data:', error);
        
        if (error.response) {
            // API error response
            return res.status(error.response.status).json({
                error: error.response.data.message || 'Error from Nutritionix API'
            });
        }
        
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
        if (err) {
            console.error('Error sending index.html:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Route for the workout database page
app.get('/workout-database', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'workout-database.html'), (err) => {
        if (err) {
            console.error('Error sending workout-database.html:', err);
            res.status(500).send('Internal Server Error');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});