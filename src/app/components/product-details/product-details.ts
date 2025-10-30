import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  product!: Product;

  // ______________________________________________________________________
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  // ______________________________________________________________________
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  // ______________________________________________________________________
  handleProductDetails() {
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(theProductId).subscribe((data) => {
      this.product = data;
    });
  }
}
