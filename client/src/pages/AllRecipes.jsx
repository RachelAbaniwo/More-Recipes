import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Footer from '../components/Footer';
import { getAllRecipes, updateSearchQuery } from '../store/actions/recipes';
import SingleRecipe from '../components/SingleRecipe';

/**
 * Displays all recipes
 * @class
 *
 * @returns {object} jsx object
 */
class AllRecipeScreen extends React.Component {
  /**
   * Initialize component
   * @param {obj} props
   */
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      sort: '',
      order: 'DESC',
      limit: 6
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Execute before component mounts
   * @returns {null} null
   */
  componentWillMount() {
    this.props.getAllRecipes(this.state);
  }

  /**
   *Handle input change
   * @param {object} event
   * @returns {null} null
   */
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   *Handle input change
   * @param {object} event
   * @returns {null} null
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.getAllRecipes(this.state);
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
            > More Recipes
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
            <section className="col-sm-12" style={{ marginTop: 30 }}>
              <h1 className="title">
                RECIPES
              </h1>
            </section>
            <div className="row">
              <form
                className="form-inline col-lg-12 justify-content-center"
                style={{ marginBottom: 30, marginTop: 50 }}
                onSubmit={this.handleSubmit}
              >
                <input
                  className="form-control ml-sm-4 mr-sm-4"
                  style={{ width: 250, fontFamily: '"Advent Pro"' }}
                  type="search"
                  name="search"
                  placeholder="Search Recipes"
                  aria-label="Search"
                  value={this.props.searchQuery}
                  onChange={(event) => { this.props.updateSearchQuery(event.target.value); }}
                />
                <select
                  className="custom-select mb-2  mr-sm-4 mb-sm-0"
                  style={{ width: 250, fontFamily: '"Advent Pro"' }}
                  id="inlineFormCustomSelect"
                  name="sort"
                  value={this.state.sort}
                  onChange={this.handleChange}
                >
                  <option>Sort By...</option>
                  <option value="upvotes">Most Upvotes</option>
                  <option value="favorites">Most Favorited</option>
                </select>
                <select
                  className="custom-select mb-2  mr-sm-4 mb-sm-0"
                  style={{ width: 250, fontFamily: '"Advent Pro"' }}
                  id="inlineFormCustomSelect"
                  value={this.state.limit}
                  name="limit"
                  onChange={this.handleChange}
                >
                  <option>Recipes per page</option>
                  <option value={3}>3</option>
                  <option value={6}>6</option>
                  <option value={9}>9</option>
                </select>
                <button
                  style={{ width: 150, fontWeight: 'bold' }}
                  type="submit"
                  className="btn btn-default ml-sm-4"
                >SEARCH
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
  searchQuery: PropTypes.string.isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
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
const mapStateToProps = state =>
  ({ recipes: state.recipes.rows, searchQuery: state.search.query });

/**
 * Map dispatch to props
 * @param {func} dispatch
 *
 * @returns {object} object to be passed as props to component
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllRecipes, updateSearchQuery }, dispatch);

const AllRecipeScreenContainer = connect(mapStateToProps, mapDispatchToProps)(AllRecipeScreen);

export default AllRecipeScreenContainer;
