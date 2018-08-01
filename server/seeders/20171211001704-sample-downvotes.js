'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Downvotes', [{
      recipeId: 2,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Downvotes', null, {})
};
