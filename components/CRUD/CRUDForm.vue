<template>
    <Form
        v-focustrap
        :initial-values="initialValues"
        :resolver="resolver"
        @submit="$emit('submit', $event)"
    >
        <!-- Use <CRUDFormField /> and <Button type="submit" /> in this slot -->
        <slot />
    </Form>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms";
import { isEmpty } from "lodash-es";
import { yupResolver } from "@primevue/forms/resolvers/yup";
import * as yup from "yup";

// Event contains form values and validation states (https://primevue.org/forms/#api.form.events.FormSubmitEvent)
defineEmits<{
    submit: [FormSubmitEvent];
}>();

// All initial values
const initialValues = ref({} as Record<string, any>); // eslint-disable-line @typescript-eslint/no-explicit-any

// All yup validation schemas
const schemas = ref({} as yup.ObjectShape);

// Resolver for handling validation on submit
const resolver = computed(() =>
    !isEmpty(schemas.value)
        ? yupResolver(yup.object().shape(schemas.value))
        : undefined,
);

// Register yup validation schema and initial value
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addField = (id: string, schema: yup.AnySchema, initialValue: any) => {
    if (schema) schemas.value[id] = schema;
    initialValues.value[id] = initialValue;
};

// For CRUDFormField component
provide("$fcCRUDForm", {
    addField,
});
</script>
