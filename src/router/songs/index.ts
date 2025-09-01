import {Router} from "express";
import { param } from 'express-validator';

import { handleValidationResultMiddleware } from '../middlewares/index.js';
import songsController from '@src/controllers/songs/index.js';


const songsRouter = Router();

songsRouter.get(
  '/list/:userId',
  param('userId').isInt(),
  handleValidationResultMiddleware,
  songsController.getUserSongsListController,
);

export { songsRouter };
