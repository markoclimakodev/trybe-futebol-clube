import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import Auth from '../middlewares/Auth';
import Login from '../middlewares/Login';

const userController = new UserController();
const router = Router();

router.post(
  '/',
  Login.validate,
  (req:Request, res:Response) => userController.login(req, res),
);
router.get(
  '/role',
  Auth.validate,
  (req:Request, res:Response) => UserController.findRole(req, res),
);

export default router;
