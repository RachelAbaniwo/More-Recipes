import express from 'express';
import ModifyUserController from '../controllers/modifyUser';
import authenticationMiddleware from '../middleware/authenticate';
import authModifyUserMiddleware from '../middleware/authoriseModifyUser';


const router = express.Router();

const modifyUserController = new ModifyUserController();

// PUT /api/v1/users/:userId - Updates a User's Profile

router.route('/:userId')

  .put(authenticationMiddleware, authModifyUserMiddleware, modifyUserController.updateUser);

// DELETE /api/v1/users/:userId - Deletes a User

router.route('/:userId')

  .delete(authenticationMiddleware, authModifyUserMiddleware, modifyUserController.deleteUser);


export default router;
