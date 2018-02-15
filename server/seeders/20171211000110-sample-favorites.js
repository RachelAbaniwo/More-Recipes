'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Favorites', [{
      recipeId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      recipeId: 1,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      recipeId: 5,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      recipeId: 5,
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      recipeId: 5,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Favorites', null, {})
};
