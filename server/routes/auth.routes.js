import express from "express";
import { singUp, login, logout } from "../controllers/auth.controller.js";
const router = express.Router();

// signup route endpoint
router.post("/signup", singUp);

// login route endpoint
router.post("/login", login);

// logout route endpoint
router.post("/logout", logout);

export default router;
