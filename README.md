[![Build Status](https://travis-ci.org/RachelAbaniwo/More-Recipes.svg?branch=ft-recipe-routes)](https://travis-ci.org/RachelAbaniwo/More-Recipes)
[![Coverage Status](https://coveralls.io/repos/github/RachelAbaniwo/More-Recipes/badge.svg?branch=server-side-integration-tests)](https://coveralls.io/github/RachelAbaniwo/More-Recipes?branch=server-side-integration-tests)
# MORE-RECIPES

More-Recipes is a Recipe Web Application, it could be thought of as an online meet-up for everyone that enjoys cooking and sharing recipes, or for those who are probably just interested in finding out how amazing cuisines are put together. Users can either Sign Up to enjoy some awesome features or view recipes as a visitor.
***

### FEATURES
* A **VISITING USER** can navigate through the application, search for recipes, view them, view popular recipes(top voted and top favorited) and view recipe reviews.
* This **VISITING USER** can then decide to register and become a **MEMBER** of More-Recipes.
  * First name, Last name, a unique and valid Email Address, a unique User name and a Password are required of the User to successfully Register. 
  * As a **MEMBER**, signing in and out of the Application is done quite easily, a **MEMBER** can also update personal profile details, or delete the account completely.
  * A **MEMBER** can create a RECIPE, update that RECIPE and delete it.
  * A **MEMEBER** can view all the recipes created.
  * A **MEMBER** can add an up-vote or down-vote to a recipe and add any recipe to personal favorites.
  * A **MEMBER** can view favorite recipes and delete any recipe from the list of personal favorites.
  * A **MEMBER** can add reviews to recipes, update reviews previously made or delete them.

### DEVELOPMENT
More-Recipes API is built with the following Technologies;
* [NodeJS](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [Postgresql](https://www.postgresql.org/)
* [Sequelise ORM](https://sequelize.readthedocs.io/en/v3/)

### INSTALLATION
* Install [NodeJS](https://nodejs.org/en/) and [Postgresql](https://www.postgresql.org/) locally.
* Clone the Repository:
```typescript
$ git clone https://github.com/RachelAbaniwo/More-Recipes.git
```
* Make More-Recipes your current directory:
```terminal
$ cd /More-Recipes
```
* install all necessary dependencies with:
```typescript
$ npm install
```
* Create a `.env` file in the root directory and set up required configurations as described in the `.env.example` file.
* Build the Application with `npm run start`
* Server should run on port `4044`
### TESTING
* Make the current directory More-Recipes.
* Add a test database URL to the `.env` file (optional).
* Run:
`npm run test`

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
### LIMITATIONS
Database allows only limited number of Users

### LICENSE
This project is authored by [Rachel Abaniwo](https://github.com/RachelAbaniwo)

