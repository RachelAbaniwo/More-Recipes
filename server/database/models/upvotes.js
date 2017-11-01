module.exports = (sequelize, DataTypes) => {
  const Upvotes = sequelize.define('Upvotes', {
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
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      },
    },
  });
  return Upvotes;
};