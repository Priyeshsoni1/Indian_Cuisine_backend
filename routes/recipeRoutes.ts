import express from "express";
import {
  findDishesByIngredients,
  getAllDishes,
  getDishSuggestions,
  getDishById,
  createDish, // ✅ import
} from "../controllers/dishController";

const router = express.Router();

router.get("/", getAllDishes);

router.get("/suggest", getDishSuggestions);
router.post("/create", createDish);
router.get("/:id", getDishById); // ✅ route for ID-based search
router.post("/possible", findDishesByIngredients);

export default router;
