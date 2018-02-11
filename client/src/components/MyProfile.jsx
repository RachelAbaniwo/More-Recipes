import React from 'react';
import { Link } from 'react-router';
import image0 from '../../assets/image/profile-pic.jpeg';

/**
 * Display user profile
 *
 * @function
 *
 * @returns {object} jsx for recipe
 */
const MyProfile = ({ authUser }) => {
  if (authUser !== null && authUser !== undefined) {
    return (
      <figure
        className="figure profile-card"
        style={{
          border: '1px solid lightgrey',
          padding: 10
        }}
      >
        <img
          max-width="600px"
          max-height="500px"
          src={authUser.user.profilePicture ?
            authUser.user.profilePicture : image0}
          alt=""
          className="figure-img img-thumbnail mx-auto"
        />
        <figcaption className="figure-caption" style={{ textAlign: 'left' }}>
          <p
            className="text-center"
          >
            <strong>
            DISPLAY NAME
            </strong>
            <br />
            {authUser.user.username}
          </p>
          <p
            className="text-center"
          >
            <strong>
            EMAIL
            </strong>
            <br />
            {authUser.user.email}
          </p>
          {authUser.user.aboutMe ?
            (
              <p className="text-center"><strong>ABOUT ME</strong><br />
                {authUser.user.aboutMe}
              </p>) : (<div />)}
          <Link
            to="/update-profile"
            className="button link-button btn btn-default"
            href="edit-profile.html"
            role="button"
          >
          EDIT PROFILE
          </Link>
        </figcaption>
      </figure>
    );
  }
};

export default MyProfile;
