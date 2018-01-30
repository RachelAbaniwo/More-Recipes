import PropTypes from 'prop-types';
import React from 'react';
/**
 * Displays list of reviews
 *
 * @param {oject} props
 *
 * @returns {object} jsx for recipe
 */
const ReviewList = (props) => {
  const ReviewsArray = props.reviews;
  const ReviewsList = ReviewsArray.map((review, index) => (
    <div
      key={index}
      style={{ fontSize: '18px', borderBottom: '1px solid lightgrey', marginBottom: 20 }}
    >
      <p >{review.review}</p>
      <p>
        <i className="fa fa-user-circle-o" aria-hidden="true" />
        &nbsp;{review.User.username}
      </p>
    </div>));
  return (
    <article style={{ paddingBottom: 30 }}>
      {ReviewsList}
    </article>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    review: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired
  }))
};
ReviewList.defaultProps = {
  reviews: []
};

export default ReviewList;
