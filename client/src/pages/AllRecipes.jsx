import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { signOutUser } from '../store/actions/user';
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
        <Navbar
          authUser={this.props.authUser}
          signOutUser={this.props.signOutUser}
          router={this.props.router}
        />
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
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      aboutMe: PropTypes.string.isRequired
    })
  }),
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  searchQuery: PropTypes.string.isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
  getAllRecipes: PropTypes.func.isRequired,
  signOutUser: PropTypes.func.isRequired
};

AllRecipeScreen.defaultProps = {
  recipes: [],
  authUser: null
};

/**
 * Map state to props
 * @param {object} state
 *
 * @returns {object} object of recipes passed as props
 */
const mapStateToProps = state =>
  ({
    authUser: state.authUser,
    recipes: state.recipes.rows,
    searchQuery: state.search.query
  });

/**
 * Map dispatch to props
 * @param {func} dispatch
 *
 * @returns {object} object to be passed as props to component
 */
const mapDispatchToProps = dispatch =>
  bindActionCreators({ signOutUser, getAllRecipes, updateSearchQuery }, dispatch);

const AllRecipeScreenContainer = connect(mapStateToProps, mapDispatchToProps)(AllRecipeScreen);

export default AllRecipeScreenContainer;
