export interface ProductEntry extends CategoryProductEntry {
    stock: StockType | undefined;
}

export interface CategoryProductEntry {
    id: string,
    type: ProductType,
    name: string,
    color: string[],
    price: number,
    manufacturer: string,
}

export interface parameterType {
    page?: string;
}

export interface StockEntry {
    id: string,
    manufacturer: ManufacturerType,
    stock: StockType;
}

export interface BadApiObject {
    id: string,
    DATAPAYLOAD: string
}

export interface BadApiResponse {
    code: number,
    response: BadApiObject[] | string
}

export type ProductType = "gloves" | "facemasks" | "beanies";

export enum StockType {
    instock = "INSTOCK",
    lessthanten = "LESSTHAN10",
    outofstock = "OUTOFSTOCK"
}

export enum ManufacturerType {
    juuran = "juuran",
    ippal = "ippal",
    umpante = "umpante",
    abiplos = "abiplos",
    okkau = "okkau",
    laion = "laion",
    hennex = "hennex",
    niksleh = "niksleh"
}
