<template>
    <NavigationError
        :error-code="error.statusCode.toString()"
        icon="pi pi-exclamation-triangle"
        color="text-red-500"
        title="An Error Occured"
        :subtitle="error.message"
        button-icon="pi pi-home"
        button-label="Dashboard"
        :button-callback="() => navigateTo('/')"
    />
</template>

<script setup lang="ts">
import type { NuxtError } from "nuxt/app";

defineProps<{
    error: NuxtError;
}>();
</script>
