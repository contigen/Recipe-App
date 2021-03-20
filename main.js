`use strict`;
const inputText = document.querySelector(`div input`);
const resultsDiv = document.querySelector(`.results`);
const MY_APP_ID = `32bfdd32`;
const MY_APP_KEY = `6a30801c98f0d183756f47fa79062c08`;
inputText.addEventListener(`change`, () => {
  let searchQuery = inputText.value;
  getRecipe(searchQuery);
});
async function getRecipe(query) {
  const myURL = `https://api.edamam.com/search?q=${query}&app_id=${MY_APP_ID}&app_key=${MY_APP_KEY}&to=15`;
  const response = await fetch(myURL);
  const result = await response.json();
  useRecipeData(result.hits);
}
function useRecipeData(data) {
  let newDiv = ``;
  data.map((response) => {
    newDiv += `
        <div class="items">
          <img src='${response.recipe.image}' alt="Food" />
          <div class="recipe">
            <h1>${response.recipe.label}</h1>
            <a href="${response.recipe.url}">View Recipe</a>
          </div>
          <p>Calories: ${response.recipe.calories.toFixed(2)}</p>
          <p>Diet Label: ${
            response.recipe.dietLabels.length > 0
              ? response.recipe.dietLabels
              : `-`
          }</p>
          <p>Health Label: ${response.recipe.healthLabels}</p>
        </div>
      `;
  });
  resultsDiv.innerHTML = newDiv;
}
