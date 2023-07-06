const initialize = () => {
    const categories = document.querySelectorAll('.category');
    const recipeListDisplay = document.getElementById('recipeList');
    const fullRecipeDisplay = document.getElementById(`recipeFull`);
  
    function renderFoodLists(recipe, clickedCategoryId) {                                             // Renders food objects into cards for first Section
      let card = document.createElement('li');
      card.className = 'recipeCards';
      card.id = recipe.id;
      card.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${recipe.picture}" class="card-img-top" alt="food picture">
          <div class="card-body">
            <h4 class="card-title">${recipe.name}</h4>
            <div class="icon-container">
                <div>
                   <i class="la la-clock icon"><span class="icon-number">${recipe.time}</span></i>
                   <div class="icon-info">
                      <span class="icon-text">Minutes</span>
                   </div>
                </div>
                <div>
                <i class="la la-book-open icon"><span class="icon-number">${recipe.ingredientsNo}</span></i>
                <div class="icon-info">
                    <span class="icon-text">Ingredients</span>
                  </div>
                </div>
                <div>
                <i class="la la-user icon"><span class="icon-number">${recipe.persons}</span></i>
                <div class="icon-info">
                    <span class="icon-text">Persons</span>
                </div>
                </div>
            </div>
            <p class="card-text">${recipe.description}</p>
            <a class="viewButton" id="${clickedCategoryId}">View Recipe</a>
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
          recipes.forEach(recipe => renderFoodLists(recipe, clickedCategoryId));
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

    function renderFullRecipe(recipe) {
      let card = document.createElement('li');
      card.className = 'fullRecipeCard';
      card.id = recipe.id;
    
      // Create the div for the first section
      let div1 = document.createElement('div');
      div1.className = 'div1';
    
      // Create the image element
      let image = document.createElement('img');
      image.src = recipe.picture;
      image.alt = 'Image for Div 1';
    
      // Create the heading and description
      let heading = document.createElement('h2');
      heading.textContent = recipe.name;
    
      let description = document.createElement('p');
      description.textContent = recipe.description;
    
      // Append the elements to div1
      div1.appendChild(image);
      div1.appendChild(heading);
      div1.appendChild(description);
    
      // Create the div for the second section
      let div2 = document.createElement('div');
      div2.className = 'div2';
    
      // Create the title for ingredients
      let ingredientsTitle = document.createElement('h3');
      ingredientsTitle.textContent = 'Ingredients:';
    
      // Create the unordered list for ingredients
      let ingredientsList = document.createElement('ul');
      recipe.ingredients.forEach((ingredient) => {
        let listItem = document.createElement('li');
        listItem.textContent = ingredient;
        ingredientsList.appendChild(listItem);
      });
    
      // Append the title and ingredients list to div2
      div2.appendChild(ingredientsTitle);
      div2.appendChild(ingredientsList);
    
      // Create the div for the third section
      let div3 = document.createElement('div');
      div3.className = 'div3';
    
      // Create the title for directions
      let directionsTitle = document.createElement('h3');
      directionsTitle.textContent = 'Directions:';
    
      // Create the unordered list for directions
      let directionsList = document.createElement('ul');
      recipe.directions.forEach((direction) => {
        let listItem = document.createElement('li');
        listItem.textContent = direction;
        directionsList.appendChild(listItem);
      });
    
      // Append the title and directions list to div3
      div3.appendChild(directionsTitle);
      div3.appendChild(directionsList);
    
      // Append div1, div2, and div3 to the card
      card.appendChild(div1);
      card.appendChild(div2);
      card.appendChild(div3);
    
      // Append the card to the fullRecipeDisplay
      fullRecipeDisplay.appendChild(card);                           
    }
    
    
    //Default displays for fullRecipe when site loads
    let currentCategory = `appetizers`;                              
    let recipeId = `1`;
    function fetchFoodRecipe(currentCategory , recipeId){
      //Removes previously displayed recipe
      fullRecipeDisplay.innerHTML = ``;                             

      // Fetches one recipe
      fetch(`http://localhost:4000/${currentCategory}/${recipeId}`)      
      .then(resp => resp.json())
      .then(recipe => renderFullRecipe(recipe))
    }
    fetchFoodRecipe(currentCategory, recipeId)

    function handleViewButtonClick(e) {
        const clickedViewButton = e.target ;
        const activeViewButton = document.querySelector(`.viewButton.active`);
        if(activeViewButton){
            activeViewButton.classList.remove(`active`);
        }

        clickedViewButton.classList.add(`active`);

        recipeId = e.target.closest('.recipeCards').id;
        console.log('View Recipe clicked for recipe ID:', recipeId);
        currentCategory = e.target.id ;
        fetchFoodRecipe(currentCategory, recipeId);
      }
  };
  
  document.addEventListener('DOMContentLoaded', initialize);
  