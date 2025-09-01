import {Router} from "express";
import { param, query } from 'express-validator';

import { handleValidationResultMiddleware } from '../middlewares/index.js';
import songsController from '@src/controllers/songs/index.js';


const songsRouter = Router();

songsRouter.get(
  '/list/:userId',
  param('userId').isInt(),
  query('limit').isInt().optional(),
  query('offset').isInt().optional(),
  handleValidationResultMiddleware,
  songsController.getUserSongsListController,
);

export { songsRouter };
