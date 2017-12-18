import db from '../models';
import { returnName, returnUsername } from '../helpers/checkInput';

const { User } = db;
/**
 * Controls the user endpoints
 */
export default class ModifyUserController {
/**
   * updates an existing user's profile
   * @param {object} req request object
   * @param {object} res response object
   * @returns {json} json returned to client
   */
  updateUser(req, res) {
    User.findById(req.params.userId).then((user) => {
      User.update({
        Firstname: returnName(req.body.Firstname) || user.Firstname,
        Lastname: returnName(req.body.Lastname) || user.Lastname,
        Username: returnUsername(req.body.Username) || user.Username,
        Email: req.body.Email || user.Email,
        id: user.id
      }, {
        where: { id: req.params.userId },
        returning: true,
        plain: true
      })
        .then((newUser) => {
          const updatedUser = {
            Firstname: newUser[1].Firstname,
            Lastname: newUser[1].Lastname,
            Username: newUser[1].Username,
            Email: newUser[1].Email,
            id: newUser[1].id,
          };
          res.status(201).json({
            updatedUser, message: 'Successfully updated profile'
          });
        }).catch(error => res.status(500).json({
          message: error.message
        }));
    }).catch(() => res.status(400).json({ message: 'Invalid Request' }));
  }
  /**
     * deletes a user from database
     * @param {object} req request object
     * @param {object} res response object
     * @returns {json} json returns message to client
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
