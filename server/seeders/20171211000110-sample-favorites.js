'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Favorites', [{
      recipeId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Favorites', null, {})
};
