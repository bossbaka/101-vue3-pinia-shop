<script lang="ts">
import Breadcrumb from '../components/Breadcrumb.vue';
import { defineComponent, computed, onBeforeMount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useBooksStore, useBookDetail } from "../store/useBooks";
import { useCartStore } from "../store/cart";
import type BookType from '../types/BookType';
import { isDark } from '~/composables/dark'

export default defineComponent({
    name: 'BooksDetail',
    props: {
        id: {
            required: true,
            type: String,
        },
    },
    setup(props) {
        const router = useRouter();
        const route = useRoute();

        const bookStore = useBookDetail();
        //const booksStore = useBooksStore();

        const cartStore = useCartStore();

        const book = computed(() => bookStore.book);

        //onMounted(booksStore.getBookList);

        const num = ref(1)
        const handleChange = (value: number) => {
            value
        }

        const getBookById = (bookId: string) => {
            bookStore.getBookById(bookId);
        };

        const addToCart = (b: BookType) => {
            cartStore.addToCart(b);
            router.push('/cart');
        };

        if (route.params.id) {
            getBookById(props.id);
        }

        onBeforeMount(() => {
            getBookById(props.id);
        });

        // console.log(cartStore.cartItems);

        return {
            cartStore,
            book,
            addToCart,
            handleChange,
            num
        };
    },
    components: { Breadcrumb },
})
</script>

<template>

    <Breadcrumb :current="book.title" />
    <el-row :style="{ marginTop: '50px' }">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <div class="demo-image__preview">
                <el-image :src="book?.images?.jpeg" :alt="book.title" />
            </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <h3>
                {{ book.title }} <br />
                <div :style="{ color: '#666' }"> Author {{ book.author }} </div>
            </h3>
            <h4 :style="{ color: '#707070', fontWeight: '400' }">
                Detail
                <br />
                {{ book.description }}
            </h4>
            <h2 :style="{ color: '#a18a68' }">
                ฿ {{ book.price }}
            </h2>

            <el-divider />

            <el-space wrap>
                <el-button @click="addToCart(book)" size="large" :style="{ padding: '20px', }" color="#a18a68"
                    :dark="isDark" plain>
                    <h3>ADD TO CART </h3>
                </el-button>
            </el-space>

        </el-col>
    </el-row>

</template>


<style scoped>
.el-input-number {
    width: 130px;
}

.demo-image__preview {
    text-align: center
}
</style>