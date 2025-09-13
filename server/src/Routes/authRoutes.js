import { Router } from "express";
import { Register,Login } from "../Controllers/authController.js";
import { authMiddleware } from "../Middleware/authmiddleware.js";

const router = Router();

router.post("/register",Register);
router.post("/login",Login);

export default router