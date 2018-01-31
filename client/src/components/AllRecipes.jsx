import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Footer from './Footer';
import { getAllRecipes } from '../store/actions/recipes';

import SingleRecipe from './SingleRecipe';

/**
 * Displays all recipes
 * @class
 *
 * @returns {object} jsx object
 */
class AllRecipeScreen extends React.Component {
  /**
   * Execute before component mounts
   * @returns {null} null
   */
  componentWillMount() {
    this.props.getAllRecipes();
  }
  /**
   * Display recipes
   *
   * @returns {jsx} jsx
   */
  render() {
    const { recipes } = this.props;
    return (
      <div>
        <section id="nav">
          <nav
            className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom"
          >
            <Link
              to="/home"
              className="moreRecipes"
            > MORE RECIPES
            </Link>
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
                    to="/signup"
                    className="navbar-register"
                    style={{ marginRight: 20 }}
                  >REGISTER
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
              <form className="form-inline my-2 my-lg-0">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Find a Recipe"
                  aria-label="Search"
                />
              </form>
            </div>
          </nav>
        </section>
        <section
          className="container text-center mx auto view-recipe-container"
          style={{
            border: '1px solid lightgrey',
            padding: 30,
            marginTop: 90,
            marginBottom: 50
          }}
        >
          <div className="row">
            <section className="col-sm-12">
              <h1>
                All Recipes
              </h1>
            </section>
            <div className="row">
              <form className="form-inline col-lg-12 justify-content-center">
                <input
                  className="form-control ml-sm-4 mr-sm-4"
                  style={{ width: 250, fontFamily: '"kaushan script"' }}
                  type="search"
                  placeholder="Search Recipes"
                  aria-label="Search"
                />
                <select
                  className="custom-select mb-2 ml-sm-4 mr-sm-4 mb-sm-0"
                  style={{ width: 250, fontFamily: '"kaushan script"' }}
                  id="inlineFormCustomSelect"
                >
                  <option selected>Sort By...</option>
                  <option value={1}>Most Upvotes</option>
                  <option value={2}>Most Favorited</option>
                </select>
                <select className="custom-select mb-2 ml-sm-4 mr-sm-4 mb-sm-0" style={{ width: 250, fontFamily: '"kaushan script"' }} id="inlineFormCustomSelect">
                  <option selected>Recipes per page</option>
                  <option value={1}>3</option>
                  <option value={2}>6</option>
                  <option value={3}>9</option>
                </select>
                <button
                  style={{ width: 150 }}
                  type="submit"
                  className="btn btn-default"
                >Search
                </button>
              </form>
            </div>


            <div className="row" style={{ padding: '10px' }}>
              {recipes.map(recipe => <SingleRecipe key={recipe.id} recipe={recipe} />)}
            </div>
          </div>
        </section>
        <Footer />

      </div>
    );
  }
}

AllRecipeScreen.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    favorites: PropTypes.number.isRequired,
    upvotes: PropTypes.number.isRequired,
    downvotes: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })),
  getAllRecipes: PropTypes.func.isRequired
};

AllRecipeScreen.defaultProps = {
  recipes: []
};

/**
 * Map state to props
 * @param {object} state
 *
 * @returns {object} object of recipes passed as props
 */
const mapStateToProps = state => ({ recipes: state.recipes.rows });

/**
 * Map dispatch to props
 * @param {func} dispatch
 *
 * @returns {object} object to be passed as props to component
 */
const mapDispatchToProps = dispatch => bindActionCreators({ getAllRecipes }, dispatch);

const AllRecipeScreenContainer = connect(mapStateToProps, mapDispatchToProps)(AllRecipeScreen);

export default AllRecipeScreenContainer;
