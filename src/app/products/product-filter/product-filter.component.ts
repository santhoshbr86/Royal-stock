import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { ProductsService } from '../../servicies/products.service';
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {
  productFilters:any = [];
  filters:any = {
    categories:[],
    brands:[]
  };
  constructor(private pService: ProductsService) { }

  ngOnInit(): void {
    this.pService.getProductFilters().subscribe((data: any) =>{
      this.productFilters = data.filters;
    });
  }

  onFilterChange(event:any, cat:any, item: any) {
    switch(cat) {
      case 'Categories':  if(event.checked) {
                              if(!this.filters.categories.includes(item)) {
                                 this.filters.categories.push(item);
                              }
                            } else {
                              this.filters.categories.splice(this.filters.categories.indexOf(item),1);
                            }
                          break;

      case 'Brands':  if(event.checked) {
                      if(!this.filters.brands.includes(item)){
                         this.filters.brands.push(item);
                       }
                      }else{
                        this.filters.brands.splice(this.filters.brands.indexOf(item),1);
                      }
                      break;
      default: break;
    }
  }
  filterProducts(){
    this.pService.filterProducts(this.filters).subscribe(data => {
      this.pService.productSubject.next(data);
    })
  }

}
