import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddProductComponent } from './add-product/add-product.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select'
import { MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component'
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { DataViewModule } from 'primeng/dataview';
import {MatPaginatorModule} from '@angular/material/paginator';
@NgModule({
  declarations: [
    ProductListComponent,
    ProductFilterComponent,
    AddProductComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    FormsModule,
    DataViewModule
  ]
})
export class ProductsModule { }
