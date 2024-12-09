<template>
    <div v-if="!loading && projectId">
        <ProjectDialog
            ref="refProjectDialog"
            :project-id="projectId"
            @processed="handleProjectDialogProcessed($event)"
        />
        <TaskDialog
            ref="refTaskDialog"
            :project-id="projectId"
            @processed="refTaskTable.loadTasks()"
        />
        <TaskTable
            v-if="project"
            :project-id="project.id"
            :project-name="project.name"
            ref="refTaskTable"
            @edit-button-clicked="refTaskDialog.openDialog($event.id)"
        >
            <Button
                icon="pi pi-pencil"
                :label="isMobile ? undefined : 'Edit Project Name'"
                severity="secondary"
                @click="refProjectDialog.openDialog(project.id)"
            />
            <Button
                icon="pi pi-plus"
                :label="isMobile ? undefined : 'Create Task'"
                @click="refTaskDialog.openDialog(null)"
            />
        </TaskTable>
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";

const refProjectDialog = ref();
const refTaskDialog = ref();
const refTaskTable = ref();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

// Get the project ID from the URL
const route = useRoute();
const param = route.params.id;
const projectId = isNaN(Number(param)) ? null : Number(param);

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

const project = ref<Database["public"]["Tables"]["project"]["Row"]>();

const loadProject = async () => {
    if (!projectId) return;

    const { data, error } = await supabase
        .from("project")
        .select("*")
        .eq("id", projectId)
        .single();

    if (error) {
        simpleToast.error(error.message);
        return;
    }

    project.value = data;
};

const loading = ref(true);

onMounted(async () => {
    await loadProject();
    loading.value = false;
});

const handleProjectDialogProcessed = (event: string) => {
    if (event === "deleted") {
        navigateTo("/project");
    } else {
        loadProject();
    }
};
</script>
