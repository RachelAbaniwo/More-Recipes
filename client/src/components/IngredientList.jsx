import PropTypes from 'prop-types';
import React from 'react';

const IngredientList =  ({ ingredients }) => {
  ingredients = ingredients.trim();
  if (ingredients[ingredients.length - 1] === ',') {
    ingredients = ingredients.substr(0, ingredients.length - 1);
  }
  let ingredientsArray = ingredients.split(",");
  let ingredientsList = ingredientsArray.map((ingredient, index) => <li style={{fontSize: '18px'}} key={index}>{ingredient}</li>);
   return(
    <ul className="list-unstyled">
    {ingredientsList}
    </ul>
   );
 } 

IngredientList.propTypes = {
  ingredients: PropTypes.string.isRequired
};

export default IngredientList;
