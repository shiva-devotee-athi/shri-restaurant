import { Document, model, Schema } from "mongoose";

export enum TableStatus {
  AVAILABLE = "Available",
  OCCUPIED = "Occupied",
  MAINTENANCE = "Maintenance",
}

export enum ReservationStatus {
  PENDING = "Pending",
  CONFIRMED = "Confirmed",
  CANCELLED = "Cancelled",
  NOSHOW = "No-Show",
  SEATED = "Seated",
  COMPLETED = "Completed",
}

export interface ITable extends Document {
  tableNumber: string;
  capacity: number;
  locationDescription: string;
  isCombinable: boolean;
  //   combinationTable: string[];
  status: TableStatus;
}

export interface IReservation extends Document {
  customerId?: string;
  numberOfGuests: number;
  tableId?: string;
  bookingDate: string;
  timeSlot: string;
  specialRequests: string | null;
  status: ReservationStatus;
  payment: IPayment | null;

  //   combinationTable: string[];
}

interface IPayment {
  method: "card" | "upi" | "cash";
  amount: number;
  isPaid: boolean;
  paidAt: string;
  txnId: string;
}

const tableSchema = new Schema<ITable>(
  {
    tableNumber: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    locationDescription: {
      type: String,
      required: false,
    },
    isCombinable: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      enum: TableStatus,
      default: TableStatus.AVAILABLE,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const reservationSchema = new Schema<IReservation>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      default: 0,
    },
    tableId: {
      type: Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    bookingDate: {
      type: String,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
    },
    specialRequests: {
      type: String,
      required: false,
    },
    payment: {
      method: {
        type: String,
        enum: ["card", "upi", "cash"],
        required: true,
      },
      amount: { type: Number, required: true },
      isPaid: { type: Boolean, default: false },
      paidAt: { type: Date, required: true },
      txnId: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ReservationStatus,
      default: ReservationStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

const Table = model<ITable>("table", tableSchema);
const Reservation = model<IReservation>("reservation", reservationSchema);

export { Table, Reservation };
