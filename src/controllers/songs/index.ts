import {NextFunction, Request, Response} from "express";

import { getUserSongsList } from '@src/services/songs/index.js';

class SongsController {
  async getUserSongsListController(req: Request, res: Response, _next: NextFunction) {
    const userId = Number(req.params.userId);
    const limit = Number(req.query.limit) || 50;
    const offset = Number(req.query.offset) || 0;

    const result = await getUserSongsList(userId, limit, offset);

    res.json({ result });
  }
}

export default new SongsController();
