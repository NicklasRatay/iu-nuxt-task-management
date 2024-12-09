<template>
    <div>
        <CommonIconTitle
            icon="pi pi-folder"
            title="Your Projects"
            subtitle="Create and manage your projects here."
            return-button-route="/"
        >
            <Button
                icon="pi pi-plus"
                :label="isMobile ? undefined : 'Create Project'"
                size="large"
                @click="navigateTo('/project/new')"
            />
        </CommonIconTitle>
        <div
            class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        >
            <div
                v-for="project in projects"
                :key="project.id!"
                class="c-card-clickable"
            >
                <div class="text-xl font-semibold">{{ project.name }}</div>
                <div class="flex justify-between text-muted-color">
                    <div>
                        {{ project.completed_tasks }} of
                        {{ project.total_tasks }} Tasks Done
                    </div>
                    <div>{{ project.completion_percentage?.toFixed(0) }} %</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const simpleToast = useSimpleToast();

const projects = ref<
    Array<Database["public"]["Views"]["vw_project_with_task_summary"]["Row"]>
>([]);

onMounted(async () => {
    if (!user.value) {
        return;
    }

    const { data, error } = await supabase
        .from("vw_project_with_task_summary")
        .select("*")
        .eq("created_by", user.value.id);

    if (error) {
        simpleToast.error(error.message);
        return;
    }

    projects.value = data;
});
</script>
