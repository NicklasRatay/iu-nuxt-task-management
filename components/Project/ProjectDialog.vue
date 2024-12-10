<template>
    <Dialog
        id="task-dialog"
        header="Project"
        modal
        :visible="isDialogVisible"
        class="w-3/4 md:w-1/2 lg:w-1/4"
        @update:visible="isDialogVisible = !isDialogVisible"
    >
        <CRUDForm
            @submit="project?.id ? updateData($event) : insertData($event)"
        >
            <CRUDFormField
                id="name"
                label="Name"
                component="InputText"
                :schema="yup.string().required()"
                :initial-value="project?.name"
                class="w-full"
            />
            <div class="flex gap-6">
                <Button
                    label="Save"
                    icon="pi pi-save"
                    type="submit"
                    class="w-full"
                />
                <Button
                    v-if="project?.id"
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

const emits = defineEmits<{
    processed: ["inserted" | "updated" | "deleted"];
}>();

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

const project = ref<Database["public"]["Tables"]["project"]["Row"] | null>(
    null,
);
const isDialogVisible = ref(false);

const loadProject = async (id: number) => {
    const { data, error } = await supabase
        .from("project")
        .select("*")
        .eq("id", id)
        .single();
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    project.value = data;
};

const insertData = async (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.validationWarn();
        return;
    }

    const { error } = await supabase
        .from("project")
        .insert({
            ...event.values,
        } as never)
        .select()
        .single();
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

    const { error } = await supabase
        .from("project")
        .update(event.values as never)
        .eq("id", project.value?.id as never);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    emits("processed", "updated");
    simpleToast.saveSuccess();
    isDialogVisible.value = false;
};

const deleteData = async () => {
    if (!project.value) {
        return;
    }

    const { error } = await supabase
        .from("project")
        .delete()
        .eq("id", project.value.id);
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    emits("processed", "deleted");
    simpleToast.deleteSuccess();
    isDialogVisible.value = false;
};

const openDialog = async (id: number | null) => {
    project.value = null;
    if (id) {
        await loadProject(id);
    }
    isDialogVisible.value = true;
};

defineExpose({
    openDialog,
});
</script>
