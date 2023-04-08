import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DialogService } from 'src/app/service/dialog.service';
import { ProductEditComponent } from 'src/app/product-edit/product-edit.component';

@Injectable()
export class CountryEditCanDeactivateGuard implements CanDeactivate<ProductEditComponent> {

  constructor(private dialogService: DialogService) { }

  canDeactivate(
    component: ProductEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    let url: string = state.url;
    console.log('Url: ' + url);

    if (!component.isUpdating && component.productForm.dirty) {
      component.isUpdating = false;
      return this.dialogService.confirm('Discard changes for Product?');
    }
    return true;
  }
}