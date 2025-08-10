import { model, Schema, SchemaType } from "mongoose";

export interface IRole extends Document {
  name: string;
  role: string;
}

const roleSchmea = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Role = model<IRole>("Role", roleSchmea);
