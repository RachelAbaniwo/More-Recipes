import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleFavorite } from './../store/actions/votes';
/**
 * Add favorites component
 * @param {object} favorites
 *
 * @returns {object} jsx for component
 */
const Favorites = ({ favorites, toggleFavorite: toggleFavoritesFunc, recipeId }) => ((
  <Fragment>
    <i
      className="fa fa-heart"
      style={{ color: 'yellow' }}
      onClick={() => { toggleFavoritesFunc(recipeId); }}
      aria-hidden="true"
    />{favorites}&nbsp;
  </Fragment>
));
Favorites.propTypes = {
  favorites: PropTypes.number.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  recipeId: PropTypes.number.isRequired
};
/**
 * Map dispatch to component props
 * @param {function} dispatch
 *
 * @returns {object} object to be passed as props to component
 */
const mapDispatchToProps = dispatch => bindActionCreators({ toggleFavorite }, dispatch);

const FavoritesConnected = connect(null, mapDispatchToProps)(Favorites);

export default FavoritesConnected;
