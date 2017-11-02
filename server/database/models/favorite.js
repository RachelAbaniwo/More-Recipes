
module.exports = (sequelize, DataTypes) => {
  var Favorite = sequelize.define('Favorite', {
    userId: { 
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', key: 'id'
    }
  },
    recipeId: {
      type:DataTypes.INTEGER,
      references: {
        model: 'Recipes',key: 'id'
      },
      },
  }, {
    classMethods: {
      associate (models) {
        Favorite.belongsTo(models.User, {
          foreignKey: 'userId'
        })
        Favorite.belongsTo(models.Recipe, {
          foreignKey: 'recipeId'
        })
      }
    }
  });

  return Favorite;
};