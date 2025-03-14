document.addEventListener('DOMContentLoaded', () => {
    const routineForm = document.getElementById('routine-form');
    const routineList = document.getElementById('routine-list');

    if (routineForm) {
        // Handle form submission
        routineForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const routineName = routineForm.elements['routine-name'].value;
            const routine = { name: routineName };
            displayRoutine(routine);
            routineForm.reset();
        });
    } else {
        console.error('routineForm element not found');
    }

    // Define the displayRoutine function
    function displayRoutine(routine) {
        const li = document.createElement('li');
        li.textContent = routine.name;
        routineList.appendChild(li);
    }
});