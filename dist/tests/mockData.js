'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

exports.default = {
  signinUser1: {
    email: 'rachel.abaniwo@test.com',
    password: process.env.PASSWORD
  },
  signinUser2: {
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
  review1: {
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
  updateUser1: {
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
  signupUser: {
    firstname: 'Henry',
    lastname: 'Nek',
    username: 'HenryNek',
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
    firstname: '  ',
    lastname: ' ',
    username: 'ab',
    email: '  *\' ',
    password: 'a'
  },
  recipe1: {
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
  updateRecipe: {
    name: 'Chicken Chilli Sauce',
    category: 'Stews and Sauce',
    ingredients: 'Chicken, Chilli Pepper, Veggies',
    description: 'Sauce to be served along side pasta',
    method: 'add Chicken, then add Chilli Pepper'
  },
  wrongUpdateRecipe: {
    name: ' ',
    category: ''
  }
};