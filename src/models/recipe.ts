import { Document, model, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  details: string | null;
}

export interface IRecipe extends Document {
  name: string;
  categoryId?: string;
  amount: string;
  shop: string;
  pic: string;
  latest: boolean;
  quantityAvailable: number;
  stockStatus: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    details: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const recipeSchema = new Schema<IRecipe>(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    shop: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      required: true,
    },
    latest: {
      type: Boolean,
      required: true,
      default: false,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    quantityAvailable: {
      type: Number,
      required: false,
      default: 0,
    },
    stockStatus: {
      type: String,
      required: false,
      default: "InStock"
    },
  },
  { timestamps: true }
);

const Category = model<ICategory>("category", categorySchema);
const Recipe = model<IRecipe>("recipe", recipeSchema);

export { Category, Recipe };
