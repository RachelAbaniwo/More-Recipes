module.exports = (sequelize, DataTypes) => {
  const Upvote = sequelize.define('Upvote', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users', key: 'id'
      }
    },
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipes', key: 'id'
      },
    },
  }, {
    classMethods: {
      /**
   * declares associations
   * @param {object} models
   * @returns {integer} foreign key declared
   */
      associate(models) {
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
