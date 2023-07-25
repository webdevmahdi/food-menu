let searchField = document.getElementById('search-food');
let searchBtn = document.getElementById('search-button');
searchField.addEventListener('keypress', function(event){
    if(event.keyCode == 13){
        searchBtn.click();
    }
})
let food = () => {
    let searchFood = document.getElementById('search-food');
    let searchFoodText = searchFood.value;
    if (searchFoodText == '') {
        let foodItems = document.getElementById('food-items');
        foodItems.textContent = '';
        let hOne = document.createElement('h1');
        hOne.innerText = 'Please input a food name';
        foodItems.appendChild(hOne);
    }
    else {
        let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchFoodText}`
        fetch(url)
            .then(res => res.json())
            .then(data => showFood(data.meals))

    }
}
let showFood = meals => {
    let searchFood = document.getElementById('food-items');
    searchFood.textContent = '';

    meals.forEach(meal => {
        let div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card" style="width: 18rem; margin-top: 30px; margin-left: 30px">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <h2>${meal.strMeal.slice(0, 25)}</h2>
                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
            </div>
        </div>
        `
        searchFood.appendChild(div);
    });
}
let loadMealDetails = mealID => {
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
        .then(res => res.json())
        .then(data => mealDetails(data.meals[0]))
}
let mealDetails = meal => {
    let mealContent = document.getElementById('meal-details');
    let div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="Meal image">
        <div class="card-body">
          <h5 class="card-title">${meal.strMeal}</h5>
          <p class="card-text">${meal.strInstructions}</p>
          <a href="${meal.strYoutube}" target="_blank" class="btn btn-primary">Go somewhere</a>
        </div>
        `
    mealContent.appendChild(div);
} 