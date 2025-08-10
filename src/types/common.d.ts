import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  role?: any; // You can replace 'any' with your actual user type
  id?: string;
  fullName?: string;
  email?: string | null;
  mobile?: string;
  createdBy?: string;
}

export type RoleEnum =
  | "ADMIN"
  | "WAITER"
  | "CHEF"
  | "CUSTOMER"
  | "DELIVERY"
  | "SECURITY"
  | "MANAGER"
  | "HR"
  | "RECEPTION"
  | "OWNER";