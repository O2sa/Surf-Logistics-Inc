import { Router } from "express";
import {
  changePss,
  getCurrentUser,
  updateUser,
} from "../controllers/userControllers.js";
import { createQuote, getUserQuotes } from "../controllers/quoteController.js";
import {
  createConsultation,
  getUserConsultations,
} from "../controllers/consultationController.js";
import {
  validateConsultationInput,
  validateMessageInput,
  validateQuoteInput,
} from "../middleware/inputValidationMiddleware.js";
import { createMessage } from "../controllers/messageController.js";
const router = Router();

router.route("/").get(getCurrentUser).patch(updateUser);
router.route("/update-password").patch(changePss);
router.route("/get-quotes").get(getUserQuotes);
router.route("/get-consultations").get(getUserConsultations);
router.route("/add-quote").post(validateQuoteInput, createQuote);
router.route("/add-reach").post(validateMessageInput, createMessage);
router
  .route("/add-consultation")
  .post(validateConsultationInput, createConsultation);

export default router;
