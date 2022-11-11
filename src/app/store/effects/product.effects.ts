import * as ProductActions from '../actions/product.actions';
import { ProductsService } from 'src/app/servicies/products.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, Observable, switchMap , catchError} from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class ProductEffects {

    constructor(
        private action$: Actions,
        private productService: ProductsService
    ){ }
    
    loadProducts$ = createEffect(():any => {
        return this.action$.pipe(
            ofType(ProductActions.LOAD_PRODUCT),
            switchMap(()=> this.productService.getProducts()
            .pipe(
                map(products => {
                   return {type: ProductActions.LOAD_PRODUCT_SUCCESS, payload:products}
            })
            // catchError(error => {
            //     console.log(error)
            // })
            )))
    });  
   
}