import React from 'react';
import Noty from 'noty';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Displays notification component
 * @function
 * @param {object} props
 * @returns {object} jsx which displays notifications
 */
const Notification = (props) => {
  if (props.notification) {
    new Noty({
      text: props.notification.message,
      type: props.notification.level,
      theme: 'bootstrap-v4',
      timeout: 2000
    }).show();
  }
  return <div />;
};

Notification.propTypes = {
  notification: PropTypes.shape({
    level: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  }),
};
Notification.defaultProps = {
  notification: null
};
/**
 * Map state to props
 * @param {object} state
 *
 * @returns {object} object to be passed as props to component
 */
const mapStateToProps = state => ({ notification: state.notification });

const NotificationContainer = connect(mapStateToProps, null)(Notification);

export default NotificationContainer;

