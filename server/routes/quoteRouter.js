

 import { Router } from "express";
import { deleteQuote, getAllQuotes, getQuote, updateQuote } from "../controllers/quoteController.js";
 const router = Router();



router.route("/:id").get(getQuote).patch(updateQuote).delete(deleteQuote)
router.route('/').get(getAllQuotes)

export default router;
