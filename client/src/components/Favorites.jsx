import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleFavorite } from './../store/actions/votes';

/**
 * Add favorites component
 * @function Favorites
 *
 * @param {object} props
 *
 * @returns {object} jsx for component
 */
export const Favorites = ({
  toggleFavorite: toggleFavoritesFunc, recipeId, authUser, hasFavorited
}) => ((
  <Fragment>
    <i
      className={`fa fa-heart click-add ${authUser && hasFavorited ? 'orange' : 'grey'}`}
      onClick={() => { toggleFavoritesFunc(recipeId); }}
      aria-hidden="true"
    />&nbsp;
  </Fragment>
));

Favorites.propTypes = {
  toggleFavorite: PropTypes.func.isRequired,
  recipeId: PropTypes.number.isRequired,
  hasFavorited: PropTypes.bool.isRequired,
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      aboutMe: PropTypes.string.isRequired
    })
  }),
};
Favorites.defaultProps = {
  authUser: null
};

/**
 * Map dispatch to component props
 * @param {function} dispatch
 *
 * @returns {object} object to be passed as props to component
 */
export const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleFavorite }, dispatch);

const FavoritesConnected = connect(null, mapDispatchToProps)(Favorites);

export default FavoritesConnected;
