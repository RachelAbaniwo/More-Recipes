'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [{
      profilePicture: '',
      Firstname: 'Rachel',
      Lastname: 'Abaniwo',
      Username: 'RachelAbaniwo',
      Email: 'rachel.abaniwo@test.com',
      Password: bcrypt.hashSync('rachel', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      profilePicture: '',
      Firstname: 'Inene',
      Lastname: 'Abaniwo',
      Username: 'IneneAbaniwo',
      Email: 'inene.abaniwo@test.com',
      Password: bcrypt.hashSync('rachel', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      profilePicture: '',
      Firstname: 'Nelson',
      Lastname: 'Abang',
      Username: 'NelsonAbang',
      Email: 'nelson.abang@test.com',
      Password: bcrypt.hashSync('rachel', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
