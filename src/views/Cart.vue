<script lang="ts">
import { ref, defineComponent, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useCartStore } from '../store/cart';
import Breadcrumb from '../components/Breadcrumb.vue';
import type CartType from '../types/CartType';
import { Delete } from '@element-plus/icons-vue'
import DialogMessage from "../components/DialogMessage.vue";
import { ElNotification } from 'element-plus'
import { usePromotionsStore } from '../store/usePromotions';
import type { Ref } from 'vue'
import { isDark } from '~/composables/dark'

export default defineComponent({
    name: 'Cart',
    setup(props) {
        const cart = useCartStore();
        const router = useRouter();


        const PromotionsStore = usePromotionsStore()
        const getPromotions = computed(() => PromotionsStore.promotions);
        onMounted(PromotionsStore.getPromotionList);

        const handleChange = (value: number) => {
            value
        }

        const inputP: Ref<number | any> = ref('')

        const buyBooks = () => {
            ElNotification.success({
                title: 'Success',
                message: 'Thank you for shopping with us.',
                offset: 60,
                duration: 5000
            })
            router.push("/")
            cart.$reset()
        };

        return {
            handleChange,
            cart,
            router,
            buyBooks,
            getPromotions,
            inputP,
        };
    },
    components: { Breadcrumb },

})
</script>


<template>
    <Breadcrumb current="MY CART" />

    <h1 :style="{ color: '#a58b64' }">MY CART </h1>

    <div v-if="cart.cartItems.length === 0">
        <el-empty :image-size="200" description="Your cart is empty" />
    </div>

    <el-row :gutter="40" v-else>

        <el-col :xs="24" :sm="15" :md="14" :lg="15" :xl="15">
            <el-card v-for="item in cart.cartItems" :key="item.id" shadow="never">
                <div :style="{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }">

                    <div :style="{
                        display: 'flex', alignItems: 'stretch',
                    }">
                        <el-image class="imghide" style="width: 100px; height: 150px;" :src="item?.images?.jpeg"
                            fit="scale-down" />
                        <div :style="{ display: 'inline-block', marginLeft: '20px' }">

                            <h4>{{ item.title }}</h4>
                            <p>฿ {{ item.price }}</p>
                            <el-icon @click="cart.removeBookFromCart(item)" class="el-icon--right">
                                <Delete />
                            </el-icon>
                        </div>
                    </div>



                    <el-input-number v-model="item.qty" :min="1" @change="handleChange" />
                </div>
            </el-card>
        </el-col>

        <el-col :xs="24" :sm="9" :md="10" :lg="9" :xl="9">
            <el-card shadow="hover">
                <h2>Cart Summary</h2>
                <h3> <span> Subtotal {{
                cart.cartItems.reduce((acc, curr) => acc + curr.qty, 0)
                }} Items </span> </h3>

                <div class="flex">
                    <h3>
                        Summary
                    </h3>
                    <h3>
                        ฿ {{ cart.totalPrice.toFixed(2) }}
                    </h3>
                </div>

                <el-divider />

                <el-space>
                    <h3>Paid</h3>
                    <el-input v-model="inputP" @change="handleChange" class="w-50 m-2" size="large" />
                </el-space>

                <div class="flex">
                    <h3>
                        Change
                    </h3>
                    <h3 v-if="inputP > cart.totalPrice">
                        ฿ {{ inputP - cart.totalPrice }}
                    </h3>
                </div>

                <el-divider />

                <div v-if="inputP < cart.totalPrice">
                    <el-button disabled @click="buyBooks" type="primary" size="large"
                        :style="{ padding: '20px', color: '#fff' }" color="#a18a68" :dark="isDark">
                        <h2>CHECKOUT </h2>
                    </el-button>
                </div>

                <div v-if="inputP > cart.totalPrice">
                    <el-button @click="buyBooks" type="primary" size="large" :style="{ padding: '20px', color: '#fff' }"
                        color="#a18a68" :dark="isDark">
                        <h2>CHECKOUT </h2>
                    </el-button>
                </div>

            </el-card>
        </el-col>

    </el-row>

</template>



<style scoped>
.el-space {
    display: flex;
    justify-content: space-between;
}

@media only screen and (max-width: 414px) {
    .imghide {
        display: none;
    }

    p,
    h4 {
        font-size: 12px;
    }
}

span {
    font-weight: 400;
}

.el-button {
    width: 100%;
}

h5 {
    cursor: pointer;
}

.flex {
    display: flex;
    justify-content: space-between;
}

.el-col {
    margin-bottom: 20px;
}

.el-card {
    margin: 10px 0 10px 0;
    background-color: #fafafa;
    --el-card-padding: 20px;
}

.el-icon--right {
    cursor: pointer;
    margin-left: 0px;
    color: #c25c5c;
}
</style>