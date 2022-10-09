<script lang="ts">
export default {
    props: {
        book: Object
    },
    setup() {

    },
}
</script>

<template>
    <el-col :style="{ marginBottom: '20px' }" :xs="12" :sm="8" :md="8" :lg="6" :xl="4" :key="book.id">
        <router-link :to="`/books/${book.id}`">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
                <div :style="{ margin: '20px' }">
                    <el-image :src="book.images.jpeg" loading="lazy" class="demo-image__lazy" :alt="book.title" />
                    <div :style="{ minHeight: '70px' }">
                        <h5> {{ book.title }} <br /> <span :style="{ color: '#666' }">author {{ book.author }}
                            </span>
                        </h5>
                    </div>
                    <h5 :style="{ color: '#a18a68' }"> ฿ {{ book.price }}</h5>
                </div>
            </el-card>
        </router-link>
    </el-col>
</template>

<style scoped>
.demo-image__lazy {
    height: 150px;
    display: block;
    width: 100px;
    margin: 0 auto;
}
</style>