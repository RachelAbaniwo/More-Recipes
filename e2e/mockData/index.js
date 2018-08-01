require('dotenv').config();

module.exports = {
  rachel: {
    email: 'rachel.abaniwo@test.com',
    password: process.env.PASSWORD
  },
  inene: {
    email: 'inene.abaniwo@test.com',
    password: process.env.PASSWORD
  },
  signinUser3: {
    email: 'nelson.abang@test.com',
    password: process.env.PASSWORD
  },
  signinUser4: {
    email: 'nene.rae@test.com',
    password: process.env.PASSWORD
  },
  signinUser5: {
    email: 'nnenna.remi@test.com',
    password: process.env.PASSWORD
  },
  review: {
    review: 'Awesome Stuff'
  },
  review2: {
    review: 'Nice!'
  },
  wrongEmailSignIn: {
    email: 'abaniwo@test.com',
    password: process.env.PASSWORD
  },
  wrongEmailFormatSignIn: {
    email: 'racheltest.com',
    password: process.env.PASSWORD
  },
  wrongPasswordSignIn: {
    email: 'inene.abaniwo@test.com',
    password: 'rach'
  },
  rach: {
    firstname: 'Rach',
    lastname: 'Dyna',
    username: 'RachDyna',
    email: 'rach.dyna@test.com',
    aboutMe: 'I love food more than anything else'
  },
  wrongUpdateUser: {
    firstname: ' ',
    lastname: ' * ',
    username: ''
  },
  henry: {
    name: 'Henry Nek',
    email: 'henrynek@test.com',
    password: process.env.PASSWORD
  },
  wrongEmailFormat: {
    firstname: 'Dan',
    lastname: 'Enun',
    username: 'DannyE',
    email: 'racheltest.com',
    password: process.env.PASSWORD
  },
  emailInUseSignUp: {
    firstname: 'Danny',
    lastname: 'Enun',
    username: 'DannyEnun',
    email: 'rachel.abaniwo@test.com',
    password: process.env.PASSWORD
  },
  usernameInUseSignUp: {
    firstname: 'Danny',
    lastname: 'Enun',
    username: 'RachelAbaniwo',
    email: 'dannyenun@test.com',
    password: process.env.PASSWORD
  },
  wrongCharacterSignUp: {
    name: '  ',
    email: '  *\' ',
    password: 'a'
  },
  ofada: {
    name: 'Ofada Rice',
    category: 'Rice',
    ingredients: 'Ofada Rice, Pepper, Olive Oil, Onions',
    description: 'Ofada Rice is eaten with complimentary sauce',
    method: 'Boil Rice',
    imageUrl: 'https://img.com/1.png',
    upvotes: 2,
    downvotes: 2,
    views: 0,
    favorites: 0
  },
  chickenChilli: {
    name: 'Chicken Chilli Sauce',
    category: 'Stews and Sauce',
    ingredients: 'Chicken, Chilli Pepper, Veggies',
    description: 'Sauce to be served along side pasta',
    method: 'add Chicken, then add Chilli Pepper'
  },
  wrongUpdateRecipe: {
    name: ' ',
    category: '',
  }
};
