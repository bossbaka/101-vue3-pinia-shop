import type BookType from "../types/BookType";
import axios from "axios";
import { defineStore } from "pinia";

export const useBooksStore = defineStore({
  id: "books",
  state: () => ({
    books: [] as BookType[],
    book: null,
    loading: false as boolean,
    error: null,
  }),
  actions: {
    async getBookList() {
      try {
        this.loading = true;
        const res = await axios.get("http://localhost:3001/books");
        if (res.data) {
          this.loading = false;
          this.books = res.data;
        }
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
  },
});

export const useBookDetail = defineStore("bookId", {
  state: () => {
    return {
      book: {} as BookType,
      loading: false,
      error: null,
    };
  },
  actions: {
    async getBookById(id: string) {
      try {
        this.loading = true;
        const res = await axios.get(`http://localhost:3001/books/${id}`);
        if (res.data) {
          this.loading = false;
          this.book = res.data;
        }
      } catch (err) {
        this.loading = false;
      }
    },
  },
});
