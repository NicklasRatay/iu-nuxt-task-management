<template>
    <div class="grid grid-cols-3 gap-x-6 xl:gap-x-24 xl:px-16 w-full">
        <div
            v-for="taskStatus in taskStatuses"
            :key="taskStatus.id"
        >
            <div class="font-bold text-xl text-center whitespace-nowrap mb-4">
                {{ taskStatus.name }}
            </div>
            <draggable
                v-model="groupedTasks[taskStatus.id]"
                group="tasks"
                item-key="id"
                class="flex-grow space-y-6 min-h-full"
                :data-status-id="taskStatus.id"
                @end="onTaskDrop"
            >
                <template #item="{ element }">
                    <TaskCard
                        :task="element"
                        :data-id="element.id"
                    />
                </template>
            </draggable>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";
import draggable from "vuedraggable";

const taskStatuses = ref<
    Array<Database["public"]["Tables"]["task_status"]["Row"]>
>([]);
const groupedTasks = ref<
    Record<
        string,
        Array<Database["public"]["Views"]["vw_task_with_details"]["Row"]>
    >
>({});

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const simpleToast = useSimpleToast();

const loadTaskStatuses = async () => {
    const { data, error } = await supabase
        .from("task_status")
        .select("*")
        .order("id");
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    taskStatuses.value = data;

    groupedTasks.value = Object.fromEntries(
        data.map((bucket) => [bucket.id, []]),
    );
};

const loadTasks = async () => {
    if (!user.value) {
        return;
    }

    const { data, error } = await supabase
        .from("vw_task_with_details")
        .select("*")
        .eq("assigned_user_id", user.value?.id)
        .neq("status_id", 3); // Exclude completed tasks to prevent clutter

    if (error) {
        simpleToast.error(error.message);
        return;
    }

    // Group tasks dynamically by their status
    groupedTasks.value = Object.fromEntries(
        taskStatuses.value.map((bucket) => [
            bucket.id,
            data.filter((task) => task.status_id === bucket.id),
        ]),
    );
};

onMounted(async () => {
    await loadTaskStatuses(); // Fetch dynamic buckets first
    await loadTasks(); // Load tasks once buckets are ready
});

const onTaskDrop = async (event: any) => {
    const { to, item } = event;

    // Get the new status from the target container's attribute or reference
    const newStatus = to.getAttribute("data-status-id");
    const taskId = item.getAttribute("data-id"); // Ensure your tasks have data-id

    // Update the task's status in Supabase
    const { error } = await supabase
        .from("task")
        .update({ task_status_id: newStatus })
        .eq("id", taskId);
    if (error) {
        console.error(error);
        simpleToast.error(`Failed to update task.`);
    }
};
</script>
