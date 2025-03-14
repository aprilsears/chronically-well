// Add event listeners for weight inputs
document.getElementById('weightManual').addEventListener('input', function() {
    document.getElementById('weight').value = '';
});

document.getElementById('weight').addEventListener('change', function() {
    document.getElementById('weightManual').value = '';
});

document.getElementById('macroForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get weight from either manual input or dropdown
    const weightManual = document.getElementById('weightManual').value;
    const weightDropdown = document.getElementById('weight').value;
    const weight = parseFloat(weightManual || weightDropdown);
    
    if (!weight) {
        alert('Please enter or select a weight');
        return;
    }
    
    const activity = parseFloat(document.getElementById('activity').value);
    
    // Calculate maintenance calories
    const maintenanceCalories = weight * 15;
    
    // Calculate macronutrients
    const proteinGrams = weight * (activity / 10);
    const fatGrams = weight * 0.3;
    const carbGrams = (maintenanceCalories * 0.40) / 4;
    
    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.classList.remove('hidden');
    
    document.getElementById('calories').textContent = Math.round(maintenanceCalories);
    document.getElementById('protein').textContent = Math.round(proteinGrams);
    document.getElementById('fat').textContent = Math.round(fatGrams);
    document.getElementById('carbs').textContent = Math.round(carbGrams);
});
