import express from 'express';
import productsRouter from './routes/productsRouter.js';
import ingredientsRouter from './routes/ingredientsRouter.js';
import asyncHandler from './utils/asyncHandler.js';
import './db/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/products', productsRouter);
app.use('/ingredients', ingredientsRouter);
app.use('*', (req,res) => res.sendStatus(404));

app.listen(port, () => 
    console.log(`Server running at http://localhost:${port}`));