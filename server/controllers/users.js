import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';

const { User } = db;
const { Recipe } = db;
/**
 * Controls the user endpoints
 */
export default class UserController {
/**
   * adds a new user to database
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  userSignUp(req, res) {
    const errors = [];
    if (!req.body.Firstname) {
      errors.push('First name is Required!');
    }
    if (!req.body.Lastname) {
      errors.push('Last name is Required!');
    }
    if (!req.body.Username) {
      errors.push('Choose your User Name.');
    }
    if (!req.body.Email) {
      errors.push('Email Address is Required!');
    }
    if (!req.body.Password) {
      errors.push('Choose a Password');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        errors,
        message: 'Please fix the validation errors'
      });
    }

    User.create({
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Username: req.body.Username,
      Email: req.body.Email,
      Password: bcrypt.hashSync(req.body.Password, 10)
    }).then((user) => {
      const createdUser = {
        firstname: user.Firstname,
        lastname: user.Lastname,
        username: user.Username,
        email: user.Email,
        id: user.id
      };
      const token = jwt.sign(createdUser, 'secret', {
        expiresIn: 60 * 60 * 24
      });
      res.status(201).json({
        createdUser,
        token,
        message: 'Successfully signed up!'
      });
    }).catch((error) => {
      res.status(400).json({
        message: error.message
      });
    });
  }
  /**
   * signs user in
   * @param {object} req express request object
   * @param {object} res express response object
   * @returns {json} json returned to client
   */
  userSignIn(req, res) {
    const errors = [];

    if (!req.body.Username) {
      errors.push('Username is required');
    }
    if (!req.body.Password) {
      errors.push('Password is required');
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors, message: 'Please fix the validation errors' });
    }
    return User.findOne({ where: { Username: req.body.Username } }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Wrong credentials' });
      }
      if (bcrypt.compareSync(req.body.Password, user.Password)) {
        const existingUser = {
          firstname: user.Firstname,
          lastname: user.Lastname,
          username: user.Username,
          email: user.Email,
          id: user.id
        };
        const token = jwt.sign(existingUser, 'secret');
        return res.status(200).json({ existingUser, token, message: 'Successfully signed in.' });
      }

      return res.status(404).json({ message: 'Wrong credentials' });
    }).catch((error) => {
      res.status(500).json({
        message: error.message
      });
    });
  }
  /**
   * gets a user's personal recipes from database
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json returned to client
   */
  getMyRecipes(req, res) {
    Recipe.findAll({ where: { userId: req.AuthUser.id } }).then((recipes) => {
      if (recipes.length < 1) {
        return res.status(404).json({
          message: 'You have no Recipes'
        });
      } res.status(200).json({
        recipes
      });
    }).catch(error =>
      res.status(500).json({
        message: error.message
      }));
  }
  /**
   * gets any user's recipes by the user's id
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json returned to client
   */
  getUserRecipes(req, res) {
    User.findOne({ where: { id: req.params.userId } }).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: 'User not Found'
        });
      }
      Recipe.findAll({ where: { userId: req.params.userId } }).then((recipes) => {
        if (recipes.length < 1) {
          return res.status(404).json({
            message: 'User has no Recipes'
          });
        }
        res.status(200).json({
          recipes
        });
      }).catch(() =>
        res.status(422).json({
          message: 'Invalid Request'
        }));
    }).catch(() =>
      res.status(422).json({
        message: 'Invalid Request'
      }));
  }
}

// update user, delete user, find user. token, exclude pword, delete review,
// update review,delete from favorites, middle ware for long if statements, check for empty
// fields for update user and update recipe, add image, eagerloading, id-uiid,view reviews
// token expiry
// "pretest": "npm run cleardb && NODE_ENV=test sequelize db:migrate && NODE_ENV=test sequelize db:seed:all",