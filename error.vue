<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="c-card flex flex-col items-center gap-6 max-w-[40rem]">
            <div class="flex items-baseline gap-6">
                <div class="text-7xl text-red-500">
                    {{ error.statusCode }}
                </div>
                <i
                    class="pi pi-exclamation-triangle text-red-500"
                    style="font-size: 4rem"
                />
            </div>
            <p class="text-2xl m-0">{{ error.message }}</p>
            <NuxtLink to="/">
                <Button
                    label="Dashboard"
                    icon="pi pi-home"
                />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "nuxt/app";

defineProps<{
    error: NuxtError;
}>();
</script>
