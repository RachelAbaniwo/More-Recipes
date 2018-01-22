import React from 'react';
import Noty from 'noty';
import toastr from 'toastr';
import { connect } from 'react-redux';

class Notification extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.notification && this.props.notification.level === 'SUCCESS') {
      console.log(this.props.notification);
      new Noty({
        text: this.props.notification.message,
        type: 'success',
        theme: 'bootstrap-v4',
        timeout: 3000
      }).show();
    }
    return <div></div>
  }
}

const mapStateToProps = state => ({ notification: state.notification });

const NotificationContainer = connect(mapStateToProps, null)(Notification);

export default NotificationContainer;

