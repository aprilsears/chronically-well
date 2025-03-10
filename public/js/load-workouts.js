document.addEventListener('DOMContentLoaded', () => {
    console.log(workoutDatabase); 

    const workoutContainer = document.getElementById('workout-container');

    if (workoutContainer) {
        const categories = ['push', 'pull', 'legs'];

        categories.forEach(category => {
            const categorySection = document.createElement('section');
            categorySection.classList.add('content-section');
            categorySection.innerHTML = `<h2 class="section-header">${category.charAt(0).toUpperCase() + category.slice(1)} Exercises</h2>`;
            
            const exercises = workoutDatabase[category].exercises;

            exercises.forEach(workout => {
                const workoutCard = document.createElement('div');
                workoutCard.classList.add('content-card');

                const thumbnailUrl = `https://img.youtube.com/vi/${workout.youtubeId}/0.jpg`;

                workoutCard.innerHTML = `
                    <h3>${workout.name}</h3>
                    <p>Sets: ${workout.sets}</p>
                    <p>Reps: ${workout.reps}</p>
                    <p>Impact: ${workout.impact}</p>
                    <p>Rest: ${workout.rest}</p>
                    <p>Modifications: ${workout.modifications.join(', ')}</p>
                    <div class="video-thumbnail">
                        <a href="https://www.youtube.com/watch?v=${workout.youtubeId}" target="_blank">
                            <img src="${thumbnailUrl}" alt="Video Thumbnail">
                        </a>
                    </div>
                `;

                categorySection.appendChild(workoutCard);
            });

            workoutContainer.appendChild(categorySection);
        });
    }
});