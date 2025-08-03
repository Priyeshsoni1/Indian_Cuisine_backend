import { Request, Response } from "express";
import { DishService } from "../services/dishServices";


export async function getAllDishes(req: Request, res: Response) {
  const dishes = await DishService.getAll();
  res.json(dishes);
}

export async function getDishByName(req: Request, res: Response) {
  const { name } = req.query;
  if (!name || typeof name !== "string") return res.status(400).json({ error: "Name is required" });

  const dish = await DishService.getByName(name);
  if (!dish) return res.status(404).json({ message: "Dish not found" });
  res.json(dish);
}

export async function findDishesByIngredients(req: Request, res: Response) {
  const { ingredients } = req.body;
  if (!Array.isArray(ingredients)) return res.status(400).json({ error: "ingredients must be an array" });

  const dishes = await DishService.findByIngredients(ingredients);
  res.json(dishes);
}
