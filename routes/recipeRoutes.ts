import express from "express";
import { findDishesByIngredients, getAllDishes, getDishByName } from "../controllers/dishController";


const router = express.Router();

router.get("/", getAllDishes);
router.get("/search", getDishByName);
router.post("/possible", findDishesByIngredients);

export default router;
