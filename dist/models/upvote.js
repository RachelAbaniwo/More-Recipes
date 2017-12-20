'use strict';

module.exports = function (sequelize, DataTypes) {
  var Upvote = sequelize.define('Upvote', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', key: 'id'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Recipes', key: 'id'
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
        Upvote.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        Upvote.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return Upvote;
};