import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';

import authUserPropType from '../propTypes/authUser';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { signOutUser } from '../store/actions/user';
import Notification from './../components/Notification';
/**
 * Add a recipe image component
 * @function
 *
 * @returns {object} jsx object
 */
const App = ({
  children, location, router, authUser, signOutUser: signOutUserFunc
}) => ((
  <Fragment>
    <Notification />
    {
      location.pathname !== '/' && location.pathname !== '/home' &&
      <Navbar
        authUser={authUser}
        signOutUser={signOutUserFunc}
        router={router}
      />
    }
    {children}
    <Footer
      isHomeScreen={location.pathname === '/' || location.pathname === '/home'}
    />
  </Fragment>
));

App.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  authUser: authUserPropType,
  signOutUser: PropTypes.func.isRequired,
  router: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

App.defaultProps = {
  authUser: null
};

export default connect(
  state => ({ authUser: state.authUser }),
  dispatch => bindActionCreators({ signOutUser }, dispatch)
)(App);
