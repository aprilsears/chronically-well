document.addEventListener('DOMContentLoaded', () => {
    const routineForm = document.getElementById('routine-form');
    const routineList = document.getElementById('routine-list');

    // Handle form submission
    routineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const routineName = routineForm.elements['routine-name'].value;
        const routine = { name: routineName };
        displayRoutine(routine);
        routineForm.reset();
    });

    // Define the displayRoutine function
    function displayRoutine(routine) {
        const li = document.createElement('li');
        li.textContent = routine.name;
        routineList.appendChild(li);
    }
});