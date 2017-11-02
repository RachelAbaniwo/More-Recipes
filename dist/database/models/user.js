'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    Firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'The username already in use.'
      }
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
      allowNull: false
    }
  }, {
    classMethods: {
      /**
      * declares associations
      * @param {object} models
      * @returns {integer} foreign key declared
      */
      associate: function associate(models) {
        User.hasMany(models.Recipe, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return User;
};