import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
const router = Router();

router.post("/refresh-access-token", AuthController);

export default router;