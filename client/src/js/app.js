import React from 'react';
import { Router, Link, Route, browserHistory, IndexRoute } from 'react-router';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Login from './screens/Login'
import Register from './screens/Register'
import axios from 'axios';

import '../css/style.css';

import store from './store';
import Main from './containers/Main'

import Home from './screens/Home';


function setAxios () {
  const authUser = localStorage.getItem('authUser');
  if(authUser) {
    axios.defaults.headers.common['token'] = JSON.parse(authUser).token;
  }
}

setAxios();

function ifAuthenticated(nextState, replace) {
  const authUser = localStorage.getItem('authUser');
  if(authUser) {
    replace ({
      pathname: '/'
    });
  }
}

function ifNotAuthenticated(nextState, replace) {
  const authUser = localStorage.getItem('authUser');
  if(!authUser) {
    replace ({
      pathname: '/signin'
    });
  }
}






ReactDom.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/home" component={Home}></Route>
        <Route path="/signup" component={Register} onEnter={ ifAuthenticated }></Route>
        <Route path="/signin" component={Login} onEnter={ ifAuthenticated }></Route>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root'));
