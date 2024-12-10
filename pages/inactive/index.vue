<template>
    <NavigationError
        error-code="403"
        icon="pi pi-lock"
        color="text-orange-500"
        title="Access Denied"
        subtitle="Your account has been set to inactive"
        button-icon="pi pi-lock"
        button-label="Logout"
        :button-callback="handleLogout"
    />
</template>

<script setup lang="ts">
definePageMeta({
    layout: "login",
});

const supabase = useSupabaseClient();
const simpleToast = useSimpleToast();

const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    navigateTo("/login");
};
</script>
