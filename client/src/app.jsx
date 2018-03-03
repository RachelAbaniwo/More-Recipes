import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRecipe from './pages/CreateRecipe';
import ViewRecipe from './pages/ViewRecipe';
import AllRecipesScreen from './pages/AllRecipes';
import ViewDashboard from './pages/ViewDashboard';
import UpdateUserProfile from './pages/UpdateUserProfile';
import { setAxios, ifAuthenticated, ifNotAuthenticated } from './helpers/app';
import './../assets/css/style.css';
import store from './store';
import Main from './containers/Main';
import Home from './pages/Home';

setAxios();

ReactDom.render(
  <Provider store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/signup" component={Register} onEnter={ifAuthenticated} />
        <Route path="/signin" component={Login} onEnter={ifAuthenticated} />
        <Route
          path="/recipes/create"
          component={CreateRecipe}
          onEnter={ifNotAuthenticated}
        />
        <Route path="/recipes" component={AllRecipesScreen} />
        <Route path="/view-recipe/:recipeId" component={ViewRecipe} />
        <Route
          path="/update-recipe/:recipeId"
          component={CreateRecipe}
          onEnter={ifNotAuthenticated}
        />
        <Route
          path="/dashboard"
          component={ViewDashboard}
          onEnter={ifNotAuthenticated}
        />
        <Route
          path="/update-profile"
          component={UpdateUserProfile}
          onEnter={ifNotAuthenticated}
        />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);
