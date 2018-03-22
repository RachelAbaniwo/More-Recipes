import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { signUpUser, signOutUser } from '../store/actions/user';
import { checkEmail, checkField, checkPassword, slugify } from '../helpers';

/**
 * Displays Sign up component
 * @class
 *
 * @returns {object} jsx object
 */
export class RegisterScreen extends React.Component {
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
      name: '',
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

    if (this.state.name.length < 1) {
      errors.push('Name is required!');
    }
    if (this.state.name.length > 1 && this.state.name.length < 3) {
      errors.push('Your name should have a minimum of 3 characters');
    }
    if ((this.state.name.length > 1) && (this.state.name.length >= 3)
    && (checkField(this.state.name))) {
      errors.push('Name should include letters only');
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

    const firstname = this.state.name.split(' ')[0];
    const lastname = this.state.name.split(' ')[1] || this.state.name.split(' ')[0];
    const username = slugify(this.state.name);

    try {
      await this.props.signUpUser({
        firstname,
        lastname,
        email: this.state.email,
        username,
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
          errors: ['Something went wrong. Please try again later.']
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
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={
                      this.handleInputChange}
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
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
export const mapStateToProps = state =>
  ({ authUser: state.authUser });

/**
 * Map dispatch to props
 * @param {object} dispatch
 *
 * @returns {object} object to be passed as props to component
*/
export const mapDispatchToProps = dispatch =>
  bindActionCreators({
    signOutUser,
    signUpUser
  }, dispatch);


const Register = connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

export default Register;
