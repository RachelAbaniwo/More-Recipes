import React from 'react';
import { Router, Link, Route, browserHistory, IndexRoute } from 'react-router';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Login from './screens/Login'
import Register from './screens/Register'

import '../css/style.css';

import store from './store';
import Main from './containers/Main'

import Home from './screens/Home';

const SignUp = () => {
  return (
    <h1 className="className">THis is the sign up</h1>
  );
}





ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/signup" component={Register}></Route>
        <Route path="/signin" component={Login}></Route>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
