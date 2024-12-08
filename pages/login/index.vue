<template>
    <UserLoginForm />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "login",
});

// Redirect to dashboard if user is already logged in
const user = useSupabaseUser();
if (user.value) {
    navigateTo("/");
}
</script>
