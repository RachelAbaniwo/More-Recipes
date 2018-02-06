import React from 'react';
import { Router, Link, Route, browserHistory, IndexRoute } from 'react-router';
import ReactDom from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import Login from './screens/Login';
import Register from './screens/Register';
import CreateRecipe from './screens/CreateRecipe';
import ViewRecipe from './screens/ViewRecipe';
import AllRecipesScreen from './components/AllRecipes';
import { setAxios, ifAuthenticated } from './helpers/app';

import './../assets/css/style.css';

import store from './store';
import Main from './containers/Main';

import Home from './screens/Home';

setAxios();

ReactDom.render(
  <Provider store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/home" component={Home}></Route>
        <Route path="/signup" component={Register}></Route>
        <Route path="/signin" component={Login}></Route>
        <Route path="/recipes/create" component={CreateRecipe}></Route>
        <Route path="/recipes" component={AllRecipesScreen} />
        <Route path="/view-recipe/:recipeId" component={ViewRecipe}></Route>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);
