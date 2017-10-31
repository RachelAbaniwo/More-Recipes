module.exports = (sequelize, DataTypes) => {
  const Recipes = sequelize.define('Reviews', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    recipeId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      },
    },
  });
  return Reviews;
};