<template>
    <NuxtLink
        :to="`/project/${project.id}`"
        class="c-card-clickable"
    >
        <div class="text-xl font-semibold">{{ project.name }}</div>
        <div class="flex justify-between text-muted-color">
            <div>
                {{ project.completed_tasks ?? 0 }} of {{ project.total_tasks ?? 0 }} Tasks
                Done
            </div>
            <div>{{ completionPercentage }} %</div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const props = defineProps<{
    project: Database["public"]["Views"]["vw_project_with_task_summary"]["Row"];
}>();

const completionPercentage = (props.project.completion_percentage ?? 0).toFixed(
    0,
);
</script>
