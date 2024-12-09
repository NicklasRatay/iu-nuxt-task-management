<template>
    <DataTable
        v-model:filters="filters"
        :value="tasks"
        data-key="id"
        :loading="loading"
        show-gridlines
        scrollable
        scroll-height="flex"
        paginator
        :rows="50"
        :rows-per-page-options="[20, 50, 100, 250]"
        sort-mode="multiple"
        removable-sort
        :global-filter-fields="['name', 'description']"
        filter-display="menu"
        state-storage="session"
        state-key="task-table-state"
        class="c-card !p-0 c-max-h-full"
    >
        <template #empty>
            <div class="text-center">No Tasks Found</div>
        </template>
        <template #loading>
            <i class="pi pi-sync pi-spin text-5xl" />
        </template>
        <template #header>
            <div class="flex justify-between items-center gap-4 py-1">
                <div class="flex items-center gap-4">
                    <i class="pi pi-list-check !text-2xl" />
                    <div
                        v-if="!isMobile"
                        class="text-2xl font-semibold"
                    >
                        Tasks of {{ props.projectName }}
                    </div>
                    <IconField>
                        <InputIcon class="pi pi-search" />
                        <InputText
                            v-model="filters.global.value"
                            placeholder="Search"
                            fluid
                        />
                    </IconField>
                    <slot />
                </div>
                <Button
                    icon="pi pi-undo"
                    :label="isMobile ? undefined : 'Reset'"
                    severity="secondary"
                    @click="resetfilters"
                />
            </div>
        </template>
        <Column
            header="Edit"
            class="w-16"
            body-class="!p-1"
        >
            <template #body="{ data }">
                <Button
                    icon="pi pi-pencil"
                    text
                    class="min-w-full"
                    @click="$emit('editButtonClicked', data)"
                />
            </template>
        </Column>
        <Column
            field="name"
            header="Name"
            sortable
        />
        <Column
            field="description"
            header="Description"
            sortable
        />
        <Column
            field="deadline"
            header="Deadline"
            sortable
        />
        <Column
            field="priority_name"
            header="Priority"
            sortable
        />
        <Column
            field="status_name"
            header="Status"
            sortable
        />
        <Column
            field="assigned_user_name"
            header="Assigned User"
            sortable
            :show-filter-match-modes="false"
            :show-filter-operator="false"
        />
    </DataTable>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import type { Database } from "~/supabase/types";

const props = defineProps<{
    projectId: Number;
    projectName: string;
}>();

defineEmits<{
    editButtonClicked: [
        Database["public"]["Views"]["vw_task_with_details"]["Row"],
    ];
}>();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

const tasks = ref<
    Array<Database["public"]["Views"]["vw_task_with_details"]["Row"]>
>([]);

const taskPriorityLOV = ref<
    Array<Database["public"]["Tables"]["task_priority"]["Row"]>
>([]);
const taskStatusLOV = ref<
    Array<Database["public"]["Tables"]["task_status"]["Row"]>
>([]);
const userLOV = ref<Array<Database["public"]["Tables"]["profile"]["Row"]>>([]);

const loading = ref(true);

const loadTasks = async () => {
    const { data, error } = await supabase
        .from("vw_task_with_details")
        .select("*")
        .eq("project_id", props.projectId);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    tasks.value = data;
};

const loadTaskPriorities = async () => {
    const { data, error } = await supabase.from("task_priority").select("*");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    taskPriorityLOV.value = data;
};

const loadTaskStatuses = async () => {
    const { data, error } = await supabase.from("task_status").select("*");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    taskStatusLOV.value = data;
};

const loadUsers = async () => {
    const { data, error } = await supabase.from("profile").select("*");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    userLOV.value = data;
};

onMounted(async () => {
    await Promise.all([
        loadTasks(),
        loadTaskPriorities(),
        loadTaskStatuses(),
        loadUsers(),
    ]);
    loading.value = false;
});

const filters = ref();
const resetfilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };
};
resetfilters();

defineExpose({
    loadTasks,
});
</script>
