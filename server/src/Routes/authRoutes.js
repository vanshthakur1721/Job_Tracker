import { Router } from "express";
import { Register,Login, Logout } from "../Controllers/authController.js";
import { authMiddleware } from "../Middleware/authmiddleware.js";

const router = Router();

router.post("/register",Register);
router.post("/login",Login);
router.post("/logout",Logout);

export default router