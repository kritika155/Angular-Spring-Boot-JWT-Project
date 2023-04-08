import { Injectable } from '@angular/core';
import {Product} from '../Product'
import { of, Observable, map} from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[];
  private baseUrl = 'http://localhost:8080/products';

	
  public constructor(private http: HttpClient) {
      this.products=[
          new Product(1,'Memory Card',500),
          new Product(2,'Pen Drive',750),
          new Product(3,'Power Bank',100),
          new Product(4,'Computer',100),
          new Product(5,'Laptop',100),
          new Product(6,'Printer',100),
      ]
  }

  public getProducts(): Observable<Product[]> {
   return this.http.get<Product[]>(this.baseUrl,{responseType: 'text' as 'json'}).pipe(map((resp:any) => {
    console.log(resp);
    return JSON.parse(resp);
  }));
      // return of(this.products) ;
  }

  public getProduct(id:any): Observable<Product> {
      // let Product:any= this.products.find(i => i.id==id)
      // return of(Product);
      return this.http.get<Product[]>(this.baseUrl+'/'+id,{responseType: 'text' as 'json'}).pipe(map((resp:any) => {
        console.log(resp);
        return JSON.parse(resp);
      }));
  }
  public updateproduct(product:any): Observable<Product>{
    debugger
    return this.http.put<Product[]>(this.baseUrl+'/'+product.id,product).pipe(map((resp:any) => {
      console.log(resp);
      return resp;
    }));
  }
  public addProduct(product:any): Observable<Product>{
    return this.http.post<Product[]>(this.baseUrl,product).pipe(map((resp:any) => {
      console.log(resp);
      return resp;
    }));
  }
  public deleteProduct(id:any):Observable<Product>{
    return this.http.delete(this.baseUrl + '/' + id).pipe(map((resp: any) => {
      console.log(resp);
      return resp;
    }));
}
}