import { createDepartment, createDesignation, findAllDepartment, findAllDesignation, findOneDepartment, findOneDesignation, updateDepartment, updateDesignation } from "@/controllers/department.controller";
import {
  createUser,
  findAllUser,
  findOneUser,
  updateProfile,
  updateUser,
} from "@/controllers/user.controller";
import { checkAuth, authorizeRoles } from "@/middlewares/auth.middleware";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/users", checkAuth, authorizeRoles("ADMIN"), createUser);
userRoutes.get("/users", checkAuth, authorizeRoles("ADMIN"), findAllUser);
userRoutes.get("/users/:id", checkAuth, authorizeRoles("ADMIN"), findOneUser);
userRoutes.patch("/users/:id", checkAuth, authorizeRoles("ADMIN"), updateUser);
userRoutes.patch("/profile", checkAuth, authorizeRoles("CUSTOMER"), updateProfile);



userRoutes.post("/department", checkAuth, authorizeRoles("ADMIN"), createDepartment);
userRoutes.get("/departments", checkAuth, authorizeRoles("ADMIN"), findAllDepartment);
userRoutes.get("/department/:id", checkAuth, authorizeRoles("ADMIN"), findOneDepartment);
userRoutes.patch("/department/:id", checkAuth, authorizeRoles("ADMIN"), updateDepartment);


userRoutes.post("/designation", checkAuth, authorizeRoles("ADMIN"), createDesignation);
userRoutes.get("/designations", checkAuth, authorizeRoles("ADMIN"), findAllDesignation);
userRoutes.get("/designation/:id", checkAuth, authorizeRoles("ADMIN"), findOneDesignation);
userRoutes.patch("/designation/:id", checkAuth, authorizeRoles("ADMIN"), updateDesignation);
export { userRoutes };
