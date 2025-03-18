# chronically-well
Overview:

A Code: You capstone project utilizing 3rd party API's while also highlighting HTML, CSS, and JavaScript abilities.

Project Overview:

Most fitness applications lack accommodations for individuals with chronic illnesses, creating barriers to maintaining an active lifestyle. This project addresses the need for customizable, accessible fitness resources that considers ability levels and health issues.


## Project Organization

The project is organized as follows:

| Page | Description |
|------|-------------|
| **Landing Page** | The landing page provides users with options to navigate the web application and gives an overview of what to expect, featuring sections for workout routines, macro-nutrient calculator, and nutrition planning. |
| **Workout Database Page** | Using a custom JavaScript database and YouTube API integration, this page displays categorized exercises (Push/Pull/Legs) with instructional videos, detailed information, and modifications for different ability levels. |
| **Macro Calculator** | An interactive tool that allows users to input their weight and activity level to receive personalized nutrition recommendations, including daily calorie, protein, fat, and carbohydrate targets. |
| **Nutrition** | Integrates with the Nutritionix API to allow users to search for food items and view detailed nutritional information, supporting better dietary choices for those with chronic conditions. |
| **Medical Disclaimer** | Important health information for users, clarifying that the site provides educational content but not medical advice, and encouraging consultation with healthcare professionals. |


## Capstone Requirements Fulfilled

| Requirement | Implementation |
|-------------|----------------|
| **Retrieve data from a third-party API** | • Integrated Nutritionix API for food nutrition data<br>• Implemented YouTube API for video metadata |
| **Create a Node.js web server using Express.js** | • Built a robust Express server with multiple routes<br>• Implemented API endpoints for nutrition and YouTube data |
| **Use arrays, objects to store and retrieve information** | • Created a comprehensive workout database using JavaScript objects<br>• Organized exercises in categorized arrays (push/pull/legs) |
| **Visualize data in a user-friendly way** | • Designed organized exercise cards with clear visual hierarchy<br>• Created macro-calculator with specific results |
| **Responsive Design** | • Implemented responsive layouts using Flexbox<br>• Created media queries for different screen sizes<br>• Built with mobile-first approach |

**How to Download**
1. Set up required API keys
Before installing the application, you'll need to obtain these API keys:

    A. Nutritionix API: For nutrition data lookups; Sign up at Nutritionix API
    Create an application to get your App ID and API Key

    B. YouTube API (Google Cloud): For video metadata
    Sign up for a Google Cloud account
    Create a project and enable the YouTube Data API v3
    Create API credentials for your project


2. **Clone the repository using GIT**
   ```bash
   git clone https://github.com/aprilsears/chronically-well.git
   ```

3. **Navigate to the project directory**
   ```bash
   cd chronically-well
   ```

4. **Install dependencies**
```bash
npm install
```
5. **Create environment variables file**
Create a file named .env in the project root directory with the following content:
NUTRITIONIX_APP_ID=your_app_id_here
NUTRITIONIX_API_KEY=your_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
PORT=3002

6. **Start the server**
```bash
npm run dev
```
7. **Access the application**
Open your browser and navigate to:
```bash
http://localhost:3002
```