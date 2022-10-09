<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        current: String
    }
})
</script>

<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item>{{ current }}</el-breadcrumb-item>
    </el-breadcrumb>

</template>

<style scoped>

</style>