import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import Auth from '../middlewares/Auth';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req:Request, res:Response) => matchesController.getMatches(req, res));
router.patch(
  '/:id/finish',
  Auth.validate,

  (req:Request, res:Response) => matchesController.finishMatch(req, res),
);

export default router;
