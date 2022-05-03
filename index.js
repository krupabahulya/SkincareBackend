import express from "express";
import products from "./controllers/products.js";
import ingredientsRouter from "./routes/ingredientsRouter.js";
import "./db/index.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5050;

app.use("/products", products);
app.use("/ingredients", ingredientsRouter);
app.use("*", (req, res) => res.sendStatus(404));

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
