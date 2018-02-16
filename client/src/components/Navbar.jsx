import React from 'react';
import { Link } from 'react-router';
import Search from './Search';
/**
 * Displays navbar component
 * @param {null} null
 *
 * @returns {object} jsx for navbar
 *
 */
const Navbar = ({ authUser, signOutUser, router }) => {
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
    return (
      <section id="nav">
        <nav className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom">
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item text-center">
                <a
                  className="navbar-register"
                  style={{ marginRight: 20 }}
                  href="#popular"
                >POPULAR RECIPES
                </a>
              </li>
              <li className="nav-item">
                <Link
                  to="/signin"
                  className="navbar-register"
                  style={{ marginRight: 20 }}
                  href="#popular"
                >SIGN IN
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/signup"
                  className="navbar-register"
                  style={{ marginRight: 20 }}
                  href="#popular"
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

export default Navbar;
