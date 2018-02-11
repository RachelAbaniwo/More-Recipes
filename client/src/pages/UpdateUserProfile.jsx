import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Footer from '../components/Footer';
import ImageFile from '../components/ImageUploader';
import { setImageUrl } from '../store/actions/recipes';
import { updateUserProfile } from '../store/actions/userProfile';
import { checkField, checkEmail, checkUsername } from '../helpers';

/**
 * Update user-profile component
 * @class
 *
 * @returns {object} jsx object
 */
class UpdateUserScreen extends React.Component {
  /**
   * Updates an existing user's profile
   * @constructor
   *
   * @param {object} props
   *
   * @returns {object} jsx
   */
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.authUser.user.username,
      email: this.props.authUser.user.email,
      aboutMe: this.props.authUser.user.aboutMe,
      imageUrl: this.props.authUser.user.profilePicture,
      errors: [],
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.updateUserProfile = this.updateUserProfile.bind(this);
  }

  /**
   * handles field change
   * @function
   *
   * @param {object} event
   *
   * @returns {object} sets state of field to its current value
   */
  async handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * handles validation of field input
   * @function
   *
   * @param {null} null
   *
   * @returns {object} with errors if errors exist
   */
  async handleValidation() {
    const errors = [];

    if (this.state.email.length < 1) {
      errors.push('Email address is required');
    }

    if (this.state.email.length > 1 && (!checkEmail(this.state.email))) {
      errors.push('Please enter a valid email address');
    }

    if ((this.state.username.length < 1) ||
      (!checkUsername(this.state.username))) {
      errors.push('Choose a preferred username');
    }
    if ((this.state.aboutMe) && (checkField(this.state.aboutMe))) {
      errors.push('fill in valid characters in the about-me field');
    }

    this.setState({ errors }, () => {
      return Promise.resolve();
    });
  }

  /**
   * handles upload of recipe image to cloudinary
   * @function
   *
   * @param {null} null
   *
   * @returns {object} with image url
   */
  async uploadToCloudinary() {
    const formData = new FormData();

    formData.append('file', this.props.imageFile);
    formData.append('upload_preset', 'jj8czdds');

    try {
      delete axios.defaults.headers.common.token;

      const response =
      await
        axios.post(
          'https://api.cloudinary.com/v1_1/rachelabaniwo/image/upload',
          formData
        );

      axios.defaults.headers.common.token =
        JSON.parse(localStorage.getItem('authUser')).token;

      return Promise.resolve(response.data.secure_url);
    } catch (errors) {
      console.log(errors);
    }
  }
  /**
   * handles update user form submission
   * @function
   *
   * @param {null} null
   *
   * @returns {object} recipe object or errors if errors exist
   */
  async updateUserProfile() {
    await this.handleValidation();
    if (this.state.errors.length > 0) {
      return;
    }
    this.setState({
      isLoading: true
    });
    if (this.props.imageFile) {
      const secureUrl = await this.uploadToCloudinary();
      const updateUserData = this.state;
      updateUserData.imageUrl = secureUrl;

      await
      this.props.updateUserProfile(updateUserData, this.props.authUser.user.id);
      return this.props.router.push('/dashboard');
    }

    await this.props.updateUserProfile(this.state, this.props.authUser.user.id);
    return this.props.router.push('/dashboard');
  }

  /**
   * Renders update user screen
   *
   * @returns {jsx} jsx which adds a new recipe or errors if errors exist
   */
  render() {
    const errorHolder = this.state.errors.map((error, index) => (
      <span key={index}>
        <small
          className="mb-3"
          style={{
            color: 'red',
            fontFamily: 'kaushan script',
            fontWeight: 'bold'
          }}
        >{error}
        </small>
        <br />
      </span>
    ));

    let buttonText = 'UPDATE PROFILE';
    const { isLoading } = this.state;
    if (isLoading) {
      buttonText = 'UPDATING PROFILE ...';
    }
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
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
                      style={{ fontSize: 15 }}
                    >PROFILE
                    </a>
                    <a
                      className="dropdown-item"
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
          className="container text-center mx auto create-recipe-container"
          style={{
            border: '1px solid lightgrey',
            padding: 30,
            marginTop: 90,
            marginBottom: 50
          }}
        >
          <section className="row justify-content-center py-5">
            <section className="col-md-8">
              <div
                className="card"
                style={{
                  backgroundColor: 'rgba(233, 231, 231, 0.863)'
                }}
              >
                <h4
                  className="card-header text-center title"
                >UPDATE PROFILE
                </h4><br />
                {errorHolder}
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={this.state.username}
                        placeholder="Display Name"
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        onChange={this.handleChange}
                        className="form-control"
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        type="text"
                        onChange={this.handleChange}
                        className="form-control"
                        name="aboutMe"
                        placeholder="About Me"
                        value={this.state.aboutMe}
                      />
                    </div>
                    <div className="form-group p-0 m-0">
                      <ImageFile
                        setImageUrl={this.props.setImageUrl}
                        imageFile={this.props.imageFile}
                        imageUrl={this.props.authUser.user.profilePicture}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={this.updateUserProfile}
                      className="btn btn-default"
                      disabled={this.state.isLoading}
                      style={{
                        marginLeft: 10,
                        marginTop: 20,
                        marginBottom: 20,
                        fontWeight: 900
                      }}
                    >{buttonText}
                    </button>
                  </form>
                </div>
              </div>
            </section>
          </section>
        </section>
        <Footer />
      </div>
    );
  }
}

UpdateUserScreen.propTypes = {
  imageFile: PropTypes.shape({
    preview: PropTypes.string.isRequired
  }),
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      aboutMe: PropTypes.string.isRequired,
      profilePicture: PropTypes.string.isRequired,
    })
  }).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  setImageUrl: PropTypes.func.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
};
UpdateUserScreen.defaultProps = {
  imageFile: null,
};

/**
 * Map state to props
 * @param {object} state
 * @param {object} ownProps
 *
 * @returns {object} object of recipes passed as props
 */
const mapStateToProps = state => ({
  imageFile: state.imageUpload.imageFile,
  authUser: state.authUser
});

/**
 * Map dispatch to props
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
*/
const mapDispatchToProps = dispatch => bindActionCreators({
  setImageUrl,
  updateUserProfile
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserScreen);
