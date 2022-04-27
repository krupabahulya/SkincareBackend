import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get('/', (req,res) => {
    res.send('Products API')
});

app.listen(port, () => 
    console.log(`Server running at http://localhost:${port}`));