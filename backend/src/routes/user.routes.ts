import express from "express";
import { UserController } from "../controllers/UserController";
import { validateToken } from "../middlewares/tokenValidation";
import { registerValidation } from "../middlewares/registerValidation";

const router = express.Router();

router.post("/register", registerValidation, UserController.register);
router.delete("/user", validateToken, UserController.deleteUser);
router.post("/login", UserController.login);
router.get("/users", validateToken, UserController.getUsers);
router.get("/test", validateToken, (req, res) => {res.json({message: "valid token"})});

export default router;
