'use strict';

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [{
      Firstname: 'Rachel',
      Lastname: 'Abaniwo',
      Username: 'RachelAbaniwo',
      Email: 'rachel.abaniwo@test.com',
      Password: 'rachel',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      Firstname: 'Inene',
      Lastname: 'Abaniwo',
      Username: 'IneneAbaniwo',
      Email: 'inene.abaniwo@test.com',
      Password: 'rachel',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
