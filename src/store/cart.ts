import type CartType from "../types/CartType";
import { defineStore } from "pinia";

export const STORAGE_CART = "vuets-pinia-cart";
export const cartStorage = localStorage.getItem(STORAGE_CART);

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [] as CartType[],
  }),
  persist: true,
  getters: {
    itemsPrice: (state) => {
      return state.cartItems.reduce(
        (acc, curr) => acc + curr.price * curr.qty,
        0
      );
    },
    totalPrice(): number {
      return this.itemsPrice;
    },
  },
  actions: {
    addToCart(book: CartType) {
      const exist = this.cartItems.find((c) => c.id == book.id);
      if (exist) {
        exist.qty++;
      } else {
        this.cartItems.unshift({
          ...book,
          qty: 1,
        });
      }
    },

    removeFromCart(book: CartType) {
      const exist = this.cartItems.find((c) => c.id === book.id);
      if (exist) {
        if (exist.qty === 1) {
          this.cartItems = this.cartItems.filter((item) => item.id !== book.id);
        } else {
          exist.qty--;
        }
      }
    },

    removeBookFromCart(book: CartType) {
      this.cartItems = this.cartItems.filter((ci) => ci.id !== book.id);
    },
  },
});
