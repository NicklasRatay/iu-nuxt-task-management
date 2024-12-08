<template>
    <div>
        <UserDialog
            ref="refUserDialog"
            @processed="refUserTable.loadProfiles()"
        />
        <UserTable
            ref="refUserTable"
            @edit-button-clicked="refUserDialog.openDialog($event.user_id)"
        >
            <Button
                icon="pi pi-plus"
                :label="isMobile ? undefined : 'Create'"
                @click="refUserDialog.openDialog(null)"
            />
        </UserTable>
    </div>
</template>

<script setup lang="ts">
const refUserDialog = ref();
const refUserTable = ref();

const { width } = useWindowSize();
const isMobile = computed(() => width.value <= 768);
</script>
