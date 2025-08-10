import express, { Express, Application, Response, Request } from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "@/database/database";
import { routes } from "@/routes/routes";
import { createAdmin, createCategories, createRoles } from "@/functions/initialCreation";
import { authRoutes } from "@/routes/auth.routes";
import { createRecipes } from "./functions/recipeCreation";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
connection();
// createRoles();
// createAdmin();
// createCategories();
// createRecipes()

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Hii Hello, shri");
});
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
