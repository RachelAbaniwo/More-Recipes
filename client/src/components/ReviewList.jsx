import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays list of reviews
 *
 * @param {oject} props
 *
 * @returns {object} jsx for recipe
 */
const ReviewList = (props) => {
  const ReviewsArray = props.reviews;
  const ReviewsList = ReviewsArray.map(review => (
    <div
      key={review}
      style={{
        fontSize: '18px',
        borderBottom: '1px solid lightgrey',
        marginBottom: 20
      }}
    >
      <p >{review.review}</p>
      <p>
        <i className="fa fa-user-circle-o" aria-hidden="true" />
        &nbsp;<span className="title">{review.User.username}</span>
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

