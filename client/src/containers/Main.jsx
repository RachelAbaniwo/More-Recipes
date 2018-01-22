
import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../store/actions';
import Notification from './../components/Notification';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <Fragment>
        <Notification />
        {this.props.children}
      </Fragment>
    );
  }
}



/**
 * 
 * @param {obj} state 
 */
function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main;
