import { Request, Response } from "express";
import { DishService } from "../services/dishServices";


export async function getAllDishes(req: Request, res: Response) {
  try {
    const pageIndex = parseInt(req.query.pageIndex as string) || 0;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const dishes = await DishService.getAll({ pageIndex, pageSize });
    res.json(dishes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch dishes" });
  }
}


// controllers/DishController.ts
export async function getDishSuggestions(req: Request, res: Response) {
  const { q } = req.query;
  if (!q || typeof q !== "string") return res.status(400).json({ error: "Query is required" });
console.log(q,"query")
  try {
    const results = await DishService.findSuggestions(q);
    res.json(results);
  } catch (err) {
    console.error("Suggestion Error:", err);
    res.status(500).json({ error: "Server error" });
  }
}


export async function findDishesByIngredients(req: Request, res: Response) {
  const { ingredients } = req.body;
  if (!Array.isArray(ingredients)) return res.status(400).json({ error: "ingredients must be an array" });

  const dishes = await DishService.findByIngredients(ingredients);
  res.json(dishes);
}

export async function getDishById(req: Request, res: Response) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Dish ID is required" });
const idNum=parseInt(id)
  try {
    const dish = await DishService.getById(idNum);
    if (!dish) return res.status(404).json({ error: "Dish not found" });
    res.json(dish);
  } catch (err) {
    res.status(500).json({ error: "Something Get Dish went wrong" });
  }
}
