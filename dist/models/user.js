'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The Username is already in use.'
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The Email already exists.'
      },
      validate: {
        isEmail: {
          msg: 'The Email entered is invalid'
        }
      }
    },
    aboutMe: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ''

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId'
    });
  };

  return User;
};