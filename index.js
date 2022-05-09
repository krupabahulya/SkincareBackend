import express from "express";
//import sessionAuth from "./routes/sessionAuth.js";
import productsRouter from "./routes/productsRouter.js";
import ingredientsRouter from "./routes/ingredientsRouter.js";
import authRouter from "./routes/authRouter.js";
import routines from "./controllers/routines.js";
import "./db/index.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5050;

//app.use('/session-auth', sessionAuth);
app.use("/products", productsRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/auth", authRouter);
app.use("/routines", routines);
app.use("*", (req, res) => res.sendStatus(404));
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
