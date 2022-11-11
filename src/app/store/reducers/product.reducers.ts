import { Action } from "@ngrx/store";
import { Product } from "src/app/model/product";
import * as ProductActions from '../actions/product.actions';
const intialProductState: Product = {
    name:'product1',
    _id:'32232',
    unit:'2',
    mrp:200,
    sellingPrice:180,
    PurchaseRate:180,
    brand: 'Xyz',
    category: 'general',
    quantity:12,
    stock:200,
    barcode:'2121'
}

export function reducer(state:Product[]=[], action:ProductActions.Actions){
    switch(action.type) {
        case ProductActions.LOAD_PRODUCT_SUCCESS:
            const temp = [...state, action.payload];
            return temp;
            
        case ProductActions.ADD_PRODUCT:
            return state;
            
        default:
             return state;
    }
}

