import express, { Request, Response } from 'express';
import { productData } from '../services/productService';
import { parameterType, ProductEntry } from '../types';
import { paginateProductEntryData } from '../controllers/productController';
import { parseUrlParam } from '../utils';

const router = express.Router();

router.get('/gloves', (req: Request<unknown, unknown, unknown, parameterType>, res: Response) => {
    const glovesData: ProductEntry[] = productData.filter(product => product.type == "gloves");
    if (glovesData.length === 0) {
        res.status(503).send("Gloves are still being loaded! Come back in a few seconds!");
    } else {
        parseUrlParam(req.query.page)
            ? res.status(400).send("Parameters are invalid, please try again.")
            : res.send(paginateProductEntryData(glovesData, req.query.page));
    }
});

router.get('/facemasks', (req: Request<unknown, unknown, unknown, parameterType>, res: Response) => {
    const facemasksData: ProductEntry[] = productData.filter(product => product.type === "facemasks");
    if (facemasksData.length === 0) {
        res.status(503).send("Facemasks are still being loaded! Come back in a few seconds!");
    } else {
        parseUrlParam(req.query.page)
            ? res.status(400).send("Parameters are invalid, please try again.")
            : res.send(paginateProductEntryData(facemasksData, req.query.page));
    }
});

router.get('/beanies', (req: Request<unknown, unknown, unknown, parameterType>, res: Response) => {
    const beaniesData: ProductEntry[] = productData.filter(product => product.type === "beanies");
    if (beaniesData.length === 0) {
        res.status(503).send("Beanies are still being loaded! Come back in a few seconds!");
    } else {
        parseUrlParam(req.query.page)
            ? res.status(400).send("Parameters are invalid, please try again.")
            : res.send(paginateProductEntryData(beaniesData, req.query.page));
    }
});

export default router;