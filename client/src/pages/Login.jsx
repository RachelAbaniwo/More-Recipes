import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { signInUser, signOutUser } from '../store/actions/user';
import { checkEmail } from '../../../server/helpers/checkInput';
import '../../assets/css/style.css';

/**
 * Create Login component
 * @class
 *
 * @returns {object} jsx object
 */
class LoginScreen extends React.Component {
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
      error: null,
      email: '',
      password: '',
      errors: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
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
   * handles validation of field input
   * @function
   *
   * @param {null} null
   *
   * @returns {object} with errors if errors exist
   */
  async handleValidation() {
    const errors = [];

    if ((this.state.email.length < 1) || (!checkEmail(this.state.email))) {
      errors.push('Email is required');
    }

    if (this.state.password.length < 1) {
      errors.push('Password is required');
    }

    this.setState({ errors });
  }

  /**
   * handles form submission
   * @function
   *
   * @param {null} null
   *
   * @returns {object} user object or errors if errors exist
   */
  async handleSignIn() {
    await this.handleValidation();
    if (this.state.errors.length > 0) {
      return;
    }

    try {
      const user = await this.props.signInUser({
        email: this.state.email,
        password: this.state.password
      });

      this.props.router.push('/');
    } catch (error) {
      if (error.response.status === 400) {
        this.setState({
          errors: [error.response.data.errors]
        });
      } else if (error.response.status === 422) {
        this.setState({
          errors: [error.response.data.message]
        });
      } else {
        this.setState({
          error: 'Please try again after some time.'
        });
      }
    }
  }

  /**
 * Renders login component
 *
 * @returns {jsx} jsx which displays login component
 */
  render() {
    const errorHolder = this.state.errors.map((error, index) => {
      return (
        <span key={index}>
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
      );
    });

    return (
      <div >
        <Navbar
          authUser={this.props.authUser}
          signOutUser={this.props.signOutUser}
          router={this.props.router}
        />
        <div
          className="container"
          style={{
            position: 'absolute',
            top: 100,
            left: 0,
            right: 0,
            margin: '0 auto'
            }}
        >
          <div className="row justify-content-center py-5">
            <div className="col-sm-12 col-md-8">
              <div className="card card-container" id="login-card">
                <h1
                  className="card-header text-center title"
                  style={{ fontFamily: 'Advent Pro' }}
                >SIGN IN
                </h1><br />
                {errorHolder}
                <div className="card-body">
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
                  <div className="row justify-content-center">
                    <input
                      type="submit"
                      name="login"
                      className="login login-card-submit"
                      onClick={() => { this.handleSignIn(); }}
                      style={{ fontFamily: 'Advent Pro' }}
                      defaultValue="SIGN IN"
                    />
                  </div>
                  <div className="login-help" style={{ color: 'white', fontFamily: 'Advent Pro' }}>
                    <Link
                      to="signup"
                      className="register-link mr-1"
                      style={{ color: 'white' }}
                    >REGISTER NEW ACCOUNT
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
LoginScreen.propTypes = {
  signInUser: PropTypes.func.isRequired,
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
LoginScreen.defaultProps = {
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
const mapDispatchToProps = dispatch => bindActionCreators({
  signOutUser,
  signInUser
}, dispatch);


const Login = connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

export default Login;
