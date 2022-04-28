import express from 'express';
import productsRouter from './routes/productsRouter';
import ingredientsRouter from './routes/ingredientsRouter';
import asyncHandler from './utils/asyncHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/products', productsRouter);
app.get('/ingredients', ingredientsRouter);
app.use('*', (req,res) => res.sendStatus(404));

app.listen(port, () => 
    console.log(`Server running at http://localhost:${port}`));