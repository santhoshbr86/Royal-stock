import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productSubject = new Subject()
  constructor(private http: HttpClient) { }
  
  getProducts():any {
    // return this.http.get('../../assets/resources/product.json');
    return this.http.get<Product[]>(environment.apiUrl+'/api/products');
  }

  getProductFilters():any {
    return this.http.get('../../assets/resources/product-filter.json');
  }
  getFormData():any{
    return this.http.get('../../assets/resources/add-product-form.json');
  }
  saveProduct(data:any){
    return this.http.post(environment.apiUrl+'/api/products/', data);
  }
  filterProducts(data:any) {
    return this.http.post(environment.apiUrl+'/api/products/search', data);
  }

  addToCart(id:any) {
    return this.http.post(environment.apiUrl+'/api/cart', {productId:id, quantity:1});
  }

  getCart() {
    return this.http.get(environment.apiUrl+'/api/cart').pipe(
      map((data) => {
        return data;
      })
    );
  }

  deleteProduct(id:any) {
    return this.http.delete(environment.apiUrl+'/api/products/'+id);
  }
  deleteProductFromCart(id:any){
    return this.http.delete(environment.apiUrl+'/api/cart/'+id);
  }
  updateProductInCart(id:string, product:any){
    return this.http.put(environment.apiUrl+'/api/cart/'+id, product);
  }
  // updateProduct(product:Product) {
  //   console.log(product);
  //   this.productSubject.next(product);
  // }
  getProductDetails(){
    return this.productSubject.asObservable();
  }
  updateProduct(id:any, product:any) {
    return this.http.put(environment.apiUrl+'/api/products/'+id, product)
  }
}
