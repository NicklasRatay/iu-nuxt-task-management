<template>
    <PanelMenu
        :model="navigationEntries"
        :pt="{
            panel: {
                class: '!border-none !p-0',
            },
        }"
    >
        <template #item="{ item, hasSubmenu }">
            <NuxtLink
                :to="item.route"
                class="flex px-[0.625rem] py-1 gap-5 items-baseline cursor-pointer transition-colors duration-300"
                @click="emits('itemClicked', item.label?.toString() ?? '')"
            >
                <i
                    :class="item.icon"
                    style="font-size: 1.2rem"
                />
                <div class="text-xl w-full">{{ item.label }}</div>
                <i
                    v-if="hasSubmenu"
                    class="pi pi-angle-down"
                    style="font-size: 1.2rem"
                />
            </NuxtLink>
        </template>
    </PanelMenu>
</template>

<script setup lang="ts">
const emits = defineEmits<{
    itemClicked: [string];
}>();

const { navigationEntries } = useNavigationEntries();
</script>
