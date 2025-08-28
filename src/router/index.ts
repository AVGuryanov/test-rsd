import {Router} from "express";
import external from "@src/router/external-recommendations/index.js";

const router = Router();

router.use("/external-recommendations", external);

export default router;