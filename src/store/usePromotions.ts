import type PromotionType from "../types/PromotionType";
import axios from "axios";
import { defineStore } from "pinia";

export const usePromotionsStore = defineStore({
  id: "promotions",
  state: () => ({
    promotions: [] as PromotionType[],
    promotion: null,
    loading: false as boolean,
    error: null,
  }),
  actions: {
    async getPromotionList() {
      try {
        this.loading = true;
        const res = await axios.get("http://localhost:3000/promotions");
        if (res.data) {
          this.loading = false;
          this.promotions = res.data;
        }
      } catch (err) {
        this.loading = false;
        console.log(err);
      }
    },
  },
});

export const usePromotionDetail = defineStore("promotionsId", {
  state: () => {
    return {
      promotion: {} as PromotionType,
      loading: false,
      error: null,
    };
  },
  actions: {
    async getPromotionById(id: string) {
      try {
        this.loading = true;
        const res = await axios.get(`http://localhost:3000/promotions/${id}`);
        if (res.data) {
          this.loading = false;
          this.promotion = res.data;
        }
      } catch (err) {
        this.loading = false;
      }
    },
  },
});
