<template>
    <FormField class="flex flex-col gap-1">
        <label :for="id">{{ label }}</label>
        <component
            :is="component"
            :id
            :name="id"
            fluid
            v-bind="$attrs"
        />
        <div class="c-text-error text-sm min-h-6">
            {{ messageWithoutFieldName }}
        </div>
    </FormField>
</template>

<script setup lang="ts">
import * as PrimeVue from "primevue";
import type { AnySchema } from "yup";

const props = defineProps<{
    id: string; // Unique identifier for yup validation schema and html elements (used in submit event like event.values.<id>)
    label: string; // Label displayed above the input field
    component: keyof typeof PrimeVue; // PrimeVue input component to render
    schema?: AnySchema; // Yup validation schema
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialValue?: any; // Loaded on mount
}>();

const emits = defineEmits<{
    valueChanged: [any]; // eslint-disable-line @typescript-eslint/no-explicit-any
}>();

// Get input component to render
const component = computed(() => PrimeVue[props.component]);

// Register field in CRUDForm component
const $fcCRUDForm = inject("$fcCRUDForm", undefined) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
$fcCRUDForm.addField(props.id, props.schema, props.initialValue);

// Get PrimeVue Form component to access state of this form field
const $pcForm = inject("$pcForm", undefined) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
const state = computed(() => $pcForm?.states?.[props.id]);

// Get first error message
const errors = computed(() => state.value?.errors);
const message = computed(() => errors.value?.[0]?.message);
const messageWithoutFieldName = computed(() =>
    removeLabelFromValidationError(message.value),
);

// Emit valueChanged event when value changes
const value = computed(() => state.value?.value);
watch(value, (newValue) => {
    emits("valueChanged", newValue);
});

const removeLabelFromValidationError = (errorMessage?: string) => {
    if (!errorMessage) {
        return "";
    }

    if (errorMessage[0] === errorMessage[0].toUpperCase()) {
        return errorMessage;
    }

    errorMessage = errorMessage.split(" ").slice(1).join(" "); // Remove first word
    return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1); // First letter to uppercase
};
</script>
