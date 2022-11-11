import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductsService } from 'src/app/servicies/products.service';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import * as productActions from '../../store/actions/product.actions';

@Component({ 
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, AfterViewInit {
  addProductForm!: FormGroup;
  productFilters!:any;
  categories:any;
  brands: any;
  units: any;
  productDetails!: Product;
  constructor(private fb: FormBuilder, private store:Store<AppState>, private pService: ProductsService, private cdr: ChangeDetectorRef, @Inject(MAT_DIALOG_DATA) public data: Product) {
    
   }

  ngOnInit(): void {
    // this.pService.productSubject.subscribe((data: any) => {
    //   this.productDetails = data
    // });
    this.pService.getProductFilters().subscribe((data: any) =>{
      this.productFilters = data.filters;
      this.categories = this.productFilters.filter((fil:any) => fil.title === 'Categories')[0].items;
      this.brands = this.productFilters.filter((fil:any) => fil.title === 'Brands')[0].items;
    });
    this.pService.getFormData().subscribe((data:any) => {
      this.units = data.units
    });
    this.pService.getProductDetails().subscribe(data => {
      console.log('31', data);
    });
  }

  ngAfterViewInit(){
    this.initForm();
    this.cdr.detectChanges();
  }
  initForm(){
   
      this.addProductForm = this.fb.group({
        name:['', Validators.required],
        unit:['', Validators.required],
        mrp:['', Validators.required],
        sellingPrice:['', Validators.required],
        purchaseRate: ['', Validators.required],
        brand:['', Validators.required],
        category:['', Validators.required],
        quantity:['', Validators.required],
        stock:['', Validators.required],
        barcode:['', Validators.required]
      });
    if(Object.keys(this.data).length > 0) {
        this.addProductForm.patchValue(this.data);
    }
    
  }
  saveProduct(){
   
    if(this.addProductForm.valid && Object.keys(this.data).length === 0){
        this.store.dispatch(new productActions.AddProduct(this.addProductForm.value));
        this.pService.saveProduct(this.addProductForm.value).subscribe((res:any) => {
          console.log(res);
        })
    } else {
      const productData = {...this.addProductForm.value}
      this.pService.updateProduct(this.data._id, productData).subscribe((res:any) => {
        console.log(res);
      });
    }
  }

}
