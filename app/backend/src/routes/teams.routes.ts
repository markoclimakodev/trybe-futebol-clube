import { Router } from 'express';

import TeamsService from '../services/TeamsServices';
import TeamsController from '../controllers/TeamsController';
import Teams from '../database/models/Teams';

const teamsRouter = Router();
const service = new TeamsService(Teams);
const controller = new TeamsController(service);

teamsRouter.route('/')
  .get(controller.findAll);

teamsRouter.route('/:id')
  .get(controller.findById);

export default teamsRouter;
