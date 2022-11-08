import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/servicies/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  panelOpenState = false;
  totalCost: number = 0;
  cartItems:any = [];
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    // this.cartItems.push()
    this.getCartItems();
  
    // this.productService =

  }
  getCartItems(){
    this.productService.getCart().subscribe(res => {
      this.cartItems = res;
      this.getTotalCost();
    });
  }
  incrementValue(id:string){
    this.cartItems = this.cartItems.map((pro: any) => {
      if(pro._id === id && pro.quantity>=1){
        pro.quantity++;
      }
      return pro;
    });
    const cartItem = this.cartItems.filter((item:any) => item._id === id)
    this.productService.updateProductInCart(id,cartItem).subscribe(product => {
      this.getCartItems();
    });
  }
  decrementValue(id:string){
    this.cartItems = this.cartItems.map((pro: any) => {
      if(pro._id === id){
        pro.quantity === 1 ? pro.quantity : pro.quantity--;
      }
      return pro;
    });
    this.getTotalCost();
  }
  getTotalCost() {
    let total= 0;
    this.totalCost  = this.cartItems.reduce((total:number, pro:any) => total += pro.price*pro.quantity,0);
    console.log(this.totalCost);
  }
  deleteProduct(id:string){
    this.productService.deleteProductFromCart(id).subscribe( d => this.getCartItems())
  }
  
}
