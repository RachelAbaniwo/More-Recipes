import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import image0 from '../../assets/image/profile-pic.jpeg';

/**
 * Displays user profile
 *
 * @function MyProfile
 *
 * @returns {jsx} jsx for user profile
 */
const MyProfile = ({ authUser }) => ((
  <div>
    {
      authUser &&
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
            className="text-center display-name"
          >
            <strong >
              DISPLAY NAME
            </strong>
            <br />
            {authUser.user.username}
          </p>
          <p
            className="text-center email"
          >
            <strong>
              EMAIL
            </strong>
            <br />
            {authUser.user.email}
          </p>
          {authUser.user.aboutMe ?
            (
              <p className="text-center about-me"><strong>ABOUT ME</strong><br />
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
    }
  </div>
));

MyProfile.propTypes = {
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      aboutMe: PropTypes.string
    }).isRequired
  })
};
MyProfile.defaultProps = {
  authUser: null
};

export default MyProfile;
