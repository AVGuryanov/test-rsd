import {Router} from "express";

import external from "@src/router/external-recommendations/index.js";
import { songsRouter } from './songs/index.js';

const router = Router();

router.use("/external-recommendations", external);
router.use('/songs', songsRouter);


export default router;