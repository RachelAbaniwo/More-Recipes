import React from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { updateSearchQuery } from './../store/actions/recipes';
import { LandingTopButtons, CreateRecipeButton } from '../components/LandingPageButtons';
import { signOutUser } from '../store/actions/user';
import food9 from '../../assets/image/food-9.jpg';
import food20 from '../../assets/image/food-20.jpg';
import food23 from '../../assets/image/food-23.jpg';
import image10 from '../../assets/image/image10.jpeg';
import image5 from '../../assets/image/image5.jpeg';
import '../../assets/css/style.css';

/**
 * Displays home page component
 * @function
 *
 * @returns {object} jsx object
 */
class Home extends React.Component {
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
      search: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
                  Enjoy the very best kitchen experiences from around the world and share yours too!!!
                </h3>
                <CreateRecipeButton authUser={this.props.authUser} />
                <form
                  className="form-inline justify-content-center"
                  onSubmit={this.handleSubmit}
                  style={{ paddingTop: 30 }}
                >
                  <input
                    style={{ width: 400 }}
                    className="form-control mr-sm-2"
                    type="search"
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
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
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
          </div>
          <div
            className="card card-1 col-sm-12 col-md-5 card my-3"
            style={{ margin: '30px' }}
            data-aos="zoom-in-down"
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
          </div>
        </section>
        <footer
          style={{
            bottom: '0',
            marginBottom: '0px',
            backgroundColor: 'rgba(73, 67, 67, 0.9)',
            maxWidth: '100%',
            height: 30
          }}
        >
          <p
            className="text-center"
            style={{
              marginBottom: 5,
              paddingTop: 5,
              color: '#fff',
              fontSize: 12
            }}
          >
            © 2017 More-Recipes
          </p>
        </footer>
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
  updateSearchQuery: PropTypes.func.isRequired,
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
const mapStateToProps = state =>
  ({ authUser: state.authUser, searchQuery: state.search.query });

/**
 * Map dispatch to props
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
*/
const mapDispatchToProps = dispatch =>
  bindActionCreators({ signOutUser, updateSearchQuery }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
