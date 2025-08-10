import { login, register } from "@/controllers/auth.controller";
import { createRole, findAllRole, findOneRole, updateRole } from "@/controllers/role.controller";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/admin-login", login);
authRoutes.post("/login", login);
authRoutes.post("/register", register);

authRoutes.post("/roles", createRole);
authRoutes.get("/roles", findAllRole);
authRoutes.get("/roles/:id", findOneRole);
authRoutes.patch("/roles/:id", updateRole);


export { authRoutes };
