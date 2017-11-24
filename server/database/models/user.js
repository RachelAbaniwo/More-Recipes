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
        msg: 'The Username is already in use.'
      },
    },
    Email: {
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
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Recipe, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Favorite, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Review, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Upvote, {
      foreignKey: 'userId'
    });
    User.hasMany(models.Downvote, {
      foreignKey: 'userId'
    });
  };

  return User;
};
