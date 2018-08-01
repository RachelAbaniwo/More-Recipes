import express from 'express';
import ModifyUser from '../controllers/modifyUser';
import authenticate from '../middleware/authenticate';
import authoriseModifyUser from '../middleware/authoriseModifyUser';


const router = express.Router();

const modifyUserController = new ModifyUser();

// PUT /api/v1/users/:userId - Updates a User's Profile

router.route('/:userId')

  .put(authenticate, authoriseModifyUser, modifyUserController.updateUser);

// DELETE /api/v1/users/:userId - Deletes a User

router.route('/:userId')

  .delete(authenticate, authoriseModifyUser, modifyUserController.deleteUser);


export default router;
