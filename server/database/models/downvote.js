module.exports = (sequelize, DataTypes) => {
  const Downvote = sequelize.define('Downvote', {
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
        Downvote.belongsTo(models.User, {
          foreignKey: 'userId'
        });
        Downvote.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        });
      }
    }
  });
  return Downvote;
};
