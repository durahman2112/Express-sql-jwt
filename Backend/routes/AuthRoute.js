import express from "express";
import { LoginMe, Login, Logout } from "../controllers/Auth.js";
const router = express.Router();

router.get("/me", LoginMe);
router.post("/login", Login);
router.delete("/logout", Logout);

export default router;
