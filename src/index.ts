import express from 'express';
import cors from 'cors';
import { setAllData } from './services/productService';
import productRouter from './routes/productRouter';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await setAllData();
    app.use('/products/', productRouter);
    setInterval(async () => {
        await setAllData();
    }, 300000);
});




