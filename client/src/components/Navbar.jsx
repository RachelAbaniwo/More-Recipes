import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateSortQuery } from './../store/actions/recipes';
import Search from './Search';

/**
 * Displays navbar component
 * @param {object} props
 *
 * @returns {object} jsx for navbar
 *
 */
export const Navbar = ({
  authUser, signOutUser, router
}) => ((
  <section id="nav">
    <nav
      className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom"
    >
      <Link to="/home" className="moreRecipes">More Recipes</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          {
            authUser &&
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                style={{ marginRight: 10 }}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Hi {authUser.user.username}
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link
                  to="/recipes/create"
                  id="dropdown"
                  className="dropdown-item"
                >CREATE RECIPE
                </Link>
                <Link
                  to="/dashboard"
                  id="dropdown"
                  className="dropdown-item"
                >PROFILE
                </Link>
                <button
                  onClick={async () => {
                    await signOutUser();
                    router.push('/');
                  }}
                  className="dropdown-item"
                  id="dropdown"
                >LOG OUT
                </button>
              </div>
            </li>
          }
          {
            !authUser && router.location.pathname !== '/signin' &&
            <li className="nav-item">
              <Link
                to="/signin"
                id="sign-in"
                className="navbar-register"
              >SIGN IN
              </Link>
            </li>
          }
          {
            !authUser && router.location.pathname !== '/signup' &&
            <li className="nav-item">
              <Link
                to="/signup"
                id="sign-in"
                className="navbar-register"
              >REGISTER
              </Link>
            </li>
          }

        </ul>
        {
          (router.location.pathname === '/signin' || router.location.pathname === '/signup') &&
          <Search router={router} />
        }
      </div>
    </nav>
  </section>
));

Navbar.propTypes = {
  signOutUser: PropTypes.func.isRequired,
  router: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    })
  }).isRequired,
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      aboutMe: PropTypes.string
    }).isRequired
  })
};

Navbar.defaultProps = {
  authUser: null
};


/**
 * Map dispatch to props
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
*/
export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { updateSortQuery },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Navbar);
