'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Recipes', [{
      recipeImage: '',
      name: 'Fried Noodles',
      category: 'Pasta',
      ingredients: 'Noodles, Pepper, Olive Oil, Onions',
      description: 'Noodles',
      method: 'fry noodles',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      recipeImage: '',
      name: 'Coconut Rice',
      category: 'Rice',
      ingredients: 'Rice, Coconut Milk, Pepper, Olive Oil, Onions',
      description: 'Rice made with Coconut Milk',
      method: 'boil Rice',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      recipeImage: '',
      name: 'Chilli Fries',
      category: 'Fries',
      ingredients: 'Irish Potatoes',
      description: 'Irish Potatoes',
      method: 'Deep Fry Potatoes',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      recipeImage: '',
      name: 'Chicken Sauce',
      category: 'Sauces',
      ingredients: 'Chicken',
      description: 'Chicken',
      method: 'Boil Chicken in veggies',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      recipeImage: '',
      name: 'Nigerian Doughnut',
      category: 'Pastries',
      ingredients: 'Flour, Sugar',
      description: 'Mix and Fry',
      method: 'Deep Fry',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      recipeImage: '',
      name: 'Jamaican Sauce',
      category: 'Sauces',
      ingredients: 'Chicken, Veggies',
      description: 'Nice Sauce',
      method: 'Slice Veggies, Slice Chicken into bits',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Recipes', null, {})
};