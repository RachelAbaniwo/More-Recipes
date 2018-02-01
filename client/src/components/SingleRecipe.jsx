import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

/**
 * Display a single recipe
 * @returns {object} jsx for recipe
 */
const SingleRecipe = ({ recipe }) => ((
  <section className="col-sm-12 col-md-6 card-1"style={{ paddingTop: '10px' }}>
    <figure className="figure">
      <Link to={`view-recipe/${recipe.id}`}>
        <img
          style={{}}
          src={recipe.recipeImage}
          alt="Search Result"
          className="figure-img img-thumbnail mx-auto"
        />
      </Link>
      <figcaption className="figure-caption">
        <Link
          style={{ textDecoration: 'none', fontSize: '18px' }}
          to={`view-recipe/${recipe.id}`}
        >{recipe.name}
        </Link>
        <p style={{ fontSize: '18px' }}>
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
            style={{ color: 'yellow' }}
          />{recipe.favorites}
          <br />
          <i
            className="fa fa-user-circle-o"
            aria-hidden="true"
          /> &nbsp;{recipe.User.username}
        </p>
      </figcaption>
    </figure>
  </section>
));

SingleRecipe.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    upvotes: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    recipeImage: PropTypes.string
  }).isRequired
};


export default SingleRecipe;
