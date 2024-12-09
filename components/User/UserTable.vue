<template>
    <DataTable
        v-model:filters="filters"
        :value="users"
        data-key="user_id"
        :loading="loading"
        show-gridlines
        scrollable
        scroll-height="flex"
        paginator
        :rows="50"
        :rows-per-page-options="[20, 50, 100, 250]"
        sort-mode="multiple"
        removable-sort
        :global-filter-fields="['email', 'first_name', 'last_name', 'roles']"
        filter-display="menu"
        state-storage="session"
        state-key="user-table-state"
        class="c-card !p-0 c-max-h-full"
    >
        <template #header>
            <div class="flex justify-between items-center gap-4 py-1">
                <div class="flex items-center gap-4">
                    <i class="pi pi-users !text-2xl" />
                    <div
                        v-if="!isMobile"
                        class="text-2xl font-semibold"
                    >
                        Users
                    </div>
                    <IconField>
                        <InputIcon class="pi pi-search" />
                        <InputText
                            v-model="filters.global.value"
                            placeholder="Search"
                            fluid
                        />
                    </IconField>
                    <slot />
                </div>
                <Button
                    icon="pi pi-undo"
                    :label="isMobile ? undefined : 'Reset'"
                    severity="secondary"
                    @click="resetfilters"
                />
            </div>
        </template>
        <template #empty>
            <div class="text-center">No Users Found</div>
        </template>
        <template #loading>
            <i class="pi pi-sync pi-spin text-5xl" />
        </template>
        <Column
            header="Edit"
            class="w-16"
            body-class="!p-1"
        >
            <template #body="{ data }">
                <Button
                    icon="pi pi-pencil"
                    text
                    class="min-w-full"
                    @click="$emit('editButtonClicked', data)"
                />
            </template>
        </Column>
        <Column
            field="email"
            header="Email"
            sortable
        >
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" />
            </template>
        </Column>
        <Column
            field="first_name"
            header="First Name"
            sortable
            class="w-[20%]"
        >
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" />
            </template>
        </Column>
        <Column
            field="last_name"
            header="Last Name"
            sortable
            class="w-[20%]"
        >
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" />
            </template>
        </Column>
        <Column
            field="roles"
            header="Roles"
            sortable
            :show-filter-match-modes="false"
            :show-filter-operator="false"
            class="w-[20%]"
        >
            <template #filter="{ filterModel }">
                <MultiSelect
                    v-model="filterModel.value"
                    :options="roles"
                    option-value="name"
                    option-label="name"
                    :max-selected-labels="1"
                />
            </template>
        </Column>
        <Column
            field="is_active"
            header="Status"
            sortable
            :show-filter-match-modes="false"
            :show-filter-operator="false"
            class="w-44"
        >
            <template #body="{ data }">
                <i
                    :class="[
                        'w-full text-center pi',
                        {
                            'pi-check-circle text-green-500 ': data.is_active,
                            'pi-times-circle text-red-500': !data.is_active,
                        },
                    ]"
                />
            </template>
            <template #filter="{ filterModel }">
                <Select
                    v-model="filterModel.value"
                    :options="[
                        { label: 'Active', value: true },
                        { label: 'Inactive', value: false },
                    ]"
                    option-label="label"
                    option-value="value"
                />
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import { FilterMatchMode, FilterOperator } from "@primevue/core/api";
import type { Database } from "~/supabase/types";

defineEmits<{
    editButtonClicked: [
        Database["public"]["Views"]["vw_profile_with_roles"]["Row"],
    ];
}>();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);

const simpleToast = useSimpleToast();
const supabase = useSupabaseClient<Database>();

const loading = ref(true);
const roles = ref<Array<Database["public"]["Tables"]["role"]["Row"]>>();
const users =
    ref<Array<Database["public"]["Views"]["vw_profile_with_roles"]["Row"]>>();

const loadRoles = async () => {
    const { data, error } = await supabase.from("role").select("*");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    roles.value = data;
};

const loadProfiles = async () => {
    const { data, error } = await supabase
        .from("vw_profile_with_roles")
        .select("*");
    if (error) {
        simpleToast.error(error.message);
        return;
    }
    users.value = data;
};

const filters = ref();
const resetfilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        email: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        first_name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        last_name: {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }],
        },
        roles: { value: null, matchMode: FilterMatchMode.IN },
        is_active: { value: null, matchMode: FilterMatchMode.EQUALS },
    };
};
resetfilters();

onMounted(async () => {
    await loadRoles();
    await loadProfiles();
    loading.value = false;
});

defineExpose({
    loadProfiles,
});
</script>
