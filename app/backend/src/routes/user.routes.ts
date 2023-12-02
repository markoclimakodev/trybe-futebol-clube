import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/loginMiddleware';
import auth from '../middlewares/authMiddleware';

const userController = new UserController();
const router = Router();

router.post('/', validateLogin, (req:Request, res:Response) => userController.login(req, res));
router.post(
  '/role',
  auth,
  (req:Request, res:Response) => userController.findRole(req, res),
);

export default router;
