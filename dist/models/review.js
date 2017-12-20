'use strict';

module.exports = function (sequelize, DataTypes) {
  var Review = sequelize.define('Review', {
    review: DataTypes.TEXT,
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
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
  });

  Review.associate = function (models) {
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId'
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId'
    });
  };
  return Review;
};