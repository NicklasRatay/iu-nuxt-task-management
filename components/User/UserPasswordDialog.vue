<template>
    <Dialog
        id="profile-password-dialog"
        header="Change Password"
        modal
        :visible="isDialogVisible"
        class="w-96"
        @update:visible="isDialogVisible = !isDialogVisible"
    >
        <CRUDForm @submit="savePassword($event)">
            <CRUDFormField
                id="password"
                label="New Password"
                component="Password"
                :schema="
                    yup
                        .string()
                        .required()
                        .min(8)
                        .matches(
                            /[a-z]/,
                            'Password must contain a lowercase letter',
                        )
                        .matches(
                            /[A-Z]/,
                            'Password must contain an uppercase letter',
                        )
                        .matches(/[0-9]/, 'Password must contain a number')
                        .matches(
                            /[^a-zA-Z0-9]/,
                            'Password must contain a special character',
                        )
                "
                toggle-mask
                :feedback="false"
            />
            <CRUDFormField
                id="confirm_password"
                label="Confirm Password"
                component="Password"
                :schema="
                    yup
                        .string()
                        .required()
                        .oneOf(
                            [yup.ref('password')],
                            'Passwords do not match',
                        )
                "
                toggle-mask
                :feedback="false"
            />
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

const isDialogVisible = ref(false);

const savePassword = async (event: FormSubmitEvent) => {
    if (!event.valid) {
        simpleToast.validationWarn();
        return;
    }

    const { error } = await supabase.auth.updateUser({
        password: event.values.password,
    });
    if (error) {
        simpleToast.error(error.message);
        return;
    }

    isDialogVisible.value = false;
    simpleToast.saveSuccess();
};

const openDialog = () => (isDialogVisible.value = true);

defineExpose({
    openDialog,
});
</script>
