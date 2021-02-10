import axios from 'axios';
import { BadApiResponse, StockEntry } from '../types';
import { isString, parseManufacturerName, parseStockValue } from '../utils';

const availabilityBaseUrl = "https://bad-api-assignment.reaktor.com/v2/availability/";

/**
 * Fetches all availability data for manufacturer, and returns the data in a map for O(1) access.
 * @param manufactureName 
 */
export const getAvailabilityData = async (manufactureName: string): Promise<Map<string, StockEntry>> => {
    const map = new Map<string, StockEntry>();
    const res = await axios.get<BadApiResponse>(`${availabilityBaseUrl}${manufactureName}`);
    if (isString(res.data.response)) {
        console.log(('Unwanted response from the bad-api. Trying again.'));
        return getAvailabilityData(manufactureName);
    }
    res.data.response.map(obj => {
        map.set(obj.id.toLowerCase(), {
            id: obj.id.toLowerCase(),
            manufacturer: parseManufacturerName(manufactureName),
            stock: parseStockValue(obj.DATAPAYLOAD)
        });
    });
    return map;
};


