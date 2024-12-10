<template>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex flex-col gap-6 items-center">
            <ChartTaskStatus />
            <ChartTaskPriority />
        </div>
        <div class="flex flex-col gap-6">
            <div class="flex gap-6">
                <div class="c-card w-full text-center font-light">
                    <div class="text-7xl">
                        {{ totalProjects }}
                    </div>
                    <div class="text-4xl">Projects</div>
                </div>
                <div class="c-card w-full text-center font-light">
                    <div class="text-7xl">
                        {{ totalTasks }}
                    </div>
                    <div class="text-4xl">Tasks</div>
                </div>
            </div>
            <div class="text-2xl font-semibold">Upcoming Tasks</div>
            <TaskCard
                v-for="task in upcomingTasks"
                :key="task.id!"
                :task="task"
                :clickable="false"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const totalTasks = ref(0);
const totalProjects = ref(0);

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

const upcomingTasks = ref<
    Array<Database["public"]["Views"]["vw_task_with_details"]["Row"]>
>([]);

const loadTaskCount = async () => {
    const { data, error } = await supabase.rpc("get_total_task_count");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    totalTasks.value = data;
};

const loadProjectCount = async () => {
    const { data, error } = await supabase.rpc("get_total_project_count");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    totalProjects.value = data;
};

const loadUpcomingTasks = async () => {
    const { data, error } = await supabase
        .from("vw_task_with_details")
        .select("*")
        .in("status_id", [1, 2])
        .limit(5);
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    upcomingTasks.value = data;
};

onMounted(() => {
    loadTaskCount();
    loadProjectCount();
    loadUpcomingTasks();
});
</script>
