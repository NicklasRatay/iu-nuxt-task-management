<template>
    <NavigationError
        error-code="403"
        icon="pi pi-lock"
        color="text-orange-500"
        title="Access Denied"
        subtitle="You lack the required role for this page"
        button-icon="pi pi-home"
        button-label="Dashboard"
        :button-callback="() => navigateTo('/')"
    />
</template>
