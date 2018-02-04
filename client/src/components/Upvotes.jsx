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
const Upvotes = ({ upvotes, toggleVote: toggleVoteFunc, recipeId }) => ((
  <Fragment>
    <i
      className="fa fa-thumbs-up text-info"
      onClick={() => { toggleVoteFunc(recipeId, 'upvote'); }}
      aria-hidden="true"
    />{upvotes}&nbsp;
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
const mapDispatchToProps = dispatch => bindActionCreators({ toggleVote }, dispatch);

const UpvotesConnected = connect(null, mapDispatchToProps)(Upvotes);

export default UpvotesConnected;
