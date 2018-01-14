import PropTypes from 'prop-types'
import React from 'react';

const IngredientList =  ({ ingredients }) => {
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
  