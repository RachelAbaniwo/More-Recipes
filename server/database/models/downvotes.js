module.exports = (sequelize, DataTypes) => {
  const Downvotes = sequelize.define('Downvotes', {
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
  return Downvotes;
};