import React from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateSortQuery } from './../store/actions/recipes';
import Search from './Search';

/**
 * Displays navbar component
 * @param {object} props
 *
 * @returns {object} jsx for navbar
 *
 */
const Navbar = ({
  authUser, signOutUser, router, updateSortQuery: sort
}) => {
  if (authUser !== null && authUser !== undefined) {
    return (
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
              <Search
                router={router}
              />
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
                    className="dropdown-item"
                    style={{ fontSize: 15 }}
                  >CREATE RECIPE
                  </Link>
                  <Link
                    to="/dashboard"
                    className="dropdown-item"
                    style={{ fontSize: 15 }}
                  >PROFILE
                  </Link>
                  <button
                    onClick={async () => {
                      await signOutUser();
                      router.push('/');
                    }}
                    className="dropdown-item"
                    style={{ fontSize: 15 }}
                  >LOG OUT
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    );
  }
  if (authUser === null || authUser === undefined) {
    if ((router.location.pathname !== '/signin') &&
    (router.location.pathname !== '/signup') &&
    (router.location.pathname !== '/recipes')
    ) {
      return (
        <section id="nav">
          <nav
            className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom"
          >
            <a className="moreRecipes" href="/">More Recipes</a>
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
                <li className="nav-item text-center">
                  <Link
                    onClick={async () => {
                    await sort('favorites');
                    router.push('/recipes');
                    }}
                    href="#recipes"
                    className="navbar-register"
                    style={{ marginRight: 20 }}
                  >POPULAR RECIPES
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signin"
                    className="navbar-register"
                    style={{ marginRight: 20 }}
                  >SIGN IN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="navbar-register"
                    style={{ marginRight: 20 }}
                  >REGISTER
                  </Link>
                </li>
              </ul>
              <Search
                router={router}
              />
            </div>
          </nav>
        </section>
      );
    }
    if (router.location.pathname === '/signin') {
      return (
        <section id="nav">
          <nav
            className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom"
          >
            <a className="moreRecipes" href="/">More Recipes</a>
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
                <li className="nav-item text-center">
                  <Link
                    onClick={async () => {
                    await sort('favorites');
                    router.push('/recipes');
                    }}
                    href="#recipes"
                    className="navbar-register"
                    style={{ marginRight: 20 }}
                  >POPULAR RECIPES
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="navbar-register"
                    style={{ marginRight: 20 }}
                  >REGISTER
                  </Link>
                </li>
              </ul>
              <Search
                router={router}
              />
            </div>
          </nav>
        </section>
      );
    }
    if (router.location.pathname === '/signup') {
      return (
        <section id="nav">
          <nav
            className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom"
          >
            <a className="moreRecipes" href="/">More Recipes</a>
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
                <li className="nav-item text-center">
                  <Link
                    onClick={async () => {
                    await sort('favorites');
                    router.push('/recipes');
                    }}
                    href="#recipes"
                    className="navbar-register"
                    style={{ marginRight: 20 }}
                  >POPULAR RECIPES
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signin"
                    className="navbar-register"
                    style={{ marginRight: 20 }}
                  >SIGN IN
                  </Link>
                </li>
              </ul>
              <Search
                router={router}
              />
            </div>
          </nav>
        </section>
      );
    }
  }
  if (router.location.pathname === '/recipes') {
    return (
      <section id="nav">
        <nav
          className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom"
        >
          <a className="moreRecipes" href="/">More Recipes</a>
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
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="navbar-register"
                  style={{ marginRight: 20 }}
                >SIGN IN
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signup"
                  className="navbar-register"
                  style={{ marginRight: 20 }}
                >REGISTER
                </Link>
              </li>
            </ul>
            <Search
              router={router}
            />
          </div>
        </nav>
      </section>
    );
  }
};

/**
 * Map dispatch to props
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
*/
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { updateSortQuery },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Navbar);
