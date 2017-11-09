'use strict';

module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    review: DataTypes.TEXT,
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes', key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', key: 'id'
      }
    }
  }, {
    classMethods: {
      /**
      * declares associations
      * @param {object} models
      * @returns {integer} foreign key declared
      */
      associate: function associate(models) {
        Review.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        });
        Review.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Review;
};