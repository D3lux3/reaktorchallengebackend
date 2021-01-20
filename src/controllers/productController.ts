import { ProductEntry } from "../types";

export const paginateProductEntryData = (data: ProductEntry[], page?: string): ProductEntry[] => {
    const pageParsed = page ? parseInt(page) : 0;
    const start = 50 * pageParsed;
    return data.slice(start, start + 50);
};
