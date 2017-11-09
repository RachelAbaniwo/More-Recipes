'use strict';

module.exports = function (sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    description: DataTypes.TEXT,
    method: DataTypes.TEXT,
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
      * @returns {integer} foriegn key declared
      */
      associate: function associate(models) {
        Recipe.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        Recipe.hasMany(models.Review, {
          foreignKey: 'recipeId'
        });
        Recipe.hasMany(models.Favorite, {
          foreignKey: 'recipeId'
        });
        Recipe.hasMany(models.Upvote, {
          foreignKey: 'recipeId'
        });
        Recipe.hasMany(models.Downvote, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return Recipe;
};