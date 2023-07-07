const initialize = () => {
    const categories = document.querySelectorAll('.category');
    const recipeListDisplay = document.getElementById('recipeList');
    const fullRecipeDisplay = document.getElementById(`recipeFull`);
    const commentsDisplay = document.getElementById(`commentsFood`)
  
    function renderFoodLists(recipe, clickedCategoryId) {                                             // Renders food objects into cards for first Section
      let card = document.createElement('li');
      card.className = 'recipeCards';
      card.id = recipe.id;
      card.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${recipe.picture}" class="card-img-top" alt="food picture">
          <div class="card-body">
            <h4 class="card-title">${recipe.name}</h4>
            <hr style="width:230px;">
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

      fetch(`https://recipesapi-q6gn.onrender.com/${clickedCategoryId}`)
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

    function renderFullRecipe(recipe, currentCategory ) {
      let card = document.createElement('li');
      card.className = 'fullRecipeCard';
      card.id = recipe.id;
    
      // Create the div for the first section
      let div1 = document.createElement('div');
      div1.className = 'div1';
    
      // Create the image element
      let image = document.createElement('img');
      image.src = recipe.picture;
      image.alt = 'Image for food recipe on display';
    
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
      
      let card2 = document.createElement(`li`);                       // Start of section 2 card
      card2.className = `commentSection`;
      card2.id = `${recipe.id}`;

      //Creating div to show comments section
      let div4 = document.createElement(`div`);
      div4.className = `div4`;

      //Create the title for comments
      let commentsTitle = document.createElement('h3');
      commentsTitle.textContent = 'Comments:';
    
      // Create the unordered list for comments
      let commentsList = document.createElement('ul');
      recipe.comments.forEach((comment) => {
        let listItem2 = document.createElement('li');
        listItem2.textContent = `${comment.name} : ${comment.comment}`;
        commentsList.appendChild(listItem2);
      });
    
      // Append the title and comments list to div4
      div4.appendChild(commentsTitle);
      div4.appendChild(commentsList);

      //Create div for comment form
      let div5 = document.createElement(`div`);
      div5.className = `div5`;                                         //For .div5 list style should be none

      //Creating the title for comments
      let commentFormTitle = document.createElement(`h3`);
      commentFormTitle.textContent = `Add Comment:`

      //Creating the form for the add comments
      let randomList = document.createElement(`ul`);
      let listItemForm = document.createElement(`li`);
      listItemForm.innerHTML =`
      <form id="commentForm">
           <label for="name">Name:</label>
          <input type="text" style="border-radius:10px;" id="name" name="name" required><br><br>

          <label for="comment">Comment:</label><br>
          <textarea id="comment" style="border-radius:12px;" name="comment" rows="4" cols="50" required></textarea><br><br>

          <button id="buttonForComment"  type="submit" style="background-color:#85C1E9; height:28px; width:120px; border-radius:20px; border: 1px solid black;" >Add comment</button>
      </form>
      `;

      randomList.appendChild(listItemForm);

      //Append the title and comments list to div 5
      div5.appendChild(commentFormTitle);
      div5.appendChild(randomList);

      // Add event listener for form submission
      listItemForm.querySelector("#commentForm").addEventListener("submit", function(event) {
      event.preventDefault();
    
      // Geting information from comment form
      const nameInput = document.getElementById("name");
      const commentInput = document.getElementById("comment");
      const name = nameInput.value;
      const comment1 = commentInput.value;
      
      //Handling structure limitations due to json structure
      const existingArray = recipe.comments;
      const newObject = {
        "name":`${name}`,
        "comment":`${comment1}`
      };

      existingArray.push(newObject);

      const patchPayLoad = {
        comments:existingArray,
      };
      
      //Patch request to server
      fetch(`https://recipesapi-q6gn.onrender.com/${currentCategory}/${recipe.id}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
         },
        body: JSON.stringify(patchPayLoad),
      })
      .then(()=>{
        fetchFoodRecipe(currentCategory, recipe.id)
      })
      .catch(error => {
        console.error(error);
      })
      // Clear the input fields if needed
      nameInput.value = "";
      commentInput.value = "";
      });

      // Appending div4 and div5 to card2
      card2.appendChild(div4);
      card2.appendChild(div5);

      //Appending card2 to commentsDisplay
      commentsDisplay.appendChild(card2);
    }
    
    
    //Default displays for fullRecipe when site loads
    let currentCategory = `appetizers`;                              
    let recipeId = `1`;
    function fetchFoodRecipe(currentCategory , recipeId){
      //Removes previously displayed recipe
      fullRecipeDisplay.innerHTML = ``; 
      commentsDisplay.innerHTML = ``;                            

      // Fetches one recipe
      fetch(`https://recipesapi-q6gn.onrender.com/${currentCategory}/${recipeId}`)      
      .then(resp => resp.json())
      .then(recipe => renderFullRecipe(recipe, currentCategory))
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
  