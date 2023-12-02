import { Request, Response, Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/loginMiddleware';

const userController = new UserController();
const router = Router();

router.post('/', validateLogin, (req:Request, res:Response) => userController.login(req, res));

export default router;
