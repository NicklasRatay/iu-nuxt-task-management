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
