'use strict';

var bcrypt = require('bcrypt');
var dotenv = require('dotenv');

dotenv.config();

module.exports = {
  up: function up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      profilePicture: '',
      firstname: 'Rachel',
      lastname: 'Abaniwo',
      username: 'RachelAbaniwo',
      email: 'rachel.abaniwo@test.com',
      aboutMe: 'food lover and engineer',
      password: bcrypt.hashSync(process.env.PASSWORD, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      profilePicture: '',
      firstname: 'Inene',
      lastname: 'Abaniwo',
      username: 'IneneAbaniwo',
      email: 'inene.abaniwo@test.com',
      aboutMe: 'food lover and engineer',
      password: bcrypt.hashSync(process.env.PASSWORD, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      profilePicture: '',
      firstname: 'Nelson',
      lastname: 'Abang',
      username: 'NelsonAbang',
      email: 'nelson.abang@test.com',
      aboutMe: 'food lover and engineer',
      password: bcrypt.hashSync(process.env.PASSWORD, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      profilePicture: '',
      firstname: 'Nene',
      lastname: 'Rae',
      username: 'NeneRae',
      email: 'nene.rae@test.com',
      aboutMe: 'food lover and engineer',
      password: bcrypt.hashSync(process.env.PASSWORD, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      profilePicture: '',
      firstname: 'Nnenna',
      lastname: 'Remi',
      username: 'NnennaRemi',
      email: 'nnenna.remi@test.com',
      aboutMe: 'food lover and engineer',
      password: bcrypt.hashSync(process.env.PASSWORD, 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};