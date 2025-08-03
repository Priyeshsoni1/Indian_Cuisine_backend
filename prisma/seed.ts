// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

const prisma = new PrismaClient();
const filePath = path.join(__dirname, "../data/indian_food.csv");
async function main() {
  await prisma.dish.deleteMany(); // reset existing data

  const dishes: any[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      // Sanitize + transform data
      const ingredients = row["ingredients"]?.split(",").map((i:string) => i.trim()) ?? [];
      dishes.push({
        name: row["name"],
        ingredients,
        diet: row["diet"] || null,
        prep_time: parseInt(row["prep_time"]) || null,
        cook_time: parseInt(row["cook_time"]) || null,
        flavor_profile: row["flavor_profile"] || null,
        course: row["course"] || null,
        region: row["region"] || null,
      });
    })
    .on("end", async () => {
      await prisma.dish.createMany({ data: dishes });
      console.log("Seeded successfully!");
    });
}

main().catch(console.error);
