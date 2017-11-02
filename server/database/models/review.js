'use strict';
module.exports = (sequelize, DataTypes) => {
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
    },
  }, {
    classMethods: {
      associate (models) {
        Review.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        })
        Review.belongsTo(models.User, {
          foreignKey: 'userId'
        })
      }
    }
  });
  return Review;
};