<template>
    <div class="c-card-clickable !p-3 flex flex-col gap-2">
        <div class="font-semibold text-center md:text-lg md:text-start">
            {{ task.name }}
        </div>
        <div
            v-if="!isMobile"
            class="text-sm text-muted-color"
        >
            {{ task.description }}
        </div>
        <div class="flex flex-col md:flex-row justify-between">
            <i
                :class="[
                    getTaskPriorityIcon(task.priority_id),
                    '!text-xl text-center md:text-start',
                ]"
            />
            <div
                class="text-sm text-muted-color text-center md:text-base md:text-end"
            >
                {{ task.deadline }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

defineProps<{
    task: Database["public"]["Views"]["vw_task_with_details"]["Row"];
}>();
</script>
