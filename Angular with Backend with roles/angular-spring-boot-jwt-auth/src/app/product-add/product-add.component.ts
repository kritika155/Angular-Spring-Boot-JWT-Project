import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DialogService } from '../service/dialog.service';
import { Product } from '../Product';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  id!: number;
  private sub: any;
  product:any;
  products!:Product[];
  isAdding=false;
  constructor(private dialogService: DialogService,  
    private formBuilder: FormBuilder,private route: ActivatedRoute, 
    private productService:ProductService,private router :Router) { 
      this.getProductsList();
    }
  
  productForm = this.formBuilder.group({
		name: '',
		price: ''
	});
	onFormSubmit() {
		this.isAdding = true;
		let name:any = this.productForm.get('name')?.value;
		let price:any = this.productForm.get('price')?.value;

		let product = new Product(this.products.length+1, name, price);
		this.productService.addProduct(product)
			.subscribe(() =>
				this.router.navigate(['product'])
			);
	}
  getProductsList(){
    this.productService.getProducts()
    .subscribe((data:any) => {
      this.products=data;
      // this.reloadPage();
    })
   }
	canDeactivate(): Observable<boolean> | boolean {
		if (!this.isAdding && this.productForm.dirty) {
			return this.dialogService.confirm('Discard unsaved Country?');
		}
		return true;
	}

}
