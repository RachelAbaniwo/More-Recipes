import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSearchQuery, updateSortQuery } from './../store/actions/recipes';
import { LandingTopButtons, CreateRecipeButton } from '../components/LandingPageButtons';
import { signOutUser } from '../store/actions/user';
import food9 from '../../assets/image/food-9.jpg';
import food20 from '../../assets/image/food-20.jpg';
import food23 from '../../assets/image/food-23.jpg';
import image10 from '../../assets/image/image10.jpeg';
import image5 from '../../assets/image/image5.jpeg';

/**
 * Displays home page component
 * @function
 *
 * @returns {object} jsx object
 */
export class Home extends React.Component {
  /**
   *
   * @constructor
   *
   * @param {object} props
   *
   * @returns {object} jsx
   */
  constructor(props) {
    super(props);
    this.state = {
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSortUpvotesClick = this.handleSortUpvotesClick.bind(this);
    this.handleSortFavoritesClick = this.handleSortFavoritesClick.bind(this);
  }

  /**
   * handles field change
   * @function
   *
   * @param {object} event
   *
   * @returns {object} sets state of field to its current value
   */
  handleChange(event) {
    this.props.updateSearchQuery(event.target.value);
  }
  /**
   * handles sort by upvotes
   * @function
   *
   * @param {object} event
   *
   * @returns {object} sets state of sort to upvotes and  redirects page
   */
  async handleSortUpvotesClick(event) {
    event.preventDefault();
    await this.props.updateSortQuery('upvotes');
    this.props.router.push('/recipes');
  }
  /**
   * handles sort by favorites
   * @function
   *
   * @param {object} event
   *
   * @returns {object} sets state of sort to upvotes and  redirects page
   */
  async handleSortFavoritesClick(event) {
    event.preventDefault();
    await this.props.updateSortQuery('favorites');
    this.props.router.push('/recipes');
  }


  /**
   * handles form submission
   * @function
   *
   * @param {event} event
   *
   * @returns {object} recipe object or errors if errors exist
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.router.push('/recipes');
  }

  /**
   * Renders Homepage
   *
   * @returns {jsx} jsx
   */
  render() {
    return (
      <div style={{ backgroundColor: '#eee' }}>
        <LandingTopButtons
          authUser={this.props.authUser}
          signOutUser={this.props.signOutUser}
          router={this.props.router}
        />
        <section id="slider">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-interval={2000}
            data-ride="carousel"
          >
            <div className="carousel-inner fullHeight">
              <div className="carousel-item active">
                <img className="d-block w-100" src={food9} alt="First slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={food20} alt="Third slide" />
              </div>
              <div className="carousel-item">
                <img className="d-block w-100" src={food23} alt="Third slide" />
              </div>
            </div>
            <div className="justify-content-center">
              <div
                className="container justify-content-center text-center"
                style={{
                  backgroundColor: 'rgba(73, 67, 67, 0.679)',
                  position: 'absolute',
                  paddingTop: 50,
                  paddingBottom: 50,
                  top: 80,
                  left: 0,
                  right: 0,
                  margin: '0 auto',
                  minWidth: 'auto',
                  boxShadow: '0px 2px 2px rgba(27, 255, 164, 0.967)'
                }}
              >
                <h1
                  className="text-center"
                  id="home-page-title"
                  style={{
                    fontFamily: 'Berkshire Swash',
                    color: 'lightGrey',
                    fontSize: 90
                  }}
                >
                  More Recipes
                </h1>
                <h3
                  className="text-center"
                  style={{
                    fontFamily: 'kaushan script',
                    paddingTop: 20,
                    color: 'rgba(241, 235, 178, 0.8)'
                  }}
                >
                  Enjoy the very best culinary
                  experiences from around the world and share yours too!!!
                </h3>
                <CreateRecipeButton authUser={this.props.authUser} />
                <form
                  className="form-inline justify-content-center"
                  onSubmit={this.handleSubmit}
                  style={{ paddingTop: 30 }}
                >
                  <input
                    style={{ width: 400 }}
                    className="form-control mr-sm-2 search"
                    type="text"
                    onChange={this.handleChange}
                    placeholder="Search Recipes"
                    value={this.props.searchQuery}
                    aria-label="Search"
                  />
                </form>
              </div>
              <a href="#popular">
                <div>
                  <div className="arrow bounce" />
                </div>
              </a>
            </div>
          </div>
        </section>
        <section
          className="container-fluid row no-gutters justify-content-between text-center"
          id="popular"
          style={{ backgroundColor: '#eee', marginTop: 50, marginBottom: 50 }}
        >
          <div
            className="card card-1 col-sm-12 col-md-5 card my-3 "
            style={{ margin: '30px' }}
            data-aos="zoom-in-down"
          >
            <a
              href="/"
              id="top-favorites-link"
              onClick={this.handleSortFavoritesClick}
            >
              <div className="card-body">
                <h2 className="card-subtitle text-muted" >Top Favorites</h2>
              </div>
              <img
                className="img-fluid mx-auto"
                src={image10}
                alt="sunset"
              />
              <p
                className="card-text text-center"
                style={{ color: 'rgba(73, 67, 67, 0.9' }}
              >Take a survey of our all time favorite recipes.
              </p>
            </a>
          </div>
          <div
            className="card card-1 col-sm-12 col-md-5 card my-3"
            style={{ margin: '30px' }}
            data-aos="zoom-in-down"
          >
            <a
              href="/"
              id="top-voted-link"
              onClick={this.handleSortUpvotesClick}
            >
              <div className="card-body">
                <h2 className="card-subtitle text-muted" >Top Voted</h2>
              </div>
              <img className="img-fluid mx-auto" src={image5} alt="sunset" />
              <p
                className="card-text text-center"
                style={{ color: 'rgba(73, 67, 67, 0.9)' }}
              >Checkout the recipes with the most upvotes.
              </p>
            </a>
          </div>
        </section>
      </div>

    );
  }
}

Home.propTypes = {
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      aboutMe: PropTypes.string.isRequired
    })
  }),
  searchQuery: PropTypes.string.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signOutUser: PropTypes.func.isRequired,
  updateSortQuery: PropTypes.func.isRequired,
  updateSearchQuery: PropTypes.func.isRequired
};

Home.defaultProps = {
  authUser: null
};

/**
 * Map state to props
 * @param {object} state
 * @param {object} ownProps
 *
 * @returns {object} object of recipes passed as props
 */
export const mapStateToProps = state =>
  ({ authUser: state.authUser, searchQuery: state.search.query });

/**
 * Map dispatch to props
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
*/
export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { signOutUser, updateSearchQuery, updateSortQuery },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
