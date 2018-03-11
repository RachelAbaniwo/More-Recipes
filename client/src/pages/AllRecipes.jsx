import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { signOutUser } from '../store/actions/user';
import { getAllRecipes, updateSearchQuery, updateSortQuery } from '../store/actions/recipes';
import SingleRecipe from '../components/SingleRecipe';
import loader from '../../assets/image/loader.gif';
/**
 * Displays all recipes
 * @class
 *
 * @returns {object} jsx object
 */
export class AllRecipeScreen extends React.Component {
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
      limit: 2,
      offset: 0,
      page: 0,
      loading: true
    };

    this.getMoreRecipes = this.getMoreRecipes.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Execute before component mounts
   * @returns {null} null
   */
  componentWillMount() {
    this.props.getAllRecipes(this.state)
      .then(() => this.setState({ loading: false }));
  }

  /**
   * Get more recipes
   * @function
   *
   * @param {object} page null
   * @returns {object} all recipes
   */
  getMoreRecipes(page) {
    this.setState({ page: page.selected, loading: true }, () => {
      this.props.getAllRecipes(this.state).then(() => {
        setTimeout(() => {
          this.setState({ loading: false });
        }, 500);
      });
    });
  }

  /**
   * Handle input change
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

    const loadingRecipes = (
      <div
        style={{ clear: 'both' }}
        key={0}
      ><img
        style={{ width: '100px' }}
        src={loader}
        alt="loader"
      />
      </div>);
    return (
      <div>
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
                  onChange={(event) => { this.props.updateSortQuery(event.target.value); }}
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
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                  <option value={6}>6</option>
                </select>
                <button
                  style={{ width: 150, fontWeight: 'bold' }}
                  type="submit"
                  className="btn btn-default ml-sm-4"
                >SEARCH
                </button>
              </form>
            </div>
            {
              !this.state.loading &&

              <div className="row" style={{ padding: '10px' }}>
                {recipes.map(recipe =>
                  <SingleRecipe key={recipe.id} recipe={recipe} />)}
              </div>}
          </div>

          {
            this.state.loading &&
            <div className="row justify-content-center">
              {loadingRecipes}
            </div>
          }

          <nav className="row pt-3 justify-content-center">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel={<a>...</a>}
              breakClassName="page-link"
              pageCount={this.props.pageData.pageCount}
              onPageChange={this.getMoreRecipes}
              containerClassName="pagination pagination-lg"
              pageLinkClassName="page-link"
              nextLinkClassName="next-link page-link"
              previousLinkClassName="page-link"
              disabledClassName="disabled"
              pageClassName="page-item"
              previousClassName="page-item"
              nextClassName="page-item"
              activeClassName="active"
            />
          </nav>
        </section>
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
    downvotes: PropTypes.number.isRequired
  })),
  searchQuery: PropTypes.string.isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
  updateSortQuery: PropTypes.func.isRequired,
  getAllRecipes: PropTypes.func.isRequired,
  pageData: PropTypes.shape({
    page: PropTypes.number,
    pageCount: PropTypes.number
  }).isRequired
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
export const mapStateToProps = state =>
  ({
    authUser: state.authUser,
    recipes: state.recipes.rows,
    searchQuery: state.search.query,
    pageData: state.recipes.pageData,
    sort: state.sort,
    page: state.recipes.pageData.page
  });

/**
 * Map dispatch to props
 * @param {func} dispatch
 *
 * @returns {object} object to be passed as props to component
 */
export const mapDispatchToProps = dispatch =>
  bindActionCreators({
    signOutUser,
    getAllRecipes,
    updateSearchQuery,
    updateSortQuery
  }, dispatch);

const AllRecipeScreenContainer = connect(mapStateToProps, mapDispatchToProps)(AllRecipeScreen);

export default AllRecipeScreenContainer;
