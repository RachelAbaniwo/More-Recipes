'use strict';

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Upvotes', [{
      recipeId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Upvotes', null, {});
  }
};