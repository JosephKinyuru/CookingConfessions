const initialize = () => {
    const categories = document.querySelectorAll(`.category`);
    
    categories.forEach(category => category.addEventListener(`click`, handleClick))

    function handleClick(e){
        const clickedCategory = e.target
        const activeCategory = document.querySelector('.category.active');
        if (activeCategory) {
          activeCategory.classList.remove('active');
        }
    
        clickedCategory.classList.add('active');

        const clickedCategoryId = e.target.id;
    }
    
}

document.addEventListener(`DOMContentLoaded`, initialize);