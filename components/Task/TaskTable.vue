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
            class="w-52"
        >
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" />
            </template>
        </Column>
        <Column
            field="description"
            header="Description"
            sortable
        >
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" />
            </template>
        </Column>
        <Column
            field="deadline"
            header="Deadline"
            sortable
            data-type="date"
            class="w-40"
        >
            <template #filter="{ filterModel }">
                <DatePicker v-model="filterModel.value" />
            </template>
            <template #body="{ data }">
                {{ new Date(data.deadline).toLocaleDateString() }}
            </template>
        </Column>
        <Column
            field="priority_name"
            header="Priority"
            sortable
            :show-filter-match-modes="false"
            :show-filter-operator="false"
            class="w-40"
        >
            <template #filter="{ filterModel }">
                <MultiSelect
                    v-model="filterModel.value"
                    :options="taskPriorityLOV"
                    option-value="name"
                    option-label="name"
                    :max-selected-labels="1"
                />
            </template>
            <template #body="{ data }">
                {{ data.priority_name }}
            </template>
        </Column>
        <Column
            field="status_name"
            header="Status"
            sortable
            :show-filter-match-modes="false"
            :show-filter-operator="false"
            class="w-40"
        >
            <template #filter="{ filterModel }">
                <MultiSelect
                    v-model="filterModel.value"
                    :options="taskStatusLOV"
                    option-value="name"
                    option-label="name"
                    :max-selected-labels="1"
                />
            </template>
            <template #body="{ data }">
                {{ data.status_name }}
            </template>
        </Column>
        <Column
            field="assigned_user_name"
            header="Assigned User"
            sortable
            :show-filter-match-modes="false"
            :show-filter-operator="false"
            class="min-w-52"
        >
            <template #filter="{ filterModel }">
                <MultiSelect
                    v-model="filterModel.value"
                    :options="userLOV"
                    option-value="full_name"
                    option-label="full_name"
                    filter
                    :max-selected-labels="1"
                />
            </template>
        </Column>
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

// Allow deadline to be date
const tasks = ref<
    Array<
        Omit<
            Database["public"]["Views"]["vw_task_with_details"]["Row"],
            "deadline"
        > & { deadline: Date | null }
    >
>([]);
const taskPriorityLOV = ref<
    Array<Database["public"]["Tables"]["task_priority"]["Row"]>
>([]);
const taskStatusLOV = ref<
    Array<Database["public"]["Tables"]["task_status"]["Row"]>
>([]);
const userLOV = ref<
    Array<Database["public"]["Views"]["vw_profile_with_full_name"]["Row"]>
>([]);

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

    // Convert deadline to date for filter to work
    tasks.value = data.map((task) => ({
        ...task,
        deadline: task.deadline ? new Date(task.deadline) : null,
    }));
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
    const { data, error } = await supabase
        .from("vw_profile_with_full_name")
        .select("*");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    userLOV.value = data;
};

const filters = ref();
const resetfilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        description: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        deadline: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        priority_name: {
            value: null,
            matchMode: FilterMatchMode.IN,
        },
        status_name: {
            value: null,
            matchMode: FilterMatchMode.IN,
        },
        assigned_user_name: {
            value: null,
            matchMode: FilterMatchMode.IN,
        },
    };
};
resetfilters();

onMounted(async () => {
    await Promise.all([
        loadTasks(),
        loadTaskPriorities(),
        loadTaskStatuses(),
        loadUsers(),
    ]);
    loading.value = false;
});

defineExpose({
    loadTasks,
});
</script>
