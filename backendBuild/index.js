"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const productService_1 = require("./services/productService");
const productRouter_1 = __importDefault(require("./routes/productRouter"));
const app = express_1.default();
const PORT = process.env.PORT || 3002;
app.use(cors_1.default());
app.use(express_1.default.json());
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running on port ${PORT}`);
    app.use('/products/', productRouter_1.default);
    yield productService_1.setAllData();
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        yield productService_1.setAllData();
    }), 300000);
}));
