import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

/**
 * Landing page top buttons component
 * @function LandingTopButtons
 *
 * @param {object} props
 * @returns {object} displays buttons' jsx
 *
 */
export const LandingTopButtons = ({ authUser, signOutUser }) => {
  if (authUser) {
    return (
      <div className="col-md-12 hover-slide float-right">
        <div
          id="landing-div"
        >
          <button
            onClick={signOutUser}
            id="logout-button"
            className="button btn btn-default link-button ml-2 float-right title home-sign-out"
          >LOG OUT
          </button>
          <Link
            to="/dashboard"
            id="logout-button"
            className="button btn btn-default link-button ml-2 float-right title home-profile"
          >MY PROFILE
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="col-md-12 hover-slide float-right">
      <div
        id="landing-div"
      >
        <Link
          to="/signup"
          id="logout-button"
          className="button btn btn-default link-button ml-2 float-right home-sign-up title"
        >REGISTER
        </Link>
        <Link
          to="/signin"
          id="logout-button"
          className="button btn btn-default link-button home-sign-in mr-2 float-right title"
        >LOGIN
        </Link>
      </div>
    </div>
  );
};

/**
 * Landing page create recipe buttons component
 * @function
 *
 * @param {object} authUser
 * @returns {object} jsx
 *
 */
export const CreateRecipeButton = ({ authUser }) => {
  if (authUser) {
    return (
      <div className="justify-content-center">
        <Link
          to="/recipes/create"
          id="create-recipe-button"
          className="button btn btn-default home-create-recipe link-button justify-content-center title mr-2"
        >CREATE A RECIPE
        </Link>

        <Link
          to="/dashboard"
          className="button btn btn-default home-manage-recipes link-button justify-content-center title mr-2"
          id="create-recipe-button"
        >MANAGE RECIPES
        </Link>
      </div>
    );
  }
  return (<div id="return" />);
};

LandingTopButtons.propTypes = {
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      aboutMe: PropTypes.string,
      profilePicture: PropTypes.string,
    }).isRequired
  }),
  signOutUser: PropTypes.func
};

LandingTopButtons.defaultProps = {
  authUser: null,
  signOutUser: null
};

CreateRecipeButton.propTypes = {
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      aboutMe: PropTypes.string,
      profilePicture: PropTypes.string,
    }).isRequired
  })
};

CreateRecipeButton.defaultProps = {
  authUser: null
};
