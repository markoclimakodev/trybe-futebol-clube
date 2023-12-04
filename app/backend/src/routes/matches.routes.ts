import { Request, Response, Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req:Request, res:Response) => matchesController.getMatches(req, res));

export default router;
