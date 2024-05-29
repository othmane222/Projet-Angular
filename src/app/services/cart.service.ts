import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {}

  addToCart(item: any) {
    this.cartItems.push(item);
  }
  

  removeFromCart(index: number) {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
    }
  }

  getCartItems() {
    return this.cartItems;
  }
  checkout() {
    // Implement checkout logic here, e.g., clear cart, process payment, etc.
    this.cartItems = [];
  }

  clearCart() {
    this.cartItems = [];
  }
}
