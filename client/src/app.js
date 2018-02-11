import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import ReactDom from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateRecipe from './pages/CreateRecipe';
import ViewRecipe from './pages/ViewRecipe';
import AllRecipesScreen from './pages/AllRecipes';
import ViewDashboard from './pages/ViewDashboard';
import UpdateUserProfile from './pages/UpdateUserProfile';
import { setAxios, ifAuthenticated } from './helpers/app';
import './../assets/css/style.css';
import store from './store';
import Main from './containers/Main';
import Home from './pages/Home';

setAxios();

ReactDom.render(
  <Provider store={store}>
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      <Route path="/" component={Main}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="/home" component={Home}></Route>
        <Route path="/signup" component={Register} />
        <Route path="/signin" component={Login}></Route>
        <Route path="/recipes/create" component={CreateRecipe} />
        <Route path="/recipes" component={AllRecipesScreen} />
        <Route path="/view-recipe/:recipeId" component={ViewRecipe} />
        <Route path="/update-recipe/:recipeId" component={CreateRecipe} />
        <Route path="/dashboard" component={ViewDashboard} />
        <Route path="/update-profile" component={UpdateUserProfile} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);
