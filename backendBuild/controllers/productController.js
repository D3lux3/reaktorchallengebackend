"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginateProductEntryData = void 0;
const paginateProductEntryData = (data, page) => {
    const pageParsed = page ? parseInt(page) : 0;
    const start = 50 * pageParsed;
    return data.slice(start, start + 50);
};
exports.paginateProductEntryData = paginateProductEntryData;
