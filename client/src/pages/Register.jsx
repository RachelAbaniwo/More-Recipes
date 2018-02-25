import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { signUpUser, signOutUser } from '../store/actions/user';
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
    const errors = [];

    if (this.state.firstname.length < 1) {
      errors.push('First name is required!');
    }
    if (this.state.firstname.length > 1 && this.state.firstname.length < 3) {
      errors.push('Your first name should have a minimum of 3 characters');
    }
    if ((this.state.firstname.length > 1) && (this.state.firstname.length >= 3)
    && (!checkname(this.state.firstname))) {
      errors.push('First name should include letters only');
    }
    if (this.state.lastname.length < 1) {
      errors.push('Last name is required!');
    }
    if (this.state.lastname.length > 1 && this.state.lastname.length < 3) {
      errors.push('Your last name should have a minimum of 3 characters');
    }
    if ((this.state.lastname.length > 1) && (this.state.lastname.length >= 3) &&
    (!checkname(this.state.lastname))) {
      errors.push('Last name should include letters only');
    }
    if (this.state.username.length < 1) {
      errors.push('Choose a user name!');
    }
    if (this.state.username.length > 1 && this.state.username.length < 3) {
      errors.push('Your user name should have a minimum of 3 characters');
    }
    if ((this.state.username.length > 1) && (this.state.username.length >= 3) &&
    (!checkUsername(this.state.username))) {
      errors.push('Username should include only ( letters, numbers, - and _ )');
    }
    if (this.state.email.length < 1) {
      errors.push('Email Address is required!');
    }
    if ((this.state.email.length > 1) && (!checkEmail(this.state.email))) {
      errors.push('Email format is wrong, enter valid email address');
    }
    if (this.state.password.length < 1) {
      errors.push('Choose a password');
    }
    if ((this.state.password.length > 1) && (this.state.password.length < 6)) {
      errors.push('Your password should have a minimum of 6 characters');
    }
    if ((this.state.password.length > 1) && (this.state.password.length >= 6) &&
     (!checkPassword(this.state.password))) {
      errors.push('Password should only include ( letters, numbers, -, _, and . )');
    }
    this.setState({ errors }, () => Promise.resolve());
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
      await this.props.signUpUser({
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
    const errorHolder = this.state.errors.map(error => (
      <span key={error}>
        <small
          className="mb-3"
          style={{
          color: 'orange',
          fontFamily: 'Advent Pro',
          fontWeight: '900'
        }}
        >{error}
        </small>
        <br />
      </span>
    ));

    return (
      <div>
        <Navbar
          authUser={this.props.authUser}
          signOutUser={this.props.signOutUser}
          router={this.props.router}
        />
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
                  className="card-header text-center title"
                  style={{ fontFamily: 'Advent Pro' }}
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
                      className="register-card-submit title"
                      onClick={() => { this.handleRegister(); }}
                      style={{ fontFamily: 'Advent Pro' }}
                      defaultValue="SIGN UP"
                    />
                  </div>
                  <div className="register-help">
                    <Link
                      to="/signin"
                      className="register-link"
                      style={{
                        color: 'white',
                        fontFamily: 'Advent Pro'
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
  }).isRequired,
  authUser: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      aboutMe: PropTypes.string.isRequired
    })
  }),
  signOutUser: PropTypes.func.isRequired
};

RegisterScreen.defaultProps = {
  authUser: null
};

/**
 * Map state to props
 * @param {object} state
 *
 * @returns {object} empty object
 */
const mapStateToProps = state =>
  ({ authUser: state.authUser });

/**
 * Map dispatch to props
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
*/
const mapDispatchToProps = dispatch =>
  bindActionCreators({
    signOutUser,
    signUpUser
  }, dispatch);


const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

export default Register;
