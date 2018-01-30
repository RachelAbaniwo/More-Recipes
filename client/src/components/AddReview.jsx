import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createReview } from '../store/actions/recipes';


/**
 * Add a review component
 * @class
 *
 * @returns {object} jsx object
 */
class AddReview extends React.Component {
  /**
   * Adds review
   * @constructor
   *
   * @param {object} props
   *
   * @returns {object} jsx
   */
  constructor(props) {
    super(props);
    this.state = {
      review: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.createReview = this.createReview.bind(this);
  }
  /**
   * Creates review
   * @function
   *
   * @param {null} null
   *
   * @returns {function} with review and recipe Id as parameters
   * @returns {object} sets state with empty review field
   */
  createReview() {
    this.props.createReview(this.state.review, this.props.recipeId);
    this.setState({
      review: ''
    });
  }
  /**
   * Handles change in review field
   * @function
   *
   * @param {object} event
   *
   * @returns {object} state with review being the review after field change
   */
  handleChange(event) {
    this.setState({
      review: event.target.value
    });
  }
  /**
   * Adds a review
   *
   * @returns {jsx} jsx which adds a new review
   */
  render() {
    return (
      <div className="form-group">
        <textarea
          cols="120"
          onChange={this.handleChange}
          className="form-control mb-3"
          value={this.state.review}
          placeholder="Add review ..."
        />
        <button
          className="btn btn-default"
          disabled={this.state.review.length < 8}
          onClick={this.createReview}
        >Add Review
        </button>
      </div>
    );
  }
}
AddReview.propTypes = {
  recipeId: PropTypes.number.isRequired,
  createReview: PropTypes.func.isRequired
};
/**
 * Map dispatch to props
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
 */
const mapDispatchToProps = dispatch => bindActionCreators({ createReview }, dispatch);
const AddReviewContainer = connect(null, mapDispatchToProps)(AddReview);

export default AddReviewContainer;
