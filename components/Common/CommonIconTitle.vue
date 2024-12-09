<template>
    <div class="flex gap-3 items-center justify-between mb-6">
        <div class="flex gap-6 items-center">
            <i :class="[icon, '!text-3xl']" />
            <div>
                <div class="text-2xl font-semibold">{{ title }}</div>
                <div v-if="subtitle">
                    {{ subtitle }}
                </div>
            </div>
        </div>
        <div class="flex gap-6 items-center">
            <slot />
            <Button
                v-if="returnButtonRoute"
                icon="pi pi-arrow-left"
                :label="isMobile ? undefined : 'Return'"
                severity="secondary"
                size="large"
                @click="navigateTo(returnButtonRoute)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    icon: string;
    title: string;
    subtitle?: string;
    returnButtonRoute?: string;
}>();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);
</script>
