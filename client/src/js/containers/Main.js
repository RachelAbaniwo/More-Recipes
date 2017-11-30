/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';


class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div>
        {React.cloneElement(this.props.children, this.props)}
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
  return {
    removeRecipe() {
      dispatch({
        type: 'REMOVE_RECIPE'
      });
    },
  }
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main;
