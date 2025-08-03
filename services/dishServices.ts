import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const DishService = {
  async getAll() {
    return prisma.dish.findMany();
  },

  async getByName(name: string) {
    return prisma.dish.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });
  },

  async findByIngredients(userIngredients: string[]) {
    const allDishes = await prisma.dish.findMany();

    const matched = allDishes.filter((dish) =>
     dish.ingredients.every((i: string) =>
        userIngredients.map((s) => s.toLowerCase()).includes(i.toLowerCase())
      )
    );

    return matched;
  },
};
