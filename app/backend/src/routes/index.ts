import { Router } from 'express';
import matchesRouter from './matches.routes';
import teamRouter from './team.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchesRouter);

export default router;
