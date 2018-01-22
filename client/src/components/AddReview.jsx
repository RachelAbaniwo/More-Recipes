import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createReview } from '../store/actions';
 
/**
 * Add a review component
 * @returns {obj} jsx object
 */
class AddReview extends React.Component {
  /**
   * Render the component jsx
   * @returns {obj} jsx
   */
  constructor(props) {
    super(props);
    this.state = {
      review: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.createReview = this.createReview.bind(this);
  }
  createReview() {
    this.props.createReview(this.state.review, this.props.recipeId);
    this.setState({
      review: ''
    });
  }

  handleChange(event) {
    this.setState({
      review: event.target.value
    });
  }

  render() {
    return (
      <div className="form-group">
        <textarea cols="120" onChange={this.handleChange} className="form-control mb-3" value={this.state.review} placeholder="Add review ..."></textarea>
        <button className="btn btn-default" disabled={this.state.review.length < 8} onClick={this.createReview}>Add Review</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ createReview }, dispatch);
const AddReviewContainer = connect(null, mapDispatchToProps)(AddReview);

export default AddReviewContainer;
