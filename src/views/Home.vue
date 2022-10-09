<script lang="ts">
import BookCard from '../components/BookCard.vue';
import { useBooksStore } from '../store/useBooks'
import { computed, defineComponent, onMounted } from 'vue';
import { usePromotionsStore } from '../store/usePromotions';
import { Promotion } from '@element-plus/icons-vue'

export default defineComponent({
    name: 'Home',
    setup() {
        const store = useBooksStore();
        const getBooks = computed(() => store.books);
        onMounted(store.getBookList);

        const PromotionsStore = usePromotionsStore()
        const getPromotions = computed(() => PromotionsStore.promotions);
        onMounted(PromotionsStore.getPromotionList);

        return { getBooks, getPromotions };
    },
    components: { BookCard },
});

</script>

<template>

    <div class="tip custom-block">
        <el-icon>
            <Promotion />
        </el-icon>
        <span class="custom-block-title">Promotions</span>
        <span v-for="p in getPromotions">{{ p.name }} , </span>
    </div>

    <div :style="{ display: 'flex', justifyContent: 'space-between' }">
        <h1 :style="{ color: '#a58b64' }">Books</h1>
        <h5>Total {{ getBooks.length }} Items</h5>

    </div>

    <el-row :gutter="20">
        <BookCard v-for="book in getBooks" :key="book.id" :book="book" />
    </el-row>

</template>


<style scoped>
.el-carousel__item h3 {
    display: flex;
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.custom-block-title {
    margin-right: 20px;
    margin-left: 5px;
}

.custom-block.tip {
    padding: 8px 16px;
    background-color: #dbc5a3;
    border-radius: 4px;
    border-left: 5px solid #a58b64;
    margin: 20px 0;
    font-size: 13px;

}
</style>
