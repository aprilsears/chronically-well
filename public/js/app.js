
document.addEventListener('DOMContentLoaded', () => {
    const routineForm = document.getElementById('routine-form');
    const routineList = document.getElementById('routine-list');


    const routines = getRoutines();
    routines.forEach(routine => displayRoutine(routine));

    
    routineForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const routineName = routineForm.elements['routine-name'].value;
        const routine = { name: routineName };
        saveRoutine(routine);
        displayRoutine(routine);
        routineForm.reset();
    });

    
    function displayRoutine(routine) {
        const li = document.createElement('li');
        li.textContent = routine.name;
        routineList.appendChild(li);
    }
});
