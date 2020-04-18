import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { element } from 'protractor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList: Product[];

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .snapshotChanges()
      .subscribe(items => {
        this.productList = [];
        items.forEach(element => {
          let data = element.payload.toJSON();
          data['$key'] = element.key;
          this.productList.push(data as Product);
        })
      });
  }

  onEdit(product: Product){
    this.productService.selectedProduct = Object.assign({}, product);
  }

  onDelete($key: string){
    if (confirm('Are you sure on delete it?')) {
      this.productService.deleteProduct($key);
      this.toastr.success('Successfull Operation', 'Product delete')
    }
  }

}
