import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-details',
  imports: [CurrencyPipe],
  standalone: true,
  templateUrl: './cart-details.html',
  styleUrl: './cart-details.css',
})
export class CartDetails implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  // ______________________________________________________________________
  constructor(private cartService: CartService) { }

  // ______________________________________________________________________
  ngOnInit(): void {
    this.listCartDetails();
  }

  // ______________________________________________________________________
  listCartDetails() {
    // get a handle to the cart cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to the cart total price and total quantity
    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
    this.cartService.totalQuantity.subscribe((data) => (this.totalQuantity = data));

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  // ______________________________________________________________________
  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  // ______________________________________________________________________
  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  // ______________________________________________________________________
  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }
}
