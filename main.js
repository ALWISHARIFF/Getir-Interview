import app from "./app.js";
import dotENV from "dotenv";
import connectDb from "./db/dbConnect.js";
//Listen Api to Port

const start = (port) => {
  try {
    app.listen(port, () => {
      console.log(`API listening at ${process.env.URL}:${process.env.PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
dotENV.config();
connectDb();
start(process.env.PORT);
