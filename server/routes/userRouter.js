
 import { Router } from "express";
import { changePss, getCurrentUser, updateUser } from "../controllers/userControllers.js";
import { createQuote, getUserQuotes } from "../controllers/quoteController.js";
import { createConsultation, getUserConsultations } from "../controllers/consultationController.js";
 const router = Router();



router.route("/").get(getCurrentUser).patch(updateUser)
router.route("/update-password").patch(changePss)
router.route("/get-quotes").get(getUserQuotes);
router.route("/get-consultations").get(getUserConsultations);
router.route("/add-quote").post(createQuote);
router.route("/add-consultation").post(createConsultation);



export default router;
