import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import BooksDetail from "../views/BooksDetail.vue";
import Cart from "../views/Cart.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/books/:id",
    name: "BooksDetail",
    component: BooksDetail,
    props: true,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/:NotFound(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router;
