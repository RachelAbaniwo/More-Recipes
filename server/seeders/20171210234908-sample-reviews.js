'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Reviews', [{
      review: 'This is Awesome',
      recipeId: 1,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      review: 'Super Nice!',
      recipeId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Reviews', null, {})
};
