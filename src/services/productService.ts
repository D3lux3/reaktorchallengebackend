import axios from 'axios';
import { CategoryProductEntry, StockEntry, BadApiResponse, ProductEntry } from '../types';
import { parseManufacturerName, parseStockValue, isString } from '../utils';
import gradient from 'gradient-string';

const productBaseUrl = 'https://bad-api-assignment.reaktor.com/v2/products/';

let manufacturers: string[] = [];
const map = new Map<string, StockEntry>();

export let glovesData: ProductEntry[] = [];
export let facemasksData: ProductEntry[] = [];
export let beaniesData: ProductEntry[] = [];

export const getProductsByCategory = async (category: string): Promise<CategoryProductEntry[] | undefined> => {
    const res = await axios.get<CategoryProductEntry[]>(`${productBaseUrl}${category}`);
    if (!res.data) {
        return;
    }
    manufacturers = manufacturers.concat((res.data.map(item => item.manufacturer)));
    manufacturers = [...new Set(manufacturers)];
    return res.data;
};

export const setAllData = async (): Promise<void> => {
    glovesData = await getDataWithStockValue("gloves");
    facemasksData = await getDataWithStockValue("facemasks");
    beaniesData = await getDataWithStockValue("beanies");
    console.log('Data loaded');
};

const getDataWithStockValue = async (category: string): Promise<ProductEntry[]> => {
    const res = await getProductsByCategory(category);
    if (!res) {
        throw new Error(`Problem fetching given category ${category}`);
    }
    if (map.size === 0) {
        void await setManufactureData();
    }
    return res?.map(obj => {
        const id = obj.id.toUpperCase();
        return {
            ...obj,
            stock: map.get(id)?.stock
        };
    });
};

const setManufactureData = async (): Promise<void> => {
    const promises = manufacturers.map(manufactureName => getAvailabilityData(manufactureName));
    (await Promise.all(promises)).reduce((prev, next) => {
        return prev.concat(next);
    }).forEach(obj => {
        map.set(obj.id, obj);
    });
};

export const getAvailabilityData = async (name: string): Promise<StockEntry[]> => {
    const res = await axios.get<BadApiResponse>(`https://bad-api-assignment.reaktor.com/v2/availability/${name}`);
    if (isString(res.data.response)) {
        console.log(gradient.rainbow('Unwanted response from the bad-api. Trying again.'));
        return getAvailabilityData(name);
    }
    return res.data.response.map(obj => {
        return {
            id: obj.id,
            manufacturer: parseManufacturerName(name),
            stock: parseStockValue(obj.DATAPAYLOAD)
        };
    });
};
