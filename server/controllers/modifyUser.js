import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../models';
import { returnName, returnUsername, returnParameter, returnEmail } from '../helpers/checkInput';

const { User } = db;
dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
/**
 * Controls the user endpoints
 */
export default class ModifyUserController {
/**
   * updates an existing user's profile
   * @param {object} req user object
   * @param {object} res updated userbobject
   * @returns {json} return updated user
   */
  updateUser(req, res) {
    User.findById(req.params.userId).then((user) => {
      User.update({
        firstname: returnName(req.body.firstname) || user.firstname,
        lastname: returnName(req.body.lastname) || user.lastname,
        username: returnUsername(req.body.username) || user.username,
        email: returnEmail(req.body.email) || user.email,
        id: user.id,
        aboutMe: returnParameter(req.body.aboutMe) || user.aboutMe,
        profilePicture: req.body.imageUrl || user.profilePicture
      }, {
        where: { id: req.params.userId },
        returning: true,
        plain: true
      })
        .then((newUser) => {
          const updatedUser = {
            firstname: newUser[1].firstname,
            lastname: newUser[1].lastname,
            username: newUser[1].username,
            email: newUser[1].email,
            id: newUser[1].id,
            aboutMe: newUser[1].aboutMe,
            profilePicture: newUser[1].profilePicture
          };
          res.status(201).json({
            user: updatedUser, message: 'Successfully updated profile'
          });
        }).catch(error => res.status(500).json({
          message: error.message
        }));
    }).catch(() => res.status(400).json({ message: 'Invalid request' }));
  }
  /**
     * deletes a user from database
     * @param {object} req user object
     * @param {object} res message
     * @returns {json} returns a message
     */
  deleteUser(req, res) {
    return User.findById(req.params.userId).then((user) => {
      user.destroy().then(() => res.status(200).json({
        message: 'Successfully deleted user'
      }))
        .catch(error => res.status(500).json({
          message: error.message
        }));
    });
  }
}
