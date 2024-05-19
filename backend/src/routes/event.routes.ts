import express from "express";
import { EventController } from "../controllers/EventController";
import { validateToken } from "../middlewares/tokenValidation";
import { eventCreateValidation } from "../middlewares/eventCreateValidation";

const router = express.Router();

router.post("/createEvent", validateToken, eventCreateValidation, EventController.createEvent);
router.get("/userEvents", validateToken, EventController.getUserEvents);
router.put("/updateEvent/:id", validateToken, EventController.updateEvent);
router.delete("/deleteEvent/:id", validateToken, EventController.deleteEvent);
router.get("/getEvent/:id", validateToken, EventController.getEventById);

export default router;
