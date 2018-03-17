[![Build Status](https://travis-ci.org/RachelAbaniwo/More-Recipes.svg?branch=develop)](https://travis-ci.org/RachelAbaniwo/More-Recipes)
[![Maintainability](https://api.codeclimate.com/v1/badges/84f59b2028971023e876/maintainability)](https://codeclimate.com/github/RachelAbaniwo/More-Recipes/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/RachelAbaniwo/More-Recipes/badge.svg?branch=server-side-integration-tests)](https://coveralls.io/github/RachelAbaniwo/More-Recipes?branch=server-side-integration-tests)
[![codecov](https://codecov.io/gh/RachelAbaniwo/More-Recipes/branch/develop/graph/badge.svg)](https://codecov.io/gh/RachelAbaniwo/More-Recipes)
# MORE-RECIPES

[More-Recipes](https://nene-more-recipes.herokuapp.com/) is a Recipe Web Application, it could be thought of as an online meet-up for everyone that enjoys cooking and sharing recipes, or for those who are probably just interested in finding out how amazing cuisines are put together. Users can either Sign Up to enjoy some awesome features or view recipes as a visitor.
***

### APPLICATION DEMO AND API DOCUMENTATION
* View the running application [here](https://nene-more-recipes.herokuapp.com/)
* The API uses HTTP response codes to indicate the API status and errors. View documentation [here](https://nene-more-recipes.herokuapp.com/api-docs/) 

### FEATURES
* A **USER** can:
  * navigate through the application
  * search for recipes
  * view recipes 
  * view popular recipes(top voted and top favorited) and 
  * view recipe reviews.
This user can then decide to register and become a **MEMBER / REGISTERED USER** of More-Recipes.
  * Name, a unique and valid email address, and a password are required of the user to successfully Register. 
* A **REGISTERED USER**, can: 
  * sign in and out of the application securely and easily
  * update personal profile details, or delete the account completely
  * create a RECIPE, update that recipe and delete it
  * view all the recipes created
  * add an up-vote or down-vote to a recipe and add any recipe to personal favorites
  * view favorite recipes and delete any recipe from the list of personal favorites and
  * add reviews to recipes.

### DEVELOPMENT
More-Recipes is built with the following Technologies;
* [NodeJS](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Postgresql](https://www.postgresql.org/)
* [Sequelise ORM](https://sequelize.readthedocs.io/en/v3/)
* [ReactJS](https://reactjs.org/)
* [Redux](https://redux.js.org/)

### INSTALLATION
* Install [NodeJS](https://nodejs.org/en/) and [Postgresql](https://www.postgresql.org/) locally.
* Clone the Repository:
```typescript
$ git clone https://github.com/RachelAbaniwo/More-Recipes.git
```
* Make More-Recipes your current directory:
```terminal
$ cd More-Recipes
```
* install all necessary dependencies with:
```typescript
$ npm install
```
* Create a `.env` file in the root directory and set up required configurations as described in the `.env.sample` file.
* Create a database and run: `npm run migration`
* Start the server, `npm run start:dev`
* Server should run on port `4044`
* The preferred application hostname can be specified in the `client/src/config` file
* To view app navigate to `http://localhost:8080`
### TESTING
* Create a test database.
* Add the test database URL to the `.env` file (optional).
* For server-side tests, run:
`npm run test:server`
* For client-side tests, run:
`npm run test:client`
### CONTRIBUTING
* Fork this repository.
* Clone the forked repository.
* Create Feature Branch.
* Write tests.
* Commit changes made, we recommend that commit messages have Header, Body and Footer.
```terminal
feature(): This issue is addressed by this feature.
- implements this functionality.
- also implements this functionality.
[Delivers #STORY_ID]
```
* Push to remote branch.
* Open Pull Request.
```terminal
- Describe what this PR does
- How this is to be manually tested?
- Any background context you want to provide?
- Screenshots (if appropriate)
- Questions:
```
### CURRENT LIMITATIONS
* Users cannot reset password
* Users cannot view the profile, recipes and favorite recipes of other users

### AUTHOR
[Rachel Abaniwo](https://github.com/RachelAbaniwo)