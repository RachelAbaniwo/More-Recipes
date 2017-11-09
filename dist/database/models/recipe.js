'use strict';

module.exports = function (sequelize, DataTypes) {
  var Recipe = sequelize.define('Recipe', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    description: DataTypes.TEXT,
    method: DataTypes.TEXT,
    upvotes: DataTypes.INTEGER,
    downvotes: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER
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
        Recipe.hasMany(models.Review);
      }
    }
  });
  return Recipe;
};