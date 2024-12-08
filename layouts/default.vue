<template>
    <div>
        <Toast />
        <div
            class="fixed z-[999] h-[3.5rem] w-full flex justify-between items-center bg-primary p-2"
        >
            <div class="flex gap-2 items-baseline">
                <Button
                    icon="pi pi-bars"
                    @click="isSidebarVisible = !isSidebarVisible"
                />
                <NuxtLink
                    to="/"
                    class="!text-primary-contrast text-2xl font-semibold"
                >
                    {{ APP_NAME }}
                </NuxtLink>
            </div>
        </div>
        <div
            v-if="!isMobile"
            :class="[
                'fixed z-[998] top-[3.5rem] bottom-0 w-[16rem] overflow-y-auto c-bg-region border-r c-border-color !p-2 transition-[margin transform] ease-in-out duration-300',
                !isSidebarVisible ? '-translate-x-full' : '',
            ]"
        >
            <NavigationMenu />
        </div>
        <Drawer
            v-if="isMobile"
            v-model:visible="isSidebarVisible"
            class="!w-[15rem] overflow-y-auto"
        >
            <template #container>
                <NavigationMenu
                    class="p-2"
                    @item-clicked="isSidebarVisible = !isSidebarVisible"
                />
            </template>
        </Drawer>
        <div
            v-focustrap
            :class="[
                'w-full pt-[5rem] pr-[1.5rem] pb-[1.5rem] transition-[padding] ease-in-out duration-300',
                !isMobile && isSidebarVisible ? 'pl-[17.5rem]' : 'pl-[1.5rem]',
            ]"
        >
            <slot />
        </div>
        <ScrollTop />
    </div>
</template>

<script setup lang="ts">
import { APP_NAME } from "~/utils/constants";

const isSidebarVisible = ref(false);

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

onMounted(() => {
    if (!isMobile.value) {
        isSidebarVisible.value = true;
    }
});
</script>
