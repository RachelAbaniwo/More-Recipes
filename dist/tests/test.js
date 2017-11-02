'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect; /* eslint-disable */

_chai2.default.use(_chaiHttp2.default);

describe('/recipes endpoint', function () {
    describe('/recipes GET endpoint', function () {
        it('should return a list of recipes when called', function (done) {
            _chai2.default.request(_app2.default).get('/api/v1/recipes').end(function (error, response) {

                expect(response).to.have.status(200);
                expect(response.body).to.be.an('object');

                done();
            });
        });
        it('should return a list of recipes in according to the number of upvotes in descending order', function (done) {
            _chai2.default.request(_app2.default).get('/api/v1/recipes?sort=upvotes&order=des').end(function (error, response) {

                expect(response).to.have.status(200);
                expect(response.body).to.be.an('object');
                done();
            });
        });
    });

    describe('/recipes POST endpoint', function () {
        it('it should add a new recipe to the recipes', function (done) {
            _chai2.default.request(_app2.default).post('/api/v1/recipes').send({
                recipeName: "Ofaku",
                recipeType: "Nigerian-Soup",
                ingredients: "Palm fruits",
                description: "description 1",
                direction: "direction 1"
            }).end(function (error, response) {
                expect(response).to.have.status(201);
                var recipe = response.body.data.recipe;
                expect(recipe.id).to.not.be.undefined;
                expect(recipe.recipeName).to.equal('Ofaku');
                expect(recipe.recipeType).to.equal('Nigerian-Soup');
                expect(recipe.ingredients).to.equal('Palm fruits');
                expect(recipe.description).to.equal('description 1');
                expect(recipe.direction).to.equal('direction 1');
                expect(recipe.upvotes).to.equal(0);
                expect(recipe.downvotes).to.equal(0);
                expect(recipe.favorites).to.equal(0);

                done();
            });
        });
        it('it should return correct validation errors if wrong data is provided', function (done) {
            _chai2.default.request(_app2.default).post('/api/v1/recipes').send({}).end(function (error, response) {

                expect(response).to.have.status(422);

                var errors = response.body.data.errors;

                expect(errors).to.include('Recipe Name is required.');
                expect(errors).to.include('Recipe Type is required.');
                expect(errors).to.include('Recipe Ingredients are required.');
                expect(errors).to.include('Recipe Description is required.');
                expect(errors).to.include('Recipe Directions are required.');

                done();
            });
        });
    });

    describe('/recipes PUT endpoint', function () {
        it('it should update the recipe with specified recipe Id', function (done) {
            _chai2.default.request(_app2.default).put('/api/v1/recipes/1').send({
                recipeName: "Chicken Chilli Sauce",
                recipeType: "Stews and Sauce",
                ingredients: "Chicken, Chilli Pepper, Veggies",
                description: "Sauce to be served along side pasta",
                direction: "add Chicken, then add Chilli Pepper"
            }).end(function (error, response) {
                expect(response).to.have.status(201);

                var recipe = response.body.data.recipe;
                expect(recipe.id).to.equal(1);
                expect(recipe.recipeName).to.equal('Chicken Chilli Sauce');
                expect(recipe.recipeType).to.equal('Stews and Sauce');
                expect(recipe.ingredients).to.equal('Chicken, Chilli Pepper, Veggies');
                expect(recipe.description).to.equal('Sauce to be served along side pasta');
                expect(recipe.direction).to.equal('add Chicken, then add Chilli Pepper');

                done();
            });
        });
        it('it should return an error if the recipe id of the recipe to be updated is not specified', function (done) {
            _chai2.default.request(_app2.default).put('/api/v1/recipes/Rachel').send({
                recipeName: "Chicken Chilli Sauce",
                recipeType: "Stews and Sauce",
                ingredients: "Chicken, Chilli Pepper, Veggies",
                description: "Sauce to be served along side pasta",
                direction: "add Chicken, then add Chilli Pepper"
            }).end(function (error, response) {
                expect(response).to.have.status(404);
                expect(response.body.data.message).to.equal('the recipe was not found in the database');

                done();
            });
        });
    });

    describe('/recipes DELETE endpoint', function () {
        it('it should delete the recipe with specified recipe Id', function (done) {
            _chai2.default.request(_app2.default).delete('/api/v1/recipes/1').end(function (error, response) {
                expect(response).to.have.status(200);
                expect(response.body.data.message).to.equal('Recipe successfully deleted.');

                done();
            });
        });
        it('it should return an error if recipe Id is not specified', function (done) {
            _chai2.default.request(_app2.default).delete('/api/v1/recipes/Rachel').end(function (error, response) {
                expect(response).to.have.status(404);
                expect(response.body.data.message).to.equal('the recipe to be deleted was not found in the database');

                done();
            });
        });
    });

    describe('/recipes POST endpoint', function () {
        it('it should add a review to the recipe whose Id is specified', function (done) {
            _chai2.default.request(_app2.default).post('/api/v1/recipes/2/review').send({
                reviews: "Awesome Stuff"
            }).end(function (error, response) {
                expect(response).to.have.status(201);
                expect(response.body.data.recipe.reviews).to.include('Awesome Stuff');
                expect(response.body.data.message).to.equal('Review successfully added!');

                done();
            });
        });
        it('it should return an error if the Id of the recipe to be reviewed does not exist', function (done) {
            _chai2.default.request(_app2.default).post('/api/v1/recipes/7/review').send({
                reviews: "Awesome Stuff"
            }).end(function (error, response) {
                expect(response).to.have.status(404);
                expect(response.body.data.message).to.equal('the recipe you want to review was not found in the database!');

                done();
            });
        });
    });
});