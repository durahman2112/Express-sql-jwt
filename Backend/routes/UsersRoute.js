import express from "express";

import {
  getUser,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";

import { verifyUser, isAdmin } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/users", verifyUser, isAdmin, getUser);
router.get("/users/:id", verifyUser, isAdmin, getUserId);
router.post("/create-user", verifyUser, isAdmin, createUser);
router.patch("/update-user/:id", verifyUser, isAdmin, updateUser);
router.delete("/delete-user/:id", verifyUser, isAdmin, deleteUser);

export default router;
