import express from "express";

import {
  getUser,
  getUserId,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/Users.js";

const router = express.Router();

router.get("/users", getUser);
router.get("/users/:id", getUserId);
router.post("/create-user", createUser);
router.patch("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);

export default router;
