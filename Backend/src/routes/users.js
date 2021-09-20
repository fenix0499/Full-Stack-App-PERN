import { Router } from "express";
import * as UsersController from "../controllers/UsersController.js";
const router = Router();

router.get("/users", UsersController.getAllUsers);
router.post("/users", UsersController.createAcount);
router.post("/login-acount", UsersController.loginAcount);

export default router;
