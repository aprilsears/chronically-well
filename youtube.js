const { google } = require('googleapis');

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

async function getVideos(videoIds) {
  const response = await youtube.videos.list({
    part: 'snippet,contentDetails,statistics',
    id: videoIds.join(',')
  });
  return response.data.items;
}

module.exports = {
  getVideos
};
