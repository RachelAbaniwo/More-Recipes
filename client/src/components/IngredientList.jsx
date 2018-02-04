import PropTypes from 'prop-types';
import React from 'react';

/**
 * Display list of ingredients component
 * @function
 *
 * @param {string} ingredients
 *
 * @returns {object} jsx for component
 */
const IngredientList = ({ ingredients }) => {
  ingredients = ingredients.trim();
  if (ingredients[ingredients.length - 1] === ',') {
    ingredients = ingredients.substr(0, ingredients.length - 1);
  }
  const ingredientsArray = ingredients.split(',');
  const ingredientsList = ingredientsArray.map((ingredient, index) => (
    <li
      style={{ fontSize: '18px' }}
      key={index}
    >
      {ingredient}
    </li>));
  return (
    <ul className="list-unstyled">
      {ingredientsList}
    </ul>
  );
};

IngredientList.propTypes = {
  ingredients: PropTypes.string.isRequired
};

export default IngredientList;
