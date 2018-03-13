import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

/**
 * Displays a single recipe
 * @function MySingleRecipe
 *
 * @param {object} props
 *
 * @returns {jsx} jsx for single recipe
 */
const MySingleRecipe = ({ recipe }) => ((
  <section className="col-sm-3 card-1" style={{ paddingTop: 10 }}>
    <figure className="figure">
      <Link to={`view-recipe/${recipe.id}`}>
        <img
          style={{}}
          src={recipe.recipeImage}
          alt="Search Result"
          className="figure-img img-thumbnail mx-auto"
        />
      </Link>
      <figcaption className="figure-caption" style={{ marginTop: '10px' }}>
        <Link
          style={{ textDecoration: 'none', fontSize: '18px' }}
          to={`view-recipe/${recipe.id}`}
        >{recipe.name}
        </Link>
        <p>
          <i
            className="fa fa-thumbs-up text-info"
            aria-hidden="true"
          />{recipe.upvotes} &nbsp;
          <i
            className="fa fa-thumbs-down text-danger"
            aria-hidden="true"
          />{recipe.downvotes} &nbsp;
          <i
            className="fa fa-heart"
            aria-hidden="true"
            style={{ color: 'orange' }}
          />{recipe.favorites}
        </p>
      </figcaption>
    </figure>
  </section>
));

MySingleRecipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    upvotes: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    recipeImage: PropTypes.string
  }).isRequired
};


export default MySingleRecipe;
