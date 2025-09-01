import {NextFunction, Request, Response} from "express";

import { getUserSongsList } from '@src/services/songs/index.js';

class SongsController {
  async getUserSongsListController(req: Request, res: Response, _next: NextFunction) {
    const userId = Number(req.params.userId);

    const result = await getUserSongsList(userId);

    res.json({ result });
  }
}

export default new SongsController();
