import { Category, ICategory, IRecipe, Recipe } from "@/models/recipe";
import { Request, Response } from "express";

const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, details } = req.body as ICategory;

    const isAlreadyExist = await Category.findOne({ name });
    console.log(isAlreadyExist);

    if (isAlreadyExist) {
      res.status(403).json({ message: "Already Exist", status: false });
    }

    await Category.create({ name, details });
    res.status(201).json({ message: "Created Category", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error create", status: false });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  console.log(req.params.id, req.body);
  try {
    const { id } = req.params;
    const { name, details } = req.body;
    const data = await Category.findById(id);
    if (!data) {
      res.status(401).json({ message: "No Data FOund", status: false });
      return;
    }

    await data.updateOne({
      name,
      details,
    });
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Update", status: false });
  }
};

const findAllCategory = async (req: Request, res: Response) => {
  try {
    const data = await Category.find();
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Find All", status: false });
  }
};

const findOneCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Category.findById(id);
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

const createRecipe = async (req: Request, res: Response) => {
  try {
    const { name, categoryId, amount, shop, pic, latest, quantityAvailable } =
      req.body as IRecipe;

    const isAlreadyExist = await Recipe.findOne({ name });
    console.log(isAlreadyExist);

    if (isAlreadyExist) {
      res.status(403).json({ message: "Already Exist", status: false });
    }

    await Recipe.create({
      name,
      categoryId,
      amount,
      shop,
      pic,
      latest,
      quantityAvailable,
    });
    res.status(201).json({ message: "Created Recipe", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error create", status: false });
  }
};

const updateRecipe = async (req: Request, res: Response) => {
  console.log(req.params.id, req.body);
  try {
    const { id } = req.params;
    const { name, categoryId, amount, shop, pic, latest, quantityAvailable } =
      req.body;
    const data = await Recipe.findById(id);
    if (!data) {
      res.status(401).json({ message: "No Data FOund", status: false });
      return;
    }

    await data.updateOne({
      name,
      categoryId,
      amount,
      shop,
      pic,
      latest,
      quantityAvailable,
    });
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Update", status: false });
  }
};

const findAllRecipe = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1; // Example: Requesting the first page
    const limit = Number(req.query.limit) || 10; // Example: 10 documents per page
    const skip = (page - 1) * limit;

    const filter: Record<string, any> = {};

    if (req.query.name) {
      filter.name = { $regex: req.query.name as string, $options: "i" };
    }

    if (req.query.categoryId) {
      filter.categoryId = req.query.categoryId;
    }

    if (req.query.amount) {
      filter.amount = req.query.amount;
    }

    if (req.query.shop) {
      filter.shop = { $regex: req.query.shop as string, $options: "i" };
    }

    if (req.query.latest !== undefined) {
      filter.latest = req.query.latest === "true";
    }

    if (req.query.quantityAvailable) {
      filter.quantityAvailable = { $gte: Number(req.query.quantityAvailable) };
    }

    const data = await Recipe.find(filter).skip(skip).limit(limit).exec();
    let count = 0;
    count = await Recipe.countDocuments(filter);
    res.status(200).json({ message: "success", status: true, data, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Find All", status: false });
  }
};

const findOneRecipe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Recipe.findById(id);
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
  createCategory,
  updateCategory,
  findAllCategory,
  findOneCategory,
  createRecipe,
  updateRecipe,
  findAllRecipe,
  findOneRecipe,
};
