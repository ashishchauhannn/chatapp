import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import Authentication from "../middleware/Authentication.js";
const router = express.Router();


//:id params requset
router.route("/send/:id").post(Authentication, sendMessage)
router.route("/:id").get(Authentication, getMessage)

export default router;