// Load the IFrame Player API code asynchronously.
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Get all video IDs from the workout database
function extractVideoIds() {
    const videoIds = [];
    
    // Push/Pull/Legs categories
    ['push', 'pull', 'legs'].forEach(category => {
        if (workoutDatabase[category] && workoutDatabase[category].exercises) {
            workoutDatabase[category].exercises.forEach(exercise => {
                if (exercise.youtubeId && !videoIds.includes(exercise.youtubeId)) {
                    videoIds.push(exercise.youtubeId);
                }
            });
        }
    });
    
    return videoIds;
}

// Get video details from server's YouTube API endpoint
async function fetchVideoDetails(videoIds) {
    try {
        const response = await fetch(`/api/youtube/videos?ids=${videoIds.join(',')}`);
        if (!response.ok) {
            throw new Error('Failed to fetch video details');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching video details:', error);
        return [];
    }
}

let player;
let videoIds = [];
let videoDetails = [];

// Initialize video player once the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    // Extract video IDs from the workout database
    videoIds = extractVideoIds();
    
    // Create thumbnails for each video
    const videoThumbnailsContainer = document.getElementById('video-thumbnails');
    if (videoThumbnailsContainer) {
        videoIds.forEach((videoId, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.classList.add('video-thumbnail');
            thumbnail.innerHTML = `
                <img src="https://img.youtube.com/vi/${videoId}/0.jpg" alt="Video Thumbnail">
            `;
            thumbnail.addEventListener('click', () => loadVideoById(videoId));
            videoThumbnailsContainer.appendChild(thumbnail);
        });
    }
    
    // Try to fetch additional video details if YouTube API key is configured
    try {
        videoDetails = await fetchVideoDetails(videoIds);
        console.log('Fetched video details:', videoDetails);
        // You can use these details to enhance the UI
    } catch (error) {
        console.warn('Could not fetch YouTube video details:', error);
        // Proceed without the extra details
    }
});

function onYouTubeIframeAPIReady() {
    // Make sure at least one video ID before creating the player
    if (videoIds.length === 0) {
        videoIds = extractVideoIds();
    }
    
    if (videoIds.length > 0) {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: videoIds[0],
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    } else {
        console.error('No video IDs available for the player');
    }
}

function onPlayerReady(event) {
    // Player is ready
    console.log('YouTube player is ready');
}

function onPlayerStateChange(event) {
    // Handle player state changes
    if (event.data === YT.PlayerState.ENDED) {
        // Automatically play the next video when one ends
        playNextVideo();
    }
}

// Function to load a new video by its ID
function loadVideoById(videoId) {
    if (player && player.loadVideoById) {
        player.loadVideoById(videoId);
    }
}

// Current video index
let currentVideoIndex = 0;

// Function to play the next video in the list
function playNextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoIds.length;
    loadVideoById(videoIds[currentVideoIndex]);
}

// Export functions for use in other scripts
window.youtubePlayer = {
    loadVideo: loadVideoById,
    playNext: playNextVideo,
    getVideoIds: () => videoIds,
    getVideoDetails: () => videoDetails
};