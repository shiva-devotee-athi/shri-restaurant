import { Role, IRole } from "@/models/role";
import { Request, Response } from "express";

const createRole = async (req: Request, res: Response) => {
  try {
    const { name, role } = req.body as IRole;

    const isAlreadyExist = await Role.findOne({ $or: [{ name }, { role }] });
    if (isAlreadyExist) {
      res.status(403).json({ message: "Already Exist", status: false });
      return;
    }

    await Role.create({ name, role });
    res.status(200).json({ message: "success", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error create", status: false });
  }
};

const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;
    const data = await Role.findById(id);
    if (!data) {
      res.status(401).json({ message: "No Data FOund", status: false });
      return;
    }
    data.updateOne({ name, role });
    res
      .status(200)
      .json({ message: "updated successfully", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Update", status: false });
  }
};

const findAllRole = async (req: Request, res: Response) => {
  try {
    const data = await Role.find();
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Find All", status: false });
  }
};

const findOneRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Role.findById(id);
    if (!data) {
      res.status(401).json({ message: "No Data FOund", status: false });
      return;
    }
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Find one", status: false });
  }
};

export { createRole, updateRole, findAllRole, findOneRole };
