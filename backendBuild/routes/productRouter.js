"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productService_1 = require("../services/productService");
const productController_1 = require("../controllers/productController");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/gloves', (req, res) => {
    if (productService_1.glovesData.length === 0) {
        res.status(503).send("Gloves are still being loaded! Come back in a few seconds!");
    }
    else {
        utils_1.parseUrlParam(req.query.page)
            ? res.status(400).send("Parameters are invalid, please try again.")
            : res.send(productController_1.paginateProductEntryData(productService_1.glovesData, req.query.page));
    }
});
router.get('/facemasks', (req, res) => {
    if (productService_1.facemasksData.length === 0) {
        res.status(503).send("Facemasks are still being loaded! Come back in a few seconds!");
    }
    else {
        utils_1.parseUrlParam(req.query.page)
            ? res.status(400).send("Parameters are invalid, please try again.")
            : res.send(productController_1.paginateProductEntryData(productService_1.facemasksData, req.query.page));
    }
});
router.get('/beanies', (req, res) => {
    if (productService_1.beaniesData.length === 0) {
        res.status(503).send("Beanies are still being loaded! Come back in a few seconds!");
    }
    else {
        utils_1.parseUrlParam(req.query.page)
            ? res.status(400).send("Parameters are invalid, please try again.")
            : res.send(productController_1.paginateProductEntryData(productService_1.beaniesData, req.query.page));
    }
});
exports.default = router;
