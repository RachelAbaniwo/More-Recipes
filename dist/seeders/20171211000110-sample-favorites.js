'use strict';

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Favorites', [{
      recipeId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      recipeId: 1,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Favorites', null, {});
  }
};