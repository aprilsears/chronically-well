require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware to parse JSON data
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Nutritionix API integration
app.post('/api/nutrition', async (req, res) => {
    try {
        const { query } = req.body;
        console.log('Received query:', query); 

        const response = await axios.post('https://trackapi.nutritionix.com/v2/natural/nutrients', {
            query
        }, {
            headers: {
                'x-app-id': process.env.NUTRITIONIX_APP_ID,
                'x-app-key': process.env.NUTRITIONIX_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        console.log('Nutritionix API response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching nutrition data:', error.response ? error.response.data : error.message);
        res.status(500).send('Internal Server Error');
    }
});

//  Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for the workout database page
app.get('/workout-database', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'workout-database.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});