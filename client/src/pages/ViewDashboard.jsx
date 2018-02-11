import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMyRecipes, getMyFavorites } from '../store/actions/userProfile';
import MySingleRecipe from '../components/MySingleRecipe';
import Footer from '../components/Footer';
import MyProfile from '../components/MyProfile';


/**
 * Displays user dashboard component
 * @class
 *
 * @returns {object} jsx object
 */
class ViewDashboard extends React.Component {
  /**
   * Execute when component will mount
   * @return {object} object
   */
  componentWillMount() {
    this.props.getMyRecipes();
    this.props.getMyFavorites();
  }
  /**
   * Renders dashboard
   *
   * @returns {jsx} jsx
   */
  render() {
    const { myRecipes, favoriteRecipes } = this.props;
    return (
      <div>
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
                <form className="form-inline my-2 my-lg-0">
                  <input
                    className="form-control mr-sm-2"
                    type="search"
                    placeholder="Find a Recipe"
                    aria-label="Search"
                  />
                </form>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    style={{ marginRight: 50 }}
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Hi Rachel!
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <a
                      className="dropdown-item"
                      href="topFavorites.html"
                      style={{ fontSize: 15 }}
                    >PROFILE
                    </a>
                    <a
                      className="dropdown-item"
                      href="topFavorites.html"
                      style={{ fontSize: 15 }}
                    >LOG OUT
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </section>
        <section
          className="text-center mx auto view-profile-container"
          style={{ marginTop: 30, marginBottom: 30, padding: 50 }}
        >
          <div className="row">
            <div className="col-sm-12">
              <h1
                className="title"
                style={{ textAlign: 'center', marginBottom: 80 }}
              >DASHBOARD
              </h1>
            </div>
          </div>
          <div className="row">
            <section className="col-sm-12 col-md-6 col-lg-4">
              <div className="row">
                <div className="col-sm-12">
                  <h4
                    className="title"
                    style={{
                      textAlign: 'center',
                      paddingRight: 20,
                      marginBottom: 25
                      }}
                  >My Profile
                  </h4>
                </div>
              </div>
              <MyProfile authUser={this.props.authUser} />
            </section>
            <section className="col-sm-12 col-md-12 col-lg-8">
              <div className="row">
                <div className="col-sm-12">
                  <ul className="nav nav-tabs">
                    <li
                      className="nav-item"
                    >
                      <a
                        href="#my-recipes"
                        className="nav-link active"
                        data-toggle="tab"
                      >
                        <h4 className="title" style={{ textAlign: 'right' }}>
                    My Recipes
                        </h4>
                      </a>
                    </li>
                    <li
                      className="nav-item"
                    >
                      <a
                        href="#my-favorites"
                        className="nav-link"
                        data-toggle="tab"
                      >
                        <h4 className="title" style={{ textAlign: 'right' }}>
                        My Favorites
                        </h4>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="tab-content">
                <div id="my-recipes" className="tab-pane fade show active">
                  <div className="row" style={{ marginRight: 10 }}>
                    {
                      myRecipes.map(myRecipe =>
                        <MySingleRecipe key={myRecipe.id} recipe={myRecipe} />)}
                  </div>
                </div>
                <div id="my-favorites" className="tab-pane fade in">
                  <div className="row" style={{ marginRight: 10 }}>
                    {
                      favoriteRecipes.map(favoriteRecipe =>
                        (<MySingleRecipe
                          key={favoriteRecipe.id}
                          recipe={favoriteRecipe}
                        />))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

ViewDashboard.propTypes = {
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      aboutMe: PropTypes.string,
      profilePicture: PropTypes.string,
    })
  }).isRequired,
  myRecipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    recipeImage: PropTypes.string.isRequired
  })),
  favoriteRecipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    recipeImage: PropTypes.string.isRequired
  })),
  getMyFavorites: PropTypes.func.isRequired,
  getMyRecipes: PropTypes.func.isRequired
};

ViewDashboard.defaultProps = {
  myRecipes: {},
  favoriteRecipes: {}
};

/**
 * Map state to props
 * @param {object} state
 * @param {object} ownProps
 *
 * @returns {object} object of recipes passed as props
 */
const mapStateToProps = state => ({
  authUser: state.authUser,
  myRecipes: state.userProfile.myRecipes.rows,
  favoriteRecipes: state.userProfile.favoriteRecipes.rows
});

/**
 * Map dispatch to props
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
*/
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getMyRecipes,
    getMyFavorites
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(ViewDashboard);
