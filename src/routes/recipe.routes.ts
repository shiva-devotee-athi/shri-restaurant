import {
  createCategory,
  createRecipe,
  findAllCategory,
  findAllRecipe,
  findOneCategory,
  findOneRecipe,
  updateCategory,
  updateRecipe,
} from "@/controllers/recipe.controller";
import { checkAuth, authorizeRoles } from "@/middlewares/auth.middleware";
import { Router } from "express";

const recipeRoutes = Router();

recipeRoutes.post("/category", checkAuth, authorizeRoles("ADMIN"), createCategory);
recipeRoutes.get("/categories", checkAuth, authorizeRoles("ADMIN"), findAllCategory);
recipeRoutes.get("/category/:id", checkAuth, authorizeRoles("ADMIN"), findOneCategory);
recipeRoutes.patch("/category/:id", checkAuth, authorizeRoles("ADMIN"), updateCategory);


recipeRoutes.post("/recipe", checkAuth, authorizeRoles("ADMIN"), createRecipe);
recipeRoutes.get("/recipes", checkAuth, authorizeRoles("ADMIN"), findAllRecipe);
recipeRoutes.get("/recipe/:id", checkAuth, authorizeRoles("ADMIN"), findOneRecipe);
recipeRoutes.patch("/recipe/:id", checkAuth, authorizeRoles("ADMIN"), updateRecipe);

export {recipeRoutes}