// Load the IFrame Player API code asynchronously.
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

const videoIds = ['6tW4LUaOxlE', 'JSDpq14vCZ8', 'RLTy299fVVc', '5dw9gAAdXjU', 'Jp9RR9glHX4', '6tW4LUaOxlE', 'JSDpq14vCZ8', 'RLTy299fVVc', '5dw9gAAdXjU', 'Jp9RR9glHX4'
, '1FjkhpZsaxc', 'HCA4B1IDcAk', 'Nqh7q3zDCoQ', 'tNRk2rWVgBo', '8d6d46pGdQM', 'Kl3LEzQ5Zqs', '0y4tdUNPdlE', 'shYjCEjsuHg', 'EqCsK_vlnfE', '9icS_gPceJQ', 'fpYaVKypytg', '6tJjQFK_Q9U', 'tn-ABeb1QAM']; 

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoIds[0], 
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

