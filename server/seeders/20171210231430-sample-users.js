'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [{
      Firstname: 'Rachel',
      Lastname: 'Abaniwo',
      Username: 'RachelAbaniwo',
      Email: 'rachel.abaniwo@test.com',
      Password: bcrypt.hashSync('rachel', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      Firstname: 'Inene',
      Lastname: 'Abaniwo',
      Username: 'IneneAbaniwo',
      Email: 'inene.abaniwo@test.com',
      Password: bcrypt.hashSync('rachel', 10),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
