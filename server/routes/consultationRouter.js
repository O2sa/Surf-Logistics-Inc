
 import { Router } from "express";
import { deleteConsultation, getAllConsultations, getConsultation, updateConsultation } from "../controllers/consultationController.js";
 const router = Router();



router.route("/:id").get(getConsultation).patch(updateConsultation).delete(deleteConsultation)
router.route('/').get(getAllConsultations)

export default router;
