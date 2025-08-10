import { Router } from "express";
import {
  assignDeliveryBoy,
  updateOrderStatus,
  markAsPaid,
  getCustomerOrders,
  getDeliveryBoyOrders,
  placeOrder,
} from "@/controllers/order.controller";
import { authorizeRoles, checkAuth } from "@/middlewares/auth.middleware";

const orderRoutes = Router();

orderRoutes.post("/placeOrder", checkAuth, authorizeRoles("CUSTOMER"), placeOrder);
orderRoutes.post("/assign", checkAuth, authorizeRoles("CUSTOMER"), assignDeliveryBoy);
orderRoutes.post("/update-status", checkAuth, authorizeRoles("CUSTOMER"), updateOrderStatus);
orderRoutes.post("/mark-paid", checkAuth, authorizeRoles("CUSTOMER"), markAsPaid);
orderRoutes.get("/customer/:customerId", checkAuth, authorizeRoles("CUSTOMER"), getCustomerOrders);
orderRoutes.get("/delivery-boy/:deliveryBoyId", checkAuth, authorizeRoles("CUSTOMER"), getDeliveryBoyOrders);

export { orderRoutes };
