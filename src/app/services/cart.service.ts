import { Injectable } from "@angular/core";
import { CartItem } from "../common/cart-item";
import { Subject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class CartService {
	cartItems: CartItem[] = [];

	totalPrice: Subject<number> = new Subject<number>();
	totalQuantity: Subject<number> = new Subject<number>();

	// ______________________________________________________________________
	addToCart(theCartItem: CartItem) {
		const existingCartItem = this.cartItems.find(
			(tempCartItem) => tempCartItem.id === theCartItem.id,
		);

		if (existingCartItem) {
			existingCartItem.quantity++;
		} else {
			this.cartItems.push(theCartItem);
		}

		this.computeCartTotals();
	}

	// ______________________________________________________________________
	computeCartTotals() {
		let totalPriceValue: number = 0;
		let totalQuantityValue: number = 0;

		for (let currentCartItem of this.cartItems) {
			totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
			totalQuantityValue += currentCartItem.quantity;
		}

		// * INFO: publish the new values ... all subscribers will receive the new data
		this.totalPrice.next(totalPriceValue);
		this.totalQuantity.next(totalQuantityValue);

		// * INFO: log cart data just for debugging purposes
		this.logCartData(totalPriceValue, totalQuantityValue);
	}

	// ______________________________________________________________________
	logCartData(totalPriceValue: number, totalQuantityValue: number) {
		console.log("Contents of the cart");
		for (let tempCartItem of this.cartItems) {
			const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
			console.log(
				`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice=${tempCartItem.unitPrice}, subTotalPrice=${subTotalPrice}`,
			);
		}
		console.log(
			`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`,
		);
		console.log("----");
	}

	// ______________________________________________________________________
	decrementQuantity(theCartItem: CartItem) {
		theCartItem.quantity--;

		if (theCartItem.quantity === 0) {
			this.remove(theCartItem);
		} else {
			this.computeCartTotals();
		}
	}

	// ______________________________________________________________________
	remove(theCartItem: CartItem) {
		// * INFO: get indexof item in the array
		const itemIndex = this.cartItems.findIndex(
			(tempCartItem) => tempCartItem.id == theCartItem.id,
		);

		// * INFO: if found,remove the item from the arrayat the given index
		if (itemIndex > -1) {
			this.cartItems.splice(itemIndex, 1);

			this.computeCartTotals();
		}
	}
}
