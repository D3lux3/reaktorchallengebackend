"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isString = exports.parseManufacturerName = exports.parseUrlParam = exports.parseStockValue = void 0;
const types_1 = require("./types");
const parseStockValue = (param) => {
    const value = getStockValueFromString(param);
    if (!value || !exports.isString(value) || !isStockType(value)) {
        console.log(value);
        throw new Error('Datapayload is invalid');
    }
    return value;
};
exports.parseStockValue = parseStockValue;
const parseUrlParam = (param) => {
    return (!param || !exports.isString(param) || isNaN(+param));
};
exports.parseUrlParam = parseUrlParam;
const parseManufacturerName = (param) => {
    if (!param || !exports.isString(param) || !isManufacturer(param)) {
        throw new Error('Manufacturer name is invalid');
    }
    return param;
};
exports.parseManufacturerName = parseManufacturerName;
const getStockValueFromString = (param) => {
    if (!exports.isString(param)) {
        throw new Error('Datapayload is invalid');
    }
    return param.substring(param.lastIndexOf("<INSTOCKVALUE>") + 14, param.lastIndexOf("</INSTOCKVALUE>"));
};
const isStockType = (param) => {
    return Object.values(types_1.StockType).includes(param);
};
const isString = (text) => {
    return typeof text === 'string';
};
exports.isString = isString;
const isManufacturer = (param) => {
    return Object.values(types_1.ManufacturerType).includes(param);
};
