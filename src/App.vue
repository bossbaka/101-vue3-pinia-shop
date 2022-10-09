<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import { ShoppingCart } from '@element-plus/icons-vue'
import { useCartStore } from './store/cart'

export default defineComponent({
  setup() {

    const cart = useCartStore();
    const cartItems = computed(() => cart.cartItems);

    return {
      cartItems,
      cart
    };
  },
})

</script>

<template>
  <el-container>

    <el-header>
      <div class="nav">
        <router-link to="/">
          <h1>Little Brown Book Shop</h1>
        </router-link>
        <!-- <el-input v-model="store.searchInput" class="w-50 m-2" placeholder="Search title" :prefix-icon="Search" /> -->
        <router-link to="/cart">
          <el-badge :value="cartItems.length" class="item">
            <el-icon :size="22">
              <ShoppingCart />
            </el-icon>
          </el-badge>
        </router-link>
      </div>
    </el-header>

    <el-main>
      <router-view />
    </el-main>

  </el-container>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #dcdfe6;
  padding-left: 20px;
}

h1 {
  color: black;

}

.el-menu-demo {
  color: black;
}

.el-header {
  --el-header-padding: 0;
  padding: var(--el-header-padding);
}

.el-menu--horizontal {
  align-items: center;
}

.item {
  color: black;
  margin-top: 10px;
  margin-right: 40px;


}
</style>
