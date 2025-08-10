import {
  Department,
  Designation,
  IDepartment,
  IDesignation,
} from "@/models/user";
import { Request, Response } from "express";

const createDepartment = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body as IDepartment;

    const isAlreadyExist = await Department.findOne({ name });
    console.log(isAlreadyExist);

    if (isAlreadyExist) {
      res.status(403).json({ message: "Already Exist", status: false });
    }

    await Department.create({ name, description });
    res.status(201).json({ message: "Created Department", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error create", status: false });
  }
};

const updateDepartment = async (req: Request, res: Response) => {
  console.log(req.params.id, req.body);
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const data = await Department.findById(id);
    if (!data) {
      res.status(401).json({ message: "No Data FOund", status: false });
      return;
    }

    await data.updateOne({
      name,
      description,
    });
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Update", status: false });
  }
};

const findAllDepartment = async (req: Request, res: Response) => {
  try {
    const data = await Department.find();
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Find All", status: false });
  }
};

const findOneDepartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Department.findById(id);
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

const createDesignation = async (req: Request, res: Response) => {
  try {
    const { name, description, departmentId, level } = req.body as IDesignation;

    const isAlreadyExist = await Designation.findOne({ name });
    if (isAlreadyExist) {
      res.status(403).json({ message: "Already Exist", status: false });
    }

    await Designation.updateMany(
      { level: { $gte: level } },
      { $inc: { level: 1 } }
    );

    const newDesignation =  await Designation.create({
      name,
      description,
      departmentId,
      level,
    });
    res.status(201).json({ message: "Created Designation", data:newDesignation, status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error create", status: false });
  }
};

const updateDesignation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, departmentId, level } = req.body;
    const data = await Designation.findById(id);
    if (!data) {
      res.status(401).json({ message: "No Data Found", status: false });
      return;
    }

    await data.updateOne({
      name,
      description,
      departmentId,
      level,
    });

    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Update", status: false });
  }
};

const findAllDesignation = async (req: Request, res: Response) => {
  try {
    const data = await Designation.find();
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Find All", status: false });
  }
};

const findOneDesignation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Designation.findById(id).populate("departmentId");
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

export {
  createDepartment,
  updateDepartment,
  findAllDepartment,
  findOneDepartment,
};
export {
  createDesignation,
  updateDesignation,
  findAllDesignation,
  findOneDesignation,
};
