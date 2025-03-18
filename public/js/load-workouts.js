document.addEventListener('DOMContentLoaded', () => {
    console.log('Loading workouts from database:', workoutDatabase); 

    const workoutContainer = document.getElementById('workout-container');

    if (workoutContainer) {
        const categories = ['push', 'pull', 'legs'];

        categories.forEach(category => {
            const categorySection = document.createElement('div');
            categorySection.classList.add('exercise-category');
            const categoryHeader = document.createElement('h2');
            categoryHeader.classList.add('section-header');
            categoryHeader.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Exercises`;
            categorySection.appendChild(categoryHeader);
            
            const exercises = workoutDatabase[category].exercises;

            exercises.forEach(workout => {
                // exercise card
                const workoutCard = document.createElement('div');
                workoutCard.classList.add('exercise-card');

                const exerciseHeader = document.createElement('div');
                exerciseHeader.classList.add('exercise-header');
                
                const exerciseTitle = document.createElement('h3');
                exerciseTitle.textContent = workout.name;
                exerciseHeader.appendChild(exerciseTitle);
                
                workoutCard.appendChild(exerciseHeader);
                
                //details section
                const exerciseDetails = document.createElement('div');
                exerciseDetails.classList.add('exercise-details');
                
                // video container
                const exerciseVideo = document.createElement('div');
                exerciseVideo.classList.add('exercise-video');
                
                const videoContainer = document.createElement('div');
                videoContainer.classList.add('video-container');
                
                const videoIframe = document.createElement('iframe');
                videoIframe.src = `https://www.youtube.com/embed/${workout.youtubeId}`;
                videoIframe.title = workout.name;
                videoIframe.setAttribute('frameborder', '0');
                videoIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                videoIframe.setAttribute('allowfullscreen', '');
                
                videoContainer.appendChild(videoIframe);
                exerciseVideo.appendChild(videoContainer);
                
                // exercise info container
                const exerciseInfo = document.createElement('div');
                exerciseInfo.classList.add('exercise-info');
                
                // exercise details
                const setsInfo = document.createElement('p');
                setsInfo.innerHTML = `<strong>Sets:</strong> ${workout.sets}`;
                
                const repsInfo = document.createElement('p');
                repsInfo.innerHTML = `<strong>Reps:</strong> ${workout.reps}`;
                
                const impactInfo = document.createElement('p');
                impactInfo.innerHTML = `<strong>Impact:</strong> ${workout.impact}`;
                
                const restInfo = document.createElement('p');
                restInfo.innerHTML = `<strong>Rest:</strong> ${workout.rest}`;
                
                const modsLabel = document.createElement('p');
                modsLabel.innerHTML = `<strong>Modifications:</strong>`;
                
                const modsList = document.createElement('ul');
                modsList.classList.add('modifications-list');
                
                workout.modifications.forEach(mod => {
                    const modItem = document.createElement('li');
                    modItem.textContent = mod;
                    modsList.appendChild(modItem);
                });
                
                // Append all info elements
                exerciseInfo.appendChild(setsInfo);
                exerciseInfo.appendChild(repsInfo);
                exerciseInfo.appendChild(impactInfo);
                exerciseInfo.appendChild(restInfo);
                exerciseInfo.appendChild(modsLabel);
                exerciseInfo.appendChild(modsList);
                
                // video and info to details
                exerciseDetails.appendChild(exerciseVideo);
                exerciseDetails.appendChild(exerciseInfo);
            
                workoutCard.appendChild(exerciseDetails);
                
                categorySection.appendChild(workoutCard);
            });

            workoutContainer.appendChild(categorySection);
        });
    }
});