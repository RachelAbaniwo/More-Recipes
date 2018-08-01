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
          style={{ paddingBottom: 20 }}
        >
          <button
            onClick={signOutUser}
            className="button btn btn-default link-button ml-2 float-right title home-sign-out"
            style={{
              width: 150, marginTop: 10, fontFamily: 'Advent Pro'
            }}
          >LOG OUT
          </button>
          <Link
            to="/dashboard"
            className="button btn btn-default link-button ml-2 float-right title home-profile"
            style={{
              width: 150, marginTop: 10, fontFamily: 'Advent Pro'
            }}
          >MY PROFILE
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="col-md-12 hover-slide float-right">
      <div
        style={{ paddingBottom: 20 }}
      >
        <Link
          to="/signup"
          className="button btn btn-default link-button ml-2 float-right home-sign-up title"
          style={{
            width: 150, marginTop: 10, fontFamily: 'Advent Pro'
          }}
        >REGISTER
        </Link>
        <Link
          to="/signin"
          className="button btn btn-default link-button home-sign-in mr-2 float-right title"
          style={{
            width: 150, marginTop: 10, fontFamily: 'Advent Pro'
          }}
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
          className="button btn btn-default home-create-recipe link-button justify-content-center title mr-2"
          style={{
        width: 180, fontFamily: 'Advent Pro', fontSize: '20px', marginTop: 10
      }}
        >CREATE A RECIPE
        </Link>

        <Link
          to="/dashboard"
          className="button btn btn-default home-manage-recipes link-button justify-content-center title mr-2"
          style={{
        width: 180, fontFamily: 'Advent Pro', fontSize: '20px', marginTop: 10
      }}
        >MANAGE RECIPES
        </Link>
      </div>
    );
  }
  return (<div style={{ marginTop: 50 }} />);
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
