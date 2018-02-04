import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Footer from '../components/Footer';
import { signUpUser } from '../store/actions/user';
import { checkEmail, checkUsername, checkname, checkPassword } from '../helpers';
import '../../assets/css/style.css';
/**
 * Displays Sign up component
 * @class
 *
 * @returns {object} jsx object
 */
class RegisterScreen extends React.Component {
  /**
   * Adds new recipe
   * @constructor
   *
   * @param {object} props
   *
   * @returns {object} jsx
   */
  constructor(props) {
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      error: null,
      errors: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  /**
   * handles field change
   * @function
   *
   * @param {object} event
   *
   * @returns {object} sets state of field to its current value
   */
  async handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  /**
   * handles form submission
   * @function
   *
   * @param {null} null
   *
   * @returns {object} user object or errors if errors exist
   */
  async handleValidation() {
    let errors = [];

    if ((this.state.firstname.length < 1) || (!checkname(this.state.firstname))) {
      errors.push('First name is required');
    }

    if ((this.state.lastname.length < 1) || (!checkname(this.state.lastname))) {
      errors.push('Last name is required');
    }

    if (this.state.email.length < 1) {
      errors.push('Email address is required');
    }

    if (this.state.email.length > 1 && (!checkEmail(this.state.email))) {
      errors.push('Please enter a valid email address');
    }

    if ((this.state.username.length < 1) || (!checkUsername(this.state.username))) {
      errors.push('Choose a preferred username');
    }

    if (this.state.password.length < 1) {
      errors.push('Choose a password');
    }

    if (this.state.password.length < 6) {
      errors.push('Your password should have a minimum of 6 characters');
    }
    if (this.state.password.length >= 6 && (!checkPassword(this.state.password))) {
      errors.push('Password should only include (a-z, 0-9, -, _, .)');
    }


    this.setState({ errors }, () => {
      return Promise.resolve();
    });
  }
  /**
   * handles form submission
   * @function
   *
   * @param {null} null
   *
   * @returns {object} user object or errors if errors exist
   */
  async handleRegister() {
    await this.handleValidation();
    if (this.state.errors.length > 0) {
      return;
    }

    try {
      const response = await this.props.signUpUser({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      });
      this.props.router.push('/');
    } catch (error) {
      if (error.response.status === 400) {
        this.setState({
          errors: [error.response.data.message]
        });
      } else {
        this.setState({
          error: 'Try again after some time.'
        });
      }
    }
  }
  /**
 * Renders sign up component
 *
 * @returns {jsx} jsx which displays sign up component
 */
  render() {
    const errorHolder = this.state.errors.map((error, index) => {
      return (
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
      );
    });

    return (
      <div>
        <section id="nav">
          <nav
            className="navbar navbar-expand-sm navbar-dark fixed-top navbar-custom"
          >
            <Link
              to ="/home"
              className="moreRecipes"
              href="#"
            >MORE RECIPES
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
                    to="/signin"
                    className="navbar-register"
                    style={{marginRight: 20}}
                    href="#"
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
        <div
          className="container"
          style={{
              position: 'absolute',
              top: 50,
              left: 0,
              right: 0,
              margin: '0 auto'
            }}
        >
          <div className="row justify-content-center py-5">
            <div className="col-sm-12 col-md-8">
              <div className="card card-container " id="register-card">
                <h1
                  className="card-header text-center"
                  style={{ fontFamily: 'kaushan script' }}
                >CREATE NEW ACCOUNT
                </h1><br />
                {errorHolder}
                <div className="card-body">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="Firstname"
                    value={this.state.firstname}
                    onChange={
                      this.handleInputChange}
                  />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Lastname"
                    value={this.state.lastname}
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                  <div
                    className="row justify-content-center"
                  >
                    <input
                      type="submit"
                      name="register"
                      className="register-card-submit"
                      onClick={(event) => { this.handleRegister(); }}
                      style={{ fontFamily: 'kaushan script' }}
                      defaultValue="SIGN UP"
                    />
                  </div>
                  <div className="register-help">
                    <Link
                      to="/signin"
                      className="register-link"
                      href="#"
                      style={{
                        color: 'white',
                        fontFamily: 'kaushan script'
                        }}
                    >ALREADY REGISTERED?  SIGN IN
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
RegisterScreen.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
/**
 * Map state to props
 * @param {object} state
 *
 * @returns {object} empty object
 */
const mapStateToProps = (state) => {
  return {};
};
/**
 * Map dispatch to props
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
*/
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    signUpUser
  }, dispatch);


const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

export default Register;
