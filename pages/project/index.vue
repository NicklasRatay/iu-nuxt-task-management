<template>
    <div>
        <ProjectDialog
            ref="refProjectDialog"
            @processed="refProjectTable.loadProjects()"
        />
        <TaskDialog
            ref="refTaskDialog"
            :project-id="selectedProjectId"
            @processed="refTaskTable.loadTasks(selectedProjectId)"
        />
        <div class="flex flex-col gap-6">
            <ProjectTable
                ref="refProjectTable"
                @edit-button-clicked="refProjectDialog.openDialog($event.id)"
                @row-selected="onSelectionChange"
            >
                <Button
                    icon="pi pi-plus"
                    :label="isMobile ? undefined : 'Create Project'"
                    @click="refProjectDialog.openDialog(null)"
                />
            </ProjectTable>
            <TaskTable
                ref="refTaskTable"
                @edit-button-clicked="refTaskDialog.openDialog($event.id)"
            >
                <Button
                    icon="pi pi-plus"
                    :label="isMobile ? undefined : 'Create Task'"
                    :disabled="!selectedProjectId"
                    @click="refTaskDialog.openDialog(null)"
                />
            </TaskTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import type TaskTable from "../../components/Task/TaskTable.vue";
import type { Database } from "~/supabase/types";

const refProjectDialog = ref();
const refProjectTable = ref();
const refTaskDialog = ref();
const refTaskTable = ref<InstanceType<typeof TaskTable>>();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();
const simpleToast = useSimpleToast();

const projects = ref<
    Array<Database["public"]["Views"]["vw_project_with_task_summary"]["Row"]>
>([]);
const selectedProjectId = ref<number | null>(null);

const onSelectionChange = (
    row:
        | Database["public"]["Views"]["vw_project_with_task_summary"]["Row"]
        | null,
) => {
    selectedProjectId.value = row?.id ?? null;
    refTaskTable.value?.loadTasks(selectedProjectId.value);
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

onMounted(async () => {
    await loadProjects();
});
</script>
