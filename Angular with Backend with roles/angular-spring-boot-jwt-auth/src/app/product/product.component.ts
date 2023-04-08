import { Component } from '@angular/core';
import { ProductService } from '../service/product.service';
import { Product } from '../Product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  products!:Product[];
   constructor(private productService: ProductService){
   
   }
 
   ngOnInit() {
    this.getProductsList();
    
   }
   getProductsList(){
    this.productService.getProducts()
    .subscribe((data:any) => {
      this.products=data;
      // this.reloadPage();
    })
   }
   reloadPage() {
    window.location.reload();
 }
 deleteProduct(id:any){
  this.productService.deleteProduct(id).subscribe((data:any)=>{
    alert(data);
  });
 }
}
