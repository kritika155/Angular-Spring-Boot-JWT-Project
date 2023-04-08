import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {
id!: number;
  private sub: any;
  product:any;
  
  constructor(private route: ActivatedRoute, private productService:ProductService,private router :Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log("Id is "+this.id);
      this.productService.getProduct(this.id).subscribe((e:any)=>
      this.product =e
      );
      console.log("Product is "+this.product);

      // In a real app: dispatch action to load the details here.
   });
  }
}
