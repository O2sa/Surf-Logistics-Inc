

 import { Router } from "express";
import { deleteMessage, getAllMessages, getMessage, updateMessage } from "../controllers/messageController.js";
 const router = Router();



router.route("/:id").get(getMessage).patch(updateMessage).delete(deleteMessage)
router.route('/').get(getAllMessages)

export default router;
