import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document {
  customerId: Schema.Types.ObjectId;
  items: {
    recipeId: Schema.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: "Pending" | "Assigned" | "OutForDelivery" | "Delivered" | "Cancelled";
  deliveryBoyId?: Schema.Types.ObjectId;
  paymentMethod: "Cash" | "Card" | "UPI" | "NetBanking";
  paymentStatus: "Pending" | "Paid";
}

const orderSchema = new Schema<IOrder>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        recipeId: {
          type: Schema.Types.ObjectId,
          ref: "recipe",
          required: true,
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Assigned", "OutForDelivery", "Delivered", "Cancelled"],
      default: "Pending",
    },
    deliveryBoyId: { type: Schema.Types.ObjectId, ref: "User" },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Card", "UPI", "NetBanking"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
