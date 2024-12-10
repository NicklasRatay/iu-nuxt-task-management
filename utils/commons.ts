/**
 * Normalizes a date to midnight UTC. Needed for sending dates from datepicker to supabase.
 * @param date The date to normalize
 * @returns The date at midnight UTC
 */
export const normalizeToUTC = (date: Date) => {
    const utcDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );

    return utcDate.toISOString();
};

/**
 * Returns the css icon class for a task priority including the color.
 * @param priorityId The id of the task priority
 * @returns The icon class
 */
export const getTaskPriorityIcon = (priorityId: number | null) => {
    switch (priorityId) {
        case 1:
            return "pi pi-angle-down text-muted-color";
        case 2:
            return "pi pi-minus text-primary";
        case 3:
            return "pi pi-angle-up text-orange-500";
        case 4:
            return "pi pi-angle-double-up text-red-500";
        default:
            return undefined;
    }
};
