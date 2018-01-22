import PropTypes from 'prop-types';
import React from 'react';

const ReviewList =  (props) => {
   
  let ReviewArray = props.reviews;
  let ReviewList = ReviewArray.map((review, index) => <div style={{fontSize: '18px'}}  key={index} 
    style={{borderBottom: '1px solid lightgrey', marginBottom: 20}} >
    <p >{review.review}</p><p><i className="fa fa-user-circle-o" aria-hidden="true" />
    &nbsp; {review.User.Username}</p></div>);
   return(
    <article style={{paddingBottom: 30}}>
      {ReviewList}
    </article>
   );
 } 

ReviewList.propTypes = {
  reviews: PropTypes.array.isRequired
};

 export default ReviewList;