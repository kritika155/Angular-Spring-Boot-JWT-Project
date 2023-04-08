import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../service/product.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { DialogService } from '../service/dialog.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  name:any;
  price:any;
  id!: number;
  private sub: any;
  product:any;
  productForm= {} as FormGroup;
  isUpdating=false;
  constructor(private dialogService: DialogService,  private fb: FormBuilder,private route: ActivatedRoute, private productService:ProductService,private router :Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      console.log("Id is "+this.id);
      this.productService.getProduct(this.id).subscribe((e:any)=>
      {
        this.product =e
        console.log(this.product);
        this.name=this.product?.name;
        this.price=this.product?.price;
        this.createForm(e);
      }
      );
  // In a real app: dispatch action to load the details here.
   });
  }
  createForm(product: any | undefined) {
		// this.personForm = this.formBuilder.group({
		// 	fname: new FormControl(person?.name),
		// 	city: new FormControl(person?.city)
		// });
		this.productForm = new FormGroup({
			fname: new FormControl(product?.name),
			price: new FormControl(product?.price),
		  });
		console.log("productForm:",this.productForm.value);
	}
	onFormSubmit() {
		this.isUpdating = true;
    this.product.id=this.product.id;
		this.product.name = this.productForm.get('fname')?.value;
		this.product.price = this.productForm.get('price')?.value;
    console.log("The value to be updated:",this.product);
    this.productService.updateproduct(this.product)
    .subscribe((data:any) =>
      {console.log(data);
        this.router.navigate(['product'])}
    );
	}
  canDeactivate(): Observable<boolean> | boolean {
		if (!this.isUpdating && this.productForm.dirty) {
			this.isUpdating = false;
			return this.dialogService.confirm('Discard changes for Product?');
		}
		return true;
	}
  reloadPage() {
    window.location.reload();
 }
 changeName(name:any){
  this.name=name;
 }
 changePrice(price:any){
  this.price=price;
 }
}
