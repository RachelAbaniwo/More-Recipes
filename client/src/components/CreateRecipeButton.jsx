import React from 'react';
import { Link } from 'react-router';

/**
 * Landing page create recipe buttons component
 * @function
 *
 * @param {object} authUser
 * @returns {object} jsx
 *
 */
const CreateRecipeButton = ({ authUser }) => {
  if (authUser === null || authUser === undefined) {
    return (<div style={{ marginTop: 50 }} />);
  }
  if (authUser !== null && authUser !== undefined) {
    return (
      <div className="justify-content-center" style={{ marginTop: 30 }} >
        <Link
          to="/recipes/create"
          className="button btn btn-default link-button justify-content-center title"
          style={{
        width: 180, fontFamily: 'Advent Pro', fontSize: '20px'
      }}
        >CREATE A RECIPE
        </Link>
      </div>
    );
  }
};

export default CreateRecipeButton;
