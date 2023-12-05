import { Router } from 'express';
import leaderBoardRouter from './leaderBoard.routes';
import matchesRouter from './matches.routes';
import teamRouter from './team.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
