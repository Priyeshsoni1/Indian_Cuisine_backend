import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const DishService = {
async getAll({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) {
  const skip = pageIndex * pageSize;
  const take = pageSize;

  const [dishes, totalCount] = await Promise.all([
    prisma.dish.findMany({
      skip,
      take,
     
    }),
    prisma.dish.count(),
  ]);

  return {
    data: dishes,
    pageIndex,
    pageSize,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
},


  async getByName(name: string) {
    return prisma.dish.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });
  },
  async getById(id: number) {
    return prisma.dish.findUnique({
      where: { id }, // assumes `id` is the PK
    });
  },
  async findSuggestions(query: string) {
    return prisma.dish.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { region: { contains: query, mode: "insensitive" } },
          // { ingredients: { hasSome: [query] } }, // if ingredients is a string array
        ],
      },
      take: 10,
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
