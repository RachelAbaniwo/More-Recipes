import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

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
      key={review.id}
      style={{
        fontSize: '18px',
        borderBottom: '1px solid lightgrey',
        marginBottom: 20
      }}
    >
      <p className="review">{review.review}</p>
      <p>
        <i className="fa fa-user-circle-o" aria-hidden="true" />
        &nbsp;<span className="title">{review.User.username}</span>
        <small className="text-sm d-block">{format(review.createdAt, 'hh:mm A, do MMMM, YYYY')}</small>
      </p>
    </div>));
  return (
    <article className="review" style={{ paddingBottom: 30 }}>
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

