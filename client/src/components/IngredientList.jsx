import PropTypes from 'prop-types';
import React from 'react';

/**
 * Display list of ingredients component
 * @function IngredientList
 *
 * @param {object} props
 *
 * @returns {jsx} list of ingredients
 */
const IngredientList = ({ ingredients }) => {
  ingredients = ingredients.trim();
  if (ingredients[ingredients.length - 1] === ',') {
    ingredients = ingredients.substr(0, ingredients.length - 1);
  }
  const ingredientsArray = ingredients.split(',');
  const ingredientsList = ingredientsArray.map(ingredient => (
    <li
      id="ingredient-style"
      key={ingredient}
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
