<template>
    <el-result title="Not Found" sub-title="Sorry, request error">
        <template #icon>
        </template>
        <template #extra>
            <router-link to="/">
                <el-button color="#a18a68" :dark="isDark" plain>Back</el-button>
            </router-link>
        </template>
    </el-result>
</template>

<script  lang="ts">
import { isDark } from '~/composables/dark'

</script>

<style scoped>

</style>