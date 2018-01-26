import db from '../models';
import { returnName, returnUsername, returnParameter, returnEmail, returnPassword } from '../helpers/checkInput';

const { User } = db;
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
        aboutMe: returnParameter(req.body.aboutMe) || user.aboutMe
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
            aboutMe: newUser[1].aboutMe
          };
          res.status(201).json({
            user: updatedUser, message: 'Successfully updated profile'
          });
        }).catch(error => res.status(500).json({
          message: error.message
        }));
    }).catch(() => res.status(400).json({ message: 'Invalid Request' }));
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
