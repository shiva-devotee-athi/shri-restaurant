import { Recipe } from "@/models/recipe";
import { Order } from "@/models/order";
import { Request, RequestHandler, Response } from "express";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { customerId, items, paymentMethod } = req.body;

    let totalAmount = 0;
    for (let item of items) {
      const recipe = await Recipe.findById(item.recipeId);
      if (!recipe) {
        res.status(404).json({ message: "Recipe not found" });
        return;
      }
      totalAmount += Number(recipe.amount) * item.quantity;
    }

    const order = await Order.create({
      customerId,
      items,
      totalAmount,
      paymentMethod,
      status: "Pending",
    });

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

export const assignDeliveryBoy = async (req: Request, res: Response) => {
  try {
    const { orderId, deliveryBoyId } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { deliveryBoyId, status: "Assigned" },
      { new: true }
    );
    res.json({ message: "Delivery boy assigned", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error" });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error" });
  }
};

export const markAsPaid = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: "Paid" },
      { new: true }
    );
    res.json({ message: "Payment marked as paid", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error" });
  }
};

export const getCustomerOrders = async (req: Request, res: Response) => {
  try {
    const { customerId } = req.params;
    const orders = await Order.find({ customerId })
      .populate("items.recipeId")
      .populate("deliveryBoyId", "fullName mobile");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error" });
  }
};

export const getDeliveryBoyOrders = async (req: Request, res: Response) => {
  try {
    const { deliveryBoyId } = req.params;
    const orders = await Order.find({ deliveryBoyId })
      .populate("items.recipeId")
      .populate("customerId", "fullName mobile address");
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "error" });
  }
};
