<template>
    <DataTable
        v-model:filters="filters"
        v-model:selection="selectedProject"
        :value="projects"
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
        :global-filter-fields="['name']"
        filter-display="menu"
        state-storage="session"
        state-key="project-table-state"
        selection-mode="single"
        meta-key-selection
        class="c-card !p-0 c-min-h-half c-max-h-half"
        @row-select="onSelectionChange($event.data)"
        @row-unselect="onSelectionChange(null)"
    >
        <template #header>
            <div class="flex justify-between items-center gap-4 py-1">
                <div class="flex items-center gap-4">
                    <i class="pi pi-folder !text-2xl" />
                    <div
                        v-if="!isMobile"
                        class="text-2xl font-semibold"
                    >
                        Projects
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
        <template #empty>
            <div class="text-center">No Projects Found</div>
        </template>
        <template #loading>
            <i class="pi pi-sync pi-spin text-5xl" />
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
        >
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" />
            </template>
        </Column>
        <Column
            field="completed_tasks"
            header="Completed Tasks"
            sortable
            data-type="numeric"
            class="w-80 whitespace-nowrap"
        >
            <template #filter="{ filterModel }">
                <InputNumber
                    v-model="filterModel.value"
                    show-buttons
                    :use-grouping="false"
                    :min="0"
                />
            </template>
        </Column>
        <Column
            field="total_tasks"
            header="Total Tasks"
            sortable
            data-type="numeric"
            class="w-80 whitespace-nowrap"
        >
            <template #filter="{ filterModel }">
                <InputNumber
                    v-model="filterModel.value"
                    show-buttons
                    :use-grouping="false"
                    :min="0"
                />
            </template>
        </Column>
        <Column
            field="completion_percentage"
            header="Progress"
            sortable
            data-type="numeric"
            :show-filter-match-modes="false"
            :show-filter-operator="false"
            class="w-80"
            body-class="!p-2"
        >
            <template #filter="{ filterModel }">
                <Slider
                    v-model="filterModel.value"
                    range
                    class="m-4"
                />
                <div class="flex items-center justify-between px-2">
                    <span>{{
                        filterModel.value ? filterModel.value[0] : 0
                    }}</span>
                    <span>{{
                        filterModel.value ? filterModel.value[1] : 100
                    }}</span>
                </div>
            </template>
            <template #body="{ data }">
                <ProgressBar
                    :value="data.completion_percentage"
                    class="!h-7"
                >
                    <div class="text-base">
                        {{ data.completion_percentage.toFixed(0) }}%
                    </div>
                </ProgressBar>
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import type { Database } from "~/supabase/types";

const emits = defineEmits<{
    editButtonClicked: [
        Database["public"]["Views"]["vw_project_with_task_summary"]["Row"],
    ];
    rowSelected: [
        | Database["public"]["Views"]["vw_project_with_task_summary"]["Row"]
        | null,
    ];
}>();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const simpleToast = useSimpleToast();

const loading = ref(true);
const projects =
    ref<
        Array<
            Database["public"]["Views"]["vw_project_with_task_summary"]["Row"]
        >
    >();
const selectedProject = ref();

const onSelectionChange = (
    row:
        | Database["public"]["Views"]["vw_project_with_task_summary"]["Row"]
        | null,
) => {
    emits("rowSelected", row);
};

const loadProjects = async () => {
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
};

const filters = ref();
const resetfilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        total_tasks: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        completed_tasks: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        completion_percentage: {
            value: [0, 100],
            matchMode: FilterMatchMode.BETWEEN,
        },
    };
};
resetfilters();

onMounted(async () => {
    await loadProjects();
    selectedProject.value = null; // Otherwise, might be set from session state
    loading.value = false;
});

defineExpose({
    loadProjects,
});
</script>
