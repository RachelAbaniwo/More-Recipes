/* eslint-disable */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './../store/actions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div>
        {this.props.children}
      </div>
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
