import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Product } from "src/app/model/product";

export const ADD_PRODUCT = '[PRODUCT] Add';
export const LOAD_PRODUCT = '[PRODUCT] Load';
export const LOAD_PRODUCT_SUCCESS = '[PRODUCT] Load Success';

export class LoadProduct implements Action {
    readonly type = LOAD_PRODUCT;
    constructor(){}
}

export class LoadProductSuccess implements Action {
    readonly type = LOAD_PRODUCT_SUCCESS;
    constructor(public payload:Product[]){}
}

export class AddProduct implements Action {
    readonly type = ADD_PRODUCT;
    constructor(public payload:Product){}
}

export type Actions = LoadProduct | AddProduct | LoadProductSuccess;
