<template>
    <Dialog
        id="task-dialog"
        header="Task"
        modal
        :visible="isDialogVisible"
        class="w-11/12 lg:w-1/2"
        @update:visible="isDialogVisible = !isDialogVisible"
    >
        <CRUDForm @submit="task?.id ? updateData($event) : insertData($event)">
            <div class="flex flex-col">
                <CRUDFormField
                    id="name"
                    label="Name"
                    component="InputText"
                    :schema="yup.string().required()"
                    :initial-value="task?.name"
                    class="w-full"
                />
                <CRUDFormField
                    id="description"
                    label="Description"
                    component="Textarea"
                    :schema="yup.string().required()"
                    :initial-value="task?.description"
                    rows="5"
                    class="w-full"
                />
                <div class="grid gap-x-6 grid-cols-1 md:grid-cols-3">
                    <CRUDFormField
                        id="deadline"
                        label="Deadline"
                        component="DatePicker"
                        :schema="yup.date().required()"
                        :initial-value="task?.deadline"
                        :min-date="new Date()"
                    />
                    <CRUDFormField
                        id="task_priority_id"
                        label="Priority"
                        component="Select"
                        :schema="yup.number().required()"
                        :initial-value="task?.task_priority_id"
                        :options="taskPriorityLOV"
                        option-value="id"
                        option-label="name"
                        placeholder="Select Priority"
                    />
                    <CRUDFormField
                        id="assigned_user_id"
                        label="Assigned User"
                        component="Select"
                        :schema="yup.string().required()"
                        :initial-value="task?.assigned_user_id"
                        :options="userLOV"
                        option-value="user_id"
                        option-label="full_name"
                        placeholder="Select User"
                        filter
                    />
                </div>
            </div>
            <div class="flex gap-6">
                <Button
                    label="Save"
                    icon="pi pi-save"
                    type="submit"
                    class="w-full"
                />
                <Button
                    v-if="task?.id"
                    label="Delete"
                    icon="pi pi-trash"
                    severity="danger"
                    class="w-full"
                    @click="deleteData"
                />
            </div>
        </CRUDForm>
    </Dialog>
</template>

<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "@primevue/forms";
import type { Database } from "~/supabase/types";

const props = defineProps<{
    projectId: number | null;
}>();

const emits = defineEmits<{
    processed: ["inserted" | "updated" | "deleted"];
}>();

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

const task = ref<Database["public"]["Tables"]["task"]["Row"] | null>(null);
const isDialogVisible = ref(false);

const taskPriorityLOV = ref<
    Array<Database["public"]["Tables"]["task_priority"]["Row"]>
>([]);
const taskStatusLOV = ref<
    Array<Database["public"]["Tables"]["task_status"]["Row"]>
>([]);
const userLOV = ref<
    Array<Database["public"]["Views"]["vw_team_member_lov"]["Row"]>
>([]);

const loadTask = async (taskId: number) => {
    const { data, error } = await supabase
        .from("task")
        .select("*")
        .eq("id", taskId)
        .single();
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    task.value = data;
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
        .from("vw_team_member_lov")
        .select("*");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    userLOV.value = data;
};

onMounted(async () => {
    await Promise.all([loadTaskPriorities(), loadTaskStatuses(), loadUsers()]);
});

const insertData = async (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.validationWarn();
        return;
    }

    event.values.deadline = normalizeToUTC(event.values.deadline);
    delete event.values.undefined; // Sometimes, the form values contain undefined which causes supabase error

    const { error } = await supabase.from("task").insert({
        project_id: props.projectId,
        task_status_id: 1,
        ...event.values,
    } as never);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    emits("processed", "inserted");
    simpleToast.saveSuccess();
    isDialogVisible.value = false;
};

const updateData = async (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.validationWarn();
        return;
    }

    event.values.deadline = normalizeToUTC(event.values.deadline);
    delete event.values.undefined; // Sometimes, the form values contain undefined which causes supabase error

    const { error } = await supabase
        .from("task")
        .update(event.values as never)
        .eq("id", task.value?.id as never);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    emits("processed", "updated");
    simpleToast.saveSuccess();
    isDialogVisible.value = false;
};

const deleteData = async () => {
    if (!task.value) {
        return;
    }

    const { error } = await supabase
        .from("task")
        .delete()
        .eq("id", task.value.id);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    emits("processed", "deleted");
    simpleToast.deleteSuccess();
    isDialogVisible.value = false;
};

const openDialog = async (taskId: number | null) => {
    task.value = null;
    if (taskId) {
        await loadTask(taskId);
    }
    isDialogVisible.value = true;
};

defineExpose({
    openDialog,
});
</script>
