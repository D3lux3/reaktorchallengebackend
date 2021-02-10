import axios from 'axios';
import { ProductEntry } from '../types';
import { getAvailabilityData } from './availabilityService';

const productBaseUrl = 'https://bad-api-assignment.reaktor.com/v2/products/';
const categories: string[] = ["gloves", "facemasks", "beanies"];
export let productData: ProductEntry[] = [];

/**
 * Gets the data by category from the bad-api.
 * @param category 
 */
export const getProductsWithoutStock = async (category: string): Promise<ProductEntry[]> => {
    const res = await axios.get<ProductEntry[]>(`${productBaseUrl}${category}`);
    return res.data;
};

/**
 * Combines the product data with availability data.
 */
export const getProductAndAvailability = async (): Promise<void> => {
    const categoryPromises = categories.map(category => getProductsWithoutStock(category));
    productData = (await Promise.all(categoryPromises)).reduce((prev, next) => prev.concat(next));


    const manufactureNames = [...new Set(productData.map(p => p.manufacturer))];
    const manufacturerPromises = manufactureNames.map(name => getAvailabilityData(name));
    const availabilityData = (await Promise.all(manufacturerPromises)).reduce((prev, next) => prev = new Map([...prev, ...next]));
    
    productData = productData?.map(product => {
        return {
            ...product,
            stock: availabilityData.get(product.id)?.stock
        };
    });
    console.log('Data loaded');
};

