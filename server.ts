// server.ts
import express from "express";
import cors from "cors";
import router from "./routes/recipeRoutes";


const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use("/api/dishes", router);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
