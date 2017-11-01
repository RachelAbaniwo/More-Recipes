module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    Firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The username already in use.'
      },
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The email already exists.'
      },
      validate: {
        isEmail: {
          msg: 'The Email entered is invalid'
        }
      }
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
         User.hasMany(models.Recipe, {
           foreignKey: 'userId'
         });
      },
    },
  });
  return User;
};