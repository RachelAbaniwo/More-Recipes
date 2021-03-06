import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleVote } from './../store/actions/votes';

/**
 * Displays upvotes
 * @param {object} upvotes
 * @returns {object} jsx for component
 */
export const Upvotes = ({ upvotes, toggleVote: toggleVoteFunc, recipeId }) => ((
  <Fragment>
    <i
      className="fa fa-thumbs-up text-info click-add upvote"
      id="upvote-button"
      onClick={() => { toggleVoteFunc(recipeId, 'upvote'); }}
      aria-hidden="true"
    /><span className="upvote">{upvotes}</span>&nbsp;
  </Fragment>
));
Upvotes.propTypes = {
  upvotes: PropTypes.number.isRequired,
  toggleVote: PropTypes.func.isRequired,
  recipeId: PropTypes.number.isRequired
};

/**
 * Map dispatch to component props
 *
 * @param {function} dispatch
 * @returns {object} object
 */
export const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleVote }, dispatch);

const UpvotesConnected = connect(null, mapDispatchToProps)(Upvotes);

export default UpvotesConnected;
