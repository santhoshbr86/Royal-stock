import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ProductsService } from 'src/app/servicies/products.service';
import { Product } from '../../model/product';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productList!: Product[];
  productListRenderer!: Product[]; 
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  constructor(private productsService: ProductsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts();
  }
  someMethod() {
    this.trigger.openMenu();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '600px',
      data: {},
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      this.getProducts();
    });
  }

  getProducts(){
    this.productsService.getProducts().subscribe((data:any) =>{
      this.productList = data;
      this.getPageList({
        length:  this.productList.length,
        pageIndex : 0,
        pageSize : 12,
        previousPageIndex : 0
      });
    });
  }

  addTocart(id:any){
    this.productsService.addToCart(id).subscribe((data:any) => {
      console.log(data);
    });
  }

  deleteProduct(id:any){
      this.productsService.deleteProduct(id).subscribe((data:any) => {
        this.getProducts()
      });
  }

  editProduct(product:any) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '600px',
      data: product,
    });
  }
  trackByFn(index:any, item:any) {
    return index; 
  }
  getPageList(event:any){
    console.log('*******', event);
    const startIndex = event.pageIndex > 0 ? event.pageSize * event.pageIndex : 0;
    const lastIndex = event.pageIndex > 0 ?  (event.pageIndex + 1) * event.pageSize : event.pageSize;
    this.productListRenderer = this.productList.slice(startIndex, lastIndex);
    
  }
}
