document.addEventListener('DOMContentLoaded', () => {
    const nutritionForm = document.getElementById('nutrition-form');
    const foodQueryInput = document.getElementById('food-query');
    const nutritionResults = document.getElementById('nutrition-results');

    if (!nutritionForm) {
        console.error('nutritionForm element not found');
        return;
    }

    nutritionForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = foodQueryInput.value;

        try {
            const response = await fetch('/api/nutrition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            displayNutritionResults(data);
        } catch (error) {
            console.error('Error fetching nutrition data:', error);
            displayErrorMessage('Error fetching nutrition data. Please try again later.');
        }
    });

    function displayNutritionResults(data) {
        nutritionResults.innerHTML = '';

        if (data.foods && data.foods.length > 0) {
            data.foods.forEach(food => {
                const foodCard = document.createElement('div');
                foodCard.classList.add('content-card');

                foodCard.innerHTML = `
                    <h3>${food.food_name}</h3>
                    <p>Calories: ${food.nf_calories}</p>
                    <p>Protein: ${food.nf_protein}g</p>
                    <p>Carbohydrates: ${food.nf_total_carbohydrate}g</p>
                    <p>Fat: ${food.nf_total_fat}g</p>
                `;

                nutritionResults.appendChild(foodCard);
            });
        } else {
            displayErrorMessage('Food not found. Please try a different query.');
        }
    }

    function displayErrorMessage(message) {
        nutritionResults.innerHTML = `<p class="error-message">${message}</p>`;
    }
});