import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ProductCategory } from "../../common/product-category";
import { ProductService } from "../../services/product.service";

@Component({
	selector: "app-product-category-menu",
	standalone: true,
	imports: [RouterLink, RouterLinkActive],
	templateUrl: "./product-category-menu.html",
	styleUrl: "./product-category-menu.css",
})
export class ProductCategoryMenu {
	productCategories: ProductCategory[] = [];

	constructor(private productService: ProductService) {}

	ngOnInit() {
		this.listProductCategories();
	}

	listProductCategories() {
		this.productService.getProductCategories().subscribe((data) => {
			console.log("Product Categories = " + JSON.stringify(data));
			this.productCategories = data;
		});
	}
}
