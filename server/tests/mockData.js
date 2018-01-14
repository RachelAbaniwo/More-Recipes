import dotenv from 'dotenv';

dotenv.config();

export default {
  signinUser1: {
    Username: 'RachelAbaniwo',
    Password: process.env.PASSWORD
  },
  signinUser2: {
    Username: 'IneneAbaniwo',
    Password: process.env.PASSWORD
  },
  signinUser3: {
    Username: 'NelsonAbang',
    Password: process.env.PASSWORD
  },
  signinUser4: {
    Username: 'NeneRae',
    Password: process.env.PASSWORD
  },
  signinUser5: {
    Username: 'NnennaRemi',
    Password: process.env.PASSWORD
  },
  review1: {
    review: 'Awesome Stuff'
  },
  review2: {
    review: 'Nice!'
  },
  wrongUsernameSignIn: {
    Username: 'Abaniwo',
    Password: process.env.PASSWORD
  },
  wrongPasswordSignIn: {
    Username: 'IneneAbaniwo',
    Password: 'rach'
  },
  updateUser1: {
    Firstname: 'Rach',
    Lastname: 'Dyna',
    Username: 'RachDyna',
    Email: 'rach.dyna@test.com',
  },
  wrongUpdateUser: {
    Firstname: ' ',
    Lastname: ' * ',
    Username: ''
  },
  signupUser: {
    Firstname: 'Henry',
    Lastname: 'Nek',
    Username: 'HenryNek',
    Email: 'henrynek@test.com',
    Password: process.env.PASSWORD
  },
  wrongEmailFormat: {
    Firstname: 'Dan',
    Lastname: 'Enun',
    Username: 'DannyE',
    Email: 'racheltest.com',
    Password: process.env.PASSWORD
  },
  emailInUseSignUp: {
    Firstname: 'Danny',
    Lastname: 'Enun',
    Username: 'DannyEnun',
    Email: 'rachel.abaniwo@test.com',
    Password: process.env.PASSWORD
  },
  usernameInUseSignUp: {
    Firstname: 'Danny',
    Lastname: 'Enun',
    Username: 'RachelAbaniwo',
    Email: 'dannyenun@test.com',
    Password: process.env.PASSWORD
  },
  wrongCharacterSignUp: {
    Firstname: '  ',
    Lastname: ' ',
    Username: 'ab',
    Email: '  *\' ',
    Password: 'a'
  },
  recipe1: {
    name: 'Ofada Rice',
    category: 'Rice',
    ingredients: 'Ofada Rice, Pepper, Olive Oil, Onions',
    description: 'Ofada Rice is eaten with complimentary sauce',
    method: 'Boil Rice',
    imageUrl: 'https://img.com/1.png'
  },
  updateRecipe: {
    name: 'Chicken Chilli Sauce',
    category: 'Stews and Sauce',
    ingredients: 'Chicken, Chilli Pepper, Veggies',
    description: 'Sauce to be served along side pasta',
    method: 'add Chicken, then add Chilli Pepper'
  },
};

