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
exports.getAvailabilityData = exports.setAllData = exports.getProductsByCategory = exports.beaniesData = exports.facemasksData = exports.glovesData = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils");
const gradient_string_1 = __importDefault(require("gradient-string"));
const productBaseUrl = 'https://bad-api-assignment.reaktor.com/v2/products/';
let manufacturers = [];
const map = new Map();
exports.glovesData = [];
exports.facemasksData = [];
exports.beaniesData = [];
const getProductsByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`${productBaseUrl}${category}`);
    if (!res.data) {
        return;
    }
    manufacturers = manufacturers.concat((res.data.map(item => item.manufacturer)));
    manufacturers = [...new Set(manufacturers)];
    return res.data;
});
exports.getProductsByCategory = getProductsByCategory;
const setAllData = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.glovesData = yield getDataWithStockValue("gloves");
    exports.facemasksData = yield getDataWithStockValue("facemasks");
    exports.beaniesData = yield getDataWithStockValue("beanies");
    console.log('Data loaded');
});
exports.setAllData = setAllData;
const getDataWithStockValue = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield exports.getProductsByCategory(category);
    if (!res) {
        throw new Error(`Problem fetching given category ${category}`);
    }
    if (map.size === 0) {
        void (yield setManufactureData());
    }
    return res === null || res === void 0 ? void 0 : res.map(obj => {
        var _a;
        const id = obj.id.toUpperCase();
        return Object.assign(Object.assign({}, obj), { stock: (_a = map.get(id)) === null || _a === void 0 ? void 0 : _a.stock });
    });
});
const setManufactureData = () => __awaiter(void 0, void 0, void 0, function* () {
    const promises = manufacturers.map(manufactureName => exports.getAvailabilityData(manufactureName));
    (yield Promise.all(promises)).reduce((prev, next) => {
        return prev.concat(next);
    }).forEach(obj => {
        map.set(obj.id, obj);
    });
});
const getAvailabilityData = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.get(`https://bad-api-assignment.reaktor.com/v2/availability/${name}`);
    if (utils_1.isString(res.data.response)) {
        console.log(gradient_string_1.default.rainbow('Unwanted response from the bad-api. Trying again.'));
        return exports.getAvailabilityData(name);
    }
    return res.data.response.map(obj => {
        return {
            id: obj.id,
            manufacturer: utils_1.parseManufacturerName(name),
            stock: utils_1.parseStockValue(obj.DATAPAYLOAD)
        };
    });
});
exports.getAvailabilityData = getAvailabilityData;
