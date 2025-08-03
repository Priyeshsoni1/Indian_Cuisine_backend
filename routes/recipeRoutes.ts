import express from "express";
import {
  findDishesByIngredients,
  getAllDishes,
  getDishSuggestions,
  getDishById, // ✅ import
} from "../controllers/dishController";

const router = express.Router();

router.get("/", getAllDishes);
router.get("/suggest", getDishSuggestions);
router.get("/:id", getDishById); // ✅ route for ID-based search
router.post("/possible", findDishesByIngredients);

export default router;
