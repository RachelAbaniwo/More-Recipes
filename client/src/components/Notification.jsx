import React from 'react';
import Noty from 'noty';
import { connect } from 'react-redux';

/**
 * Displays notification component
 * @class
 * @returns {object} jsx for component
 */
class Notification extends React.Component {
/**
 * renders appropriate notification
 *
 * @returns {jsx} jsx which adds a new review
 */
  render() {
    if (this.props.notification) {
      new Noty({
        text: this.props.notification.message,
        type: this.props.notification.level,
        theme: 'bootstrap-v4',
        timeout: 3000
      }).show();
    }
    return <div />;
  }
}
/**
 * Map state to props
 * @param {object} state
 *
 * @returns {object} object to be passed as props to component
 */
const mapStateToProps = state => ({ notification: state.notification });

const NotificationContainer = connect(mapStateToProps, null)(Notification);

export default NotificationContainer;

