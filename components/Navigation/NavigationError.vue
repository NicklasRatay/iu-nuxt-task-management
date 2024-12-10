<template>
    <div class="flex items-center justify-center c-h-full">
        <div class="c-card flex flex-col items-center gap-3">
            <div class="flex items-baseline gap-6">
                <div :class="['text-7xl', color]">{{ errorCode }}</div>
                <i
                    :class="[icon, color]"
                    style="font-size: 4rem"
                />
            </div>
            <div class="text-2xl">{{ title }}</div>
            <div
                v-if="subtitle"
                class="text-lg text-muted-color"
            >
                {{ subtitle }}
            </div>
            <Button
                v-if="buttonCallback"
                :icon="buttonIcon"
                :label="buttonLabel"
                @click="buttonCallback()"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    errorCode: string;
    icon: string;
    color: string;
    title: string;
    subtitle?: string;
    buttonIcon?: string;
    buttonLabel?: string;
    buttonCallback?: () => void;
}>();
</script>
