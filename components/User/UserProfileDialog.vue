<template>
    <Dialog
        id="profile-dialog"
        header="Profil"
        modal
        :visible="isDialogVisible"
        class="w-96"
        @update:visible="isDialogVisible = !isDialogVisible"
    >
        <CRUDForm @submit="saveProfile($event)">
            <CRUDFormField
                id="email"
                label="Email"
                component="InputText"
                :initial-value="profile?.email"
                disabled
            />
            <div class="flex gap-6">
                <CRUDFormField
                    id="first_name"
                    label="First Name"
                    component="InputText"
                    :schema="yup.string().required()"
                    :initial-value="profile?.first_name"
                />
                <CRUDFormField
                    id="last_name"
                    label="Last Name"
                    component="InputText"
                    :schema="yup.string().required()"
                    :initial-value="profile?.last_name"
                />
            </div>
            <Button
                label="Save"
                icon="pi pi-save"
                type="submit"
                class="w-full"
            />
        </CRUDForm>
    </Dialog>
</template>

<script setup lang="ts">
import * as yup from "yup";
import type { FormSubmitEvent } from "@primevue/forms";
import type { Database } from "~/supabase/types";

const simpleToast = useSimpleToast();
const supabase = useSupabaseClient<Database>();
const user = useSupabaseUser();

const profile =
    ref<Database["public"]["Views"]["vw_profile_with_roles"]["Row"]>();
const isDialogVisible = ref(false);

onMounted(async () => {
    await loadProfile();
});

const loadProfile = async () => {
    const { data, error } = await supabase
        .from("vw_profile_with_roles")
        .select("*")
        .eq("user_id", user.value?.id as never)
        .single();
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    profile.value = data;
};

const saveProfile = async (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.validationWarn();
        return;
    }

    const newData = {
        first_name: event.values.first_name,
        last_name: event.values.last_name,
    };
    const { data, error } = await supabase
        .from("profile")
        .update(newData as never)
        .eq("user_id", user?.value?.id as never)
        .select()
        .single();
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    if (profile.value) {
        profile.value.first_name = data.first_name;
        profile.value.last_name = data.last_name;
    }
    isDialogVisible.value = false;
    simpleToast.saveSuccess();
};

const openDialog = () => (isDialogVisible.value = true);

defineExpose({
    openDialog,
});
</script>
