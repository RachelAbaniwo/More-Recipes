import db from '../models';
import { returnName, returnUsername, returnParameter, returnEmail } from '../helpers/checkInput';

const { User } = db;
/**
 * Controls the user endpoints
 * @class ModifyUserController
 */
export default class ModifyUserController {
/**
   * updates an existing user's profile
   * @function updateUser
   *
   * @param {object} request user object
   * @param {object} response updated user
   *
   * @returns {json} return updated user
   */
  updateUser(request, response) {
    User.findById(request.params.userId).then((user) => {
      User.update({
        firstname: returnName(request.body.firstname) || user.firstname,
        lastname: returnName(request.body.lastname) || user.lastname,
        username: returnUsername(request.body.username) || user.username,
        email: returnEmail(request.body.email) || user.email,
        id: user.id,
        aboutMe: returnParameter(request.body.aboutMe) || user.aboutMe,
        profilePicture: request.body.imageUrl || user.profilePicture
      }, {
        where: { id: request.params.userId },
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
          response.status(201).json({
            user: updatedUser, message: 'Successfully updated profile'
          });
        }).catch(error => response.status(500).json({
          message: error.message
        }));
    }).catch(() => response.status(400).json({ message: 'Invalid request' }));
  }
  /**
     * deletes a user from database
     * @function deleteUser
     *
     * @param {object} request user object
     * @param {object} response message
     *
     * @returns {json} returns a success or error message
     */
  deleteUser(request, response) {
    return User.findById(request.params.userId).then((user) => {
      user.destroy().then(() => response.status(200).json({
        message: 'Successfully deleted user'
      }))
        .catch(error => response.status(500).json({
          message: error.message
        }));
    });
  }
}
