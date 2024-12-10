<template>
    <div class="c-card-clickable !p-3 flex flex-col gap-2">
        <div class="font-semibold text-center xl:text-start">
            {{ task.name }}
        </div>
        <div
            v-if="!isMobile"
            class="text-sm text-muted-color"
        >
            {{ task.description }}
        </div>
        <div class="grid grid-cols-1 xl:grid-cols-2">
            <i
                :class="
                    getPriorityIcon(task.priority_id)
                        + ' !text-xl text-center xl:text-start'
                "
            />
            <div class="text-center xl:text-end">
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

const getPriorityIcon = (priorityId: number | null) => {
    switch (priorityId) {
        case 1:
            return "pi pi-angle-down text-muted-color";
        case 2:
            return "pi pi-minus text-primary";
        case 3:
            return "pi pi-angle-up text-orange-500";
        case 4:
            return "pi pi-angle-double-up text-red-500";
        default:
            return undefined;
    }
};
</script>
