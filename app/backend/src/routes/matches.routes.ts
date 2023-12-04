import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import Auth from '../middlewares/Auth';
import Match from '../middlewares/Match';
import AuthMatch from '../middlewares/AuthMatch';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req:Request, res:Response) => matchesController.getMatches(req, res));
router.patch(
  '/:id',
  AuthMatch.validate,
  (req: Request, res: Response) => matchesController.updateMatch(req, res),
);
router.patch(
  '/:id/finish',
  Auth.validate,
  (req:Request, res:Response) => matchesController.finishMatch(req, res),
);
router.post(
  '/',
  AuthMatch.validate,
  Match.validate,
  (req:Request, res:Response) => matchesController.createMatch(req, res),
);

export default router;
