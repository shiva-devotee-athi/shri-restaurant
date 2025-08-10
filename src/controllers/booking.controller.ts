import { Table, ITable, Reservation } from "@/models/booking";
import { AuthenticatedRequest } from "@/types/common";
import { Request, Response } from "express";

const createTableArrangement = async (req: Request, res: Response) => {
  try {
    const { tableNumber, capacity, locationDescription, isCombinable, status } =
      req.body;

    const isAlreadyExist = await Table.findOne({ tableNumber });

    if (isAlreadyExist) {
      res.status(403).json({ message: "Already Exist", status: false });
      return;
    }

    await Table.create({
      tableNumber,
      capacity,
      locationDescription,
      isCombinable,
      status,
    });
    res.status(201).json({ message: "Created Table", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error create", status: false });
  }
};

const updateTableArrangement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { tableNumber, capacity, locationDescription, isCombinable, status } =
      req.body;
    const data = await Table.findById(id);
    if (!data) {
      res.status(401).json({ message: "No Data FOund", status: false });
      return;
    }

    await data.updateOne({
      tableNumber,
      capacity,
      locationDescription,
      isCombinable,
      status,
    });
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Update", status: false });
  }
};

const findAllTableArrangement = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1; // Example: Requesting the first page
    const limit = Number(req.query.limit) || 10; // Example: 10 documents per page
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    // if (req.query.seats) {
    //   filter.seats = { $gte: Number(req.query.seats) };
    // }

    if (req.query.seats) {
      filter.capacity = req.query.seats;
    }

    if (req.query.available !== undefined) {
      filter.latest = req.query.available === "true";
    }

    const data = await Table.find(filter).skip(skip).limit(limit);
    const count = await Table.countDocuments(filter);
    res.status(200).json({ message: "success", status: true, count, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Find All", status: false });
  }
};

const findOneTableArrangement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Table.findById(id);
    if (!data) {
      res.status(401).json({ message: "No Data Found", status: false });
      return;
    }
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Find one", status: false });
  }
};

const bookATable = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.id;
    const {
      customerId,
      tableId,
      numberOfGuests,
      bookingDate,
      timeSlot,
      status,
    } = req.body;

    // const filter: Record<string, any> = {};

    const isAlreadyExist = await Reservation.findById(tableId);

    if (isAlreadyExist) {
      res
        .status(403)
        .json({ message: "Table Is Already Booked", status: false });
      return;
    }

    await Reservation.create({
      tableId,
      numberOfGuests,
      bookingDate,
      timeSlot,
      status,
    });

    res.status(201).json({ message: "Created Table", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error create", status: false });
  }
};

const findOneTableBookings = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Reservation.findById({ customerId: id });
    if (!data) {
      res.status(401).json({ message: "No Data Found", status: false });
      return;
    }
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Find one", status: false });
  }
};

const checkTableAvailable = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { tableId } = req.query;

    // const filter: Record<string, any> = {};

    const isAlreadyExist = await Reservation.findById(tableId);

    if (isAlreadyExist) {
      res
        .status(200)
        .json({ message: "Not Available", available: false, status: true });
      return;
    }

    res
      .status(201)
      .json({ message: "Available", available: true, status: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error Available Checking", status: false });
  }
};

const updateTableBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const data = await Reservation.findById(id);
    if (!data) {
      res.status(401).json({ message: "No Data Found", status: false });
      return;
    }

    await data.updateOne({
      status,
    });
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Update", status: false });
  }
};

const dineInPayment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.id;
    const { id } = req.params;
    const { method, amount, isPaid, paidAt, txnId } = req.body;

    // const filter: Record<string, any> = {};

    const data = await Reservation.findById(id);
    if (!data) {
      res.status(401).json({ message: "No Data Found", status: false });
      return;
    }

    await data.updateOne({
      payment: {
        method,
        amount,
        isPaid,
        paidAt,
        txnId,
      },
    });

    res.status(201).json({ message: "Paid Successfully", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Paid", status: false });
  }
};

export {
  createTableArrangement,
  updateTableArrangement,
  findAllTableArrangement,
  findOneTableArrangement,
  bookATable,
  findOneTableBookings,
  checkTableAvailable,
  updateTableBookingStatus,
  dineInPayment
};
