<template>
    <UserLoginForm />
</template>

<script setup lang="ts">
// Redirect to dashboard if user is already logged in
const user = useSupabaseUser();
if (user.value) {
    navigateTo("/");
}
</script>
