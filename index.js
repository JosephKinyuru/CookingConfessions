const initialize = () => {
    const categories = document.querySelectorAll('.category');
    const recipeListDisplay = document.getElementById('recipeList');
  
    function renderFoodLists(recipe) {                                             // Renders food objects into cards for first Section
      let card = document.createElement('li');
      card.className = 'recipeCards';
      card.id = recipe.id;
      card.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${recipe.picture}" class="card-img-top" alt="food picture">
          <div class="card-body">
            <h4 class="card-title">${recipe.name}</h4>
            <p class="card-text">${recipe.description}</p>
            <a class="viewButton" id="${recipe.id}">View Recipe</a>
          </div>
        </div>
      `;

      recipeListDisplay.appendChild(card);


      const viewButton = card.querySelector('.viewButton');
      if (viewButton) {
       viewButton.addEventListener('click', handleViewButtonClick);
     }

    }
  
    let clickedCategoryId = 'appetizers';                                //Default display for food category
  
    function fetchFoodListData(clickedCategoryId) {
      recipeListDisplay.innerHTML = '';                                 //Removes contents of previous category

      fetch(`http://localhost:4000/${clickedCategoryId}`)
        .then(resp => resp.json())
        .then(recipes => {
          recipes.forEach(recipe => renderFoodLists(recipe));
        });
    }
    fetchFoodListData(clickedCategoryId);
  
    categories.forEach(category => category.addEventListener('click', handleClick));
  
    function handleClick(e) {
      const clickedCategory = e.target;
      const activeCategory = document.querySelector('.category.active');
      if (activeCategory) {
        activeCategory.classList.remove('active');
      }
  
      clickedCategory.classList.add('active');
  
      clickedCategoryId = e.target.id;
      fetchFoodListData(clickedCategoryId);
    }

    function handleViewButtonClick(e) {
        const recipeId = e.target.closest('.recipeCards').id;
        console.log('View Recipe clicked for recipe ID:', recipeId);
      }
  };
  
  document.addEventListener('DOMContentLoaded', initialize);
  