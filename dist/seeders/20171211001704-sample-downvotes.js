'use strict';

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Downvotes', [{
      recipeId: 2,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Downvotes', null, {});
  }
};