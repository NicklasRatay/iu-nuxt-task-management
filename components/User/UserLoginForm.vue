<template>
    <div class="flex items-center justify-center h-screen">
        <div class="c-card">
            <div
                id="title"
                class="text-xl text-color font-bold mb-6"
            >
                {{ APP_NAME }}
            </div>
            <CRUDForm
                :validate-on-value-update="false"
                :validate-on-blur="true"
                @submit="handleSubmit($event)"
            >
                <CRUDFormField
                    id="email"
                    label="Email"
                    component="InputText"
                    :schema="yup.string().required().email()"
                />
                <CRUDFormField
                    id="password"
                    label="Password"
                    component="Password"
                    :schema="yup.string().required()"
                    :feedback="false"
                    toggle-mask
                />
                <Button
                    label="Sign In"
                    icon="pi pi-sign-in"
                    type="submit"
                    :loading="loading"
                    fluid
                />
            </CRUDForm>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms";
import * as yup from "yup";
import type { Database } from "#build/types/supabase-database";
import { APP_NAME } from "~/utils/constants";

const supabase = useSupabaseClient<Database>();
const simpleToast = useSimpleToast();

const loading = ref(false);

const handleSubmit = async ({
    valid,
    values: { email, password },
}: FormSubmitEvent) => {
    if (!valid) {
        simpleToast.validationWarn();
        return;
    }

    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    loading.value = false;

    if (error) {
        simpleToast.error(error.message);
        return;
    }

    navigateTo("/");
};
</script>
