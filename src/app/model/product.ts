export interface Product {
    name:string;
    _id?:string;
    unit:string,
    mrp:number,
    sellingPrice:number,
    PurchaseRate:number,
    brand: string,
    category: string,
    quantity:number,
    stock?:number,
    barcode?:string 
}