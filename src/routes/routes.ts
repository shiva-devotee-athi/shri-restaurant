import { login, register } from "@/controllers/auth.controller";
import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { recipeRoutes } from "./recipe.routes";
import { bookingRoutes } from "./booking.routes";
import { orderRoutes } from "./order.routes";

const routes = Router();

// routes.post("/register", register);
// routes.post("/login", login);

routes.use("/api", authRoutes);
routes.use("/api", userRoutes);
routes.use("/api", recipeRoutes);
routes.use("/api", bookingRoutes);
routes.use("/api", orderRoutes);

export { routes };
