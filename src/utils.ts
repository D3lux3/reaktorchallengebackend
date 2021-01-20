import {  ManufacturerType, StockType } from "./types";

export const parseStockValue = (param: any): StockType => {
    const value = getStockValueFromString(param);
    if (!value || !isString(value) || !isStockType(value)) {
        console.log(value);
        throw new Error('Datapayload is invalid');
    }
    return value;
};

export const parseUrlParam = (param: any): boolean => {
   return (!param || !isString(param) || isNaN(+param));
};

export const parseManufacturerName = (param: any): ManufacturerType => {
    if (!param || !isString(param) || !isManufacturer(param)) {
        throw new Error('Manufacturer name is invalid');
    }
    return param;
};

const getStockValueFromString = (param: any): string => {
    if (!isString(param)) {
        throw new Error('Datapayload is invalid');
    }
    return param.substring(param.lastIndexOf("<INSTOCKVALUE>") + 14, param.lastIndexOf("</INSTOCKVALUE>"));
};

const isStockType = (param: any): param is StockType => {
    return Object.values(StockType).includes(param);
};


export const isString = (text: any): text is string => {
    return typeof text === 'string';
};

const isManufacturer = (param: any): param is ManufacturerType => {
    return Object.values(ManufacturerType).includes(param);
};