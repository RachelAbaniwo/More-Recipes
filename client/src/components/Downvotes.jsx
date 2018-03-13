import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleVote } from './../store/actions/votes';

/**
 * Downvotes component
 * @function Downvotes
 *
 * @param {object} props
 *
 * @returns {object} jsx for downvotes component in a fragment tag
 */
export const Downvotes = ({ downvotes, toggleVote: toggleVoteFunc, recipeId }) => ((
  <Fragment>
    <i
      className="fa fa-thumbs-down text-danger click-add"
      onClick={() => { toggleVoteFunc(recipeId, 'downvote'); }}
      aria-hidden="true"
    />{downvotes}&nbsp;
  </Fragment>
));
Downvotes.propTypes = {
  downvotes: PropTypes.number.isRequired,
  toggleVote: PropTypes.func.isRequired,
  recipeId: PropTypes.number.isRequired
};

/**
 * Map dispatch to component props
 * @param {function} dispatch
 *
 * @returns {object} object to be passed as props to component
 */
export const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleVote }, dispatch);

const DownvotesConnected = connect(null, mapDispatchToProps)(Downvotes);

export default DownvotesConnected;
