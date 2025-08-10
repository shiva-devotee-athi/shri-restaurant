import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "@/models/user";
dotenv.config();
const jwtKey = process.env.JWT_HASH || "";

interface IJWTDecode {
  id: string;
  fullName: string;
  email: string | null;
  mobile: string;
  role: string;
}

const createjwt = (data: IJWTDecode) => {
  const token = jwt.sign(
    {
      id: data.id,
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile,
      role: data.role,
    },
    jwtKey,
    {
      expiresIn: "15d",
    }
  );
  return "Bearer " + token;
};

export { createjwt };
