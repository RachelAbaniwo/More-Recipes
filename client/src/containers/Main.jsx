
import React, { Fragment } from 'react';
import Notification from './../components/Notification';
/**
 * Add a recipe image component
 * @class
 *
 * @returns {object} jsx object
 */
class App extends React.Component {
/**
 * Display notifications
 *
 * @returns {jsx} jsx
 */
  render() {
  return (
      <Fragment>
        <Notification />
        {this.props.children}
      </Fragment>
    );
  }
}

export default App;
