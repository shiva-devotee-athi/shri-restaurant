import { IRole } from "@/models/role";
import { User } from "@/models/user";
import { AuthenticatedRequest, RoleEnum } from "@/types/common";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface JwtHashType {
  role?: string; // You can replace 'any' with your actual user type
  id: string;
  fullName: string;
  email: string;
  mobile?: string;
  createdBy?: string;
}

const JWT_HASH = process.env.JWT_HASH || "";

console.log(JWT_HASH);

const checkAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!authHeader || !token) {
      res.status(403).send({
        auth: false,
        message: "No Token Provided.",
      });
      return;
    }

    const decodedToken = jwt.verify(token, JWT_HASH) as JwtHashType;
    const user = await User.findById(decodedToken.id)
      .select("_id fullName email mobile role")
      .populate<{ roleId: IRole }>("roleId");

    if (!user) {
      res.status(403).send({
        auth: false,
        message: "User Not Found.",
      });
      return;
    }
    req.id = user._id.toString();
    req.fullName = user.fullName;
    req.email = user.email;
    req.mobile = user.mobile;
    req.role = user.roleId.role;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(401)
      .json({ message: "Invalid or Expired Token", status: false });
  }
};

const authorizeRoles = (...allowedRoles: RoleEnum[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.role || !allowedRoles.includes(req.role.toUpperCase())) {
      res.status(403).json({
        message: "You do not have permission to access this resource",
        status: false,
      });
      return;
    }
    next();
  };
};

export { checkAuth, authorizeRoles };
