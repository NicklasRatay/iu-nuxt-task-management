<template>
    <div class="flex items-center justify-center c-h-full">
        <div class="c-card flex flex-col items-center gap-6">
            <div class="flex items-baseline gap-6">
                <div class="text-7xl text-orange-500">401</div>
                <i
                    class="pi pi-lock text-orange-500"
                    style="font-size: 4rem"
                />
            </div>
            <div class="text-2xl m-0">Access Denied</div>
            <NuxtLink to="/">
                <Button
                    label="Dashboard"
                    icon="pi pi-home"
                />
            </NuxtLink>
        </div>
    </div>
</template>
