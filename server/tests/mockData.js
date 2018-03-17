import dotenv from 'dotenv';

dotenv.config();

export default {
  rachel: {
    email: 'rachel.abaniwo@test.com',
    password: process.env.PASSWORD
  },
  inene: {
    email: 'inene.abaniwo@test.com',
    password: process.env.PASSWORD
  },
  nelson: {
    email: 'nelson.abang@test.com',
    password: process.env.PASSWORD
  },
  nene: {
    email: 'nene.rae@test.com',
    password: process.env.PASSWORD
  },
  nnena: {
    email: 'nnenna.remi@test.com',
    password: process.env.PASSWORD
  },
  nneka: {
    email: 'nneka.remi@test.com',
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
  },
};

