import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createReview } from '../store/actions/recipes';


/**
 * @class AddReview
 * @extends {React.Component}
 * @description renders the add-review component
 *
 * @returns {textarea} review textarea field and button
 */
export class AddReview extends React.Component {
  /**
   * Adds review
   * @constructor
   *
   * @param {object} props
   *
   * @returns {void} void
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
   * Creates review and sets state with empty review textarea field
   * @method createReview
   *
   * @param {null} null
   *
   * @returns {void} void
   */
  createReview() {
    this.props.createReview(this.state.review, this.props.recipeId);
    this.setState({
      review: ''
    });
  }
  /**
   * Handles change in review field, listens for change event in the review
   * textarea
   * @method handleChange
   *
   * @param {object} event
   *
   * @returns {void} void
   */
  handleChange(event) {
    this.setState({
      review: event.target.value
    });
  }
  /**
   * Renders add review jsx
   * @memberof AddReview
   *
   * @returns {jsx} jsx
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
          className="review btn btn-default title"
          disabled={this.state.review.length < 8}
          onClick={this.createReview}
        >ADD REVIEW
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
 * @function  mapDispatchToProps
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
 */
export const mapDispatchToProps = dispatch => bindActionCreators({ createReview }, dispatch);
export default connect(null, mapDispatchToProps)(AddReview);

