import {
  bookATable,
  checkTableAvailable,
  createTableArrangement,
  dineInPayment,
  findAllTableArrangement,
  findOneTableArrangement,
  findOneTableBookings,
  updateTableArrangement,
  updateTableBookingStatus,
} from "@/controllers/booking.controller";
import { checkAuth, authorizeRoles } from "@/middlewares/auth.middleware";
import { Router } from "express";

const bookingRoutes = Router();

bookingRoutes.post("/table-arrangement", checkAuth, authorizeRoles("ADMIN"), createTableArrangement);
bookingRoutes.get("/table-arrangements", checkAuth, authorizeRoles("ADMIN"), findAllTableArrangement);
bookingRoutes.get("/table-arrangement/:id", checkAuth, authorizeRoles("ADMIN"), findOneTableArrangement);
bookingRoutes.patch("/table-arrangement/:id", checkAuth, authorizeRoles("ADMIN"), updateTableArrangement);


bookingRoutes.post("/table-booking", checkAuth, authorizeRoles('CUSTOMER',"ADMIN"), bookATable);
bookingRoutes.post("/my", checkAuth, authorizeRoles('CUSTOMER',"ADMIN"), findOneTableBookings);
bookingRoutes.get("/available-seats", checkAuth, authorizeRoles('CUSTOMER',"ADMIN"), checkTableAvailable);
bookingRoutes.post("/table-arrangement/:id", checkAuth, authorizeRoles("ADMIN"), updateTableArrangement);
bookingRoutes.patch("/reservations/:id/status", checkAuth, authorizeRoles("ADMIN","WAITER","HR","RECEPTION"), updateTableBookingStatus);

bookingRoutes.post("/payments/:id", checkAuth, authorizeRoles("ADMIN","WAITER"), dineInPayment);

export {bookingRoutes}