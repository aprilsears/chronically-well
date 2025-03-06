// Load the IFrame Player API code asynchronously.
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const videoIds = ['VIDEO_ID_1', 'VIDEO_ID_2', 'VIDEO_ID_3']; // Add your video IDs here

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoIds[0], // Use the first video ID from the array
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    // Player is ready
}

function onPlayerStateChange(event) {
    // Handle player state changes
}

// Function to load a new video by its ID
function loadVideoById(videoId) {
    if (player && player.loadVideoById) {
        player.loadVideoById(videoId);
    }
}

// Example function to cycle through video IDs
let currentVideoIndex = 0;
function playNextVideo() {
    currentVideoIndex = (currentVideoIndex + 1) % videoIds.length;
    loadVideoById(videoIds[currentVideoIndex]);
}

