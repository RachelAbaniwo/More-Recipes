'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _recipe = require('./controllers/recipe');

var _recipe2 = _interopRequireDefault(_recipe);

var _user = require('./controllers/user');

var _user2 = _interopRequireDefault(_user);

var _models = require('./database/models');

var _models2 = _interopRequireDefault(_models);

var _auth = require('./middleware/auth');

var _auth2 = _interopRequireDefault(_auth);

var _authorise = require('./middleware/authorise');

var _authorise2 = _interopRequireDefault(_authorise);

var _canDownvote = require('./middleware/canDownvote');

var _canDownvote2 = _interopRequireDefault(_canDownvote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up the express app
var app = (0, _express2.default)();
//  app.use('/api/recipes', router);

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
var recipesController = new _recipe2.default();
var userController = new _user2.default();
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/api/v1/recipes', recipesController.getRecipes);
app.get('/api/v1/recipes/:id', recipesController.getOneRecipe);
app.get('/api/v1/users/myrecipes', _auth2.default, recipesController.getMyRecipes);
app.get('/api/v1/users/:id/recipes', _auth2.default, recipesController.getUserRecipes);
app.post('/api/v1/recipes', _auth2.default, recipesController.addRecipes);
app.put('/api/v1/recipes/:id', _auth2.default, _authorise2.default, recipesController.updateRecipe);
app.delete('/api/v1/recipes/:id', _auth2.default, _authorise2.default, recipesController.deleteRecipe);
app.post('/api/v1/recipes/:id/review', _auth2.default, recipesController.addReviews);
app.post('/api/v1/signup/', userController.userSignUp);
app.post('/api/v1/signin', userController.userSignIn);
app.post('/api/v1/users/favorites/:recipeId', _auth2.default, recipesController.addFavorite);
app.get('/api/v1/users/favorites', _auth2.default, recipesController.getFavorites);
app.post('/api/v1/recipes/:recipeId/upvotes', _auth2.default, recipesController.addUpvotes);
app.post('/api/v1/recipes/:recipeId/downvotes', _auth2.default, _canDownvote2.default, recipesController.addDownvotes);

app.use(function (req, res) {
  res.json('UNKNOWN REQUEST.');
});

_models2.default.sequelize.sync().then(function () {
  app.listen(4044, function () {
    console.log('server is running');
  });
});

exports.default = app;