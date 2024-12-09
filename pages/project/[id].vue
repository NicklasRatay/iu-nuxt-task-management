<template>
    <div v-if="!loading">
        <CRUDForm @submit="saveData($event)">
            <CommonIconTitle
                icon="pi pi-folder"
                :title="project?.name ?? 'New Project'"
                :subtitle="
                    project?.id
                        ? 'Update the project and its tasks'
                        : 'Set up a project with tasks'
                "
                return-button-route="/project"
            >
                <Button
                    type="submit"
                    icon="pi pi-save"
                    :label="isMobile ? undefined : 'Save'"
                    size="large"
                />
            </CommonIconTitle>
            <CRUDFormField
                id="project_name"
                label="Project Name"
                :schema="yup.string().required()"
                :initial-value="project?.name"
                component="InputText"
            />
        </CRUDForm>
        <DataTable
            :value="tasks"
            class="c-card"
        >
            <Column
                field="name"
                header="Task Name"
            ></Column>
            <Column
                field="description"
                header="Description"
            ></Column>
            <Column
                field="deadline"
                header="Deadline"
            ></Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import type { Database } from "~/supabase/types";
import * as yup from "yup";
import type { FormSubmitEvent } from "@primevue/forms";

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

// Get the project ID from the URL
const route = useRoute();
const param = route.params.id;
const projectId = isNaN(Number(param)) ? null : Number(param);

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

const project = ref<Database["public"]["Tables"]["project"]["Row"]>();
const tasks = ref<Array<Database["public"]["Tables"]["task"]["Row"]>>([]);
const taskPriorities = ref<
    Array<Database["public"]["Tables"]["task_priority"]["Row"]>
>([]);
const taskStatuses = ref<
    Array<Database["public"]["Tables"]["task_status"]["Row"]>
>([]);

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

const loadTasks = async () => {
    if (!projectId) return;

    const { data, error } = await supabase
        .from("task")
        .select("*")
        .eq("project_id", projectId);

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

    taskPriorities.value = data;
};

const loadTaskStatuses = async () => {
    const { data, error } = await supabase.from("task_status").select("*");

    if (error) {
        simpleToast.error(error.message);
        return;
    }

    taskStatuses.value = data;
};

const loading = ref(true);

onMounted(async () => {
    await Promise.all([
        loadProject(),
        loadTasks(),
        loadTaskPriorities(),
        loadTaskStatuses(),
    ]);
    loading.value = false;
});

const saveData = async (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.validationWarn();
        return;
    }

    const { error } = await supabase.rpc("upsert_project_with_tasks", {
        p_project_id: projectId ?? undefined,
        p_project_name: event.values.project_name,
        p_tasks: tasks.value,
    });
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    simpleToast.saveSuccess();
    navigateTo("/project");
};
</script>
