import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectStr = process.env.connection || "";

const connection = () =>
  mongoose
    .connect(`${connectStr}`)
    .then(() => {
      console.log("Connection Established successfully");
    })
    .catch((err) => {
      console.error(err);
    });

export { connection };
