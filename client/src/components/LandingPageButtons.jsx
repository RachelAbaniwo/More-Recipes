import React from 'react';
import { Link } from 'react-router';

/**
 * Landing page top buttons component
 * @function
 *
 * @param {object} authUser
 * @returns {object} jsx
 *
 */
export const LandingTopButtons = ({ authUser, signOutUser }) => {
  if (authUser === null || authUser === undefined) {
    return (
      <div className="col-md-12 hover-slide float-right">
        <div
          style={{ paddingBottom: 20 }}
        >
          <Link
            to="/signup"
            className="button btn btn-default link-button ml-2 float-right title"
            style={{
              width: 150, marginTop: 10, fontFamily: 'Advent Pro'
            }}
          >REGISTER
          </Link>
          <Link
            to="/signin"
            className="button btn btn-default link-button mr-2 float-right title"
            style={{
              width: 150, marginTop: 10, fontFamily: 'Advent Pro'
            }}
          >LOGIN
          </Link>
        </div>
      </div>
    );
  }
  if (authUser !== null && authUser !== undefined) {
    return (
      <div className="col-md-12 hover-slide float-right">
        <div
          style={{ paddingBottom: 20 }}
        >
          <button
            onClick={signOutUser}
            className="button btn btn-default link-button ml-2 float-right title"
            style={{
              width: 150, marginTop: 10, fontFamily: 'Advent Pro'
            }}
          >LOG OUT
          </button>
          <Link
            to="/dashboard"
            className="button btn btn-default link-button ml-2 float-right title"
            style={{
              width: 150, marginTop: 10, fontFamily: 'Advent Pro'
            }}
          >MY PROFILE
          </Link>
        </div>
      </div>
    );
  }
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
  if (authUser === null || authUser === undefined) {
    return (<div style={{ marginTop: 50 }} />);
  }
  if (authUser !== null && authUser !== undefined) {
    return (
      <div className="justify-content-center">
        <Link
          to="/recipes/create"
          className="button btn btn-default link-button justify-content-center title mr-2"
          style={{
        width: 180, fontFamily: 'Advent Pro', fontSize: '20px', marginTop: 10
      }}
        >CREATE A RECIPE
        </Link>

        <Link
          to="/dashboard"
          className="button btn btn-default link-button justify-content-center title mr-2"
          style={{
        width: 180, fontFamily: 'Advent Pro', fontSize: '20px', marginTop: 10
      }}
        >MANAGE RECIPES
        </Link>
      </div>
    );
  }
};

