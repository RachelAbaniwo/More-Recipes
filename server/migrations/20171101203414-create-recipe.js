module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Recipes', {
      recipeImage: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: ''
      },
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      ingredients: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      method: {
        type: Sequelize.TEXT
      },
      upvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      downvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      favorites: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      views: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Recipes');
  }
};
