import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const jwtKey = process.env.JWT_HASH || "";

interface AuthenticatedRequest extends Request {
  user?: any; // You can replace 'any' with your actual user type
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Authorization Failed");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trim();
    }

    const verified = jwt.verify(token, jwtKey);
    req.user = verified;
    next();
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// const authorizeRoles = (...allowedRoles: RoleType[]) => {
//   return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     if (!allowedRoles.includes(req.user.role)) {
//       return res.status(403).json({ message: "Forbidden" });
//     }
//     next();
//   };
// };

module.exports = verifyToken;
