import { describe, it, expect } from "vitest";

describe("normalizeToUTC", () => {
    it("should convert a local date to midnight UTC", () => {
        const inputDate = new Date("2024-12-09T15:30:00"); // Arbitrary local time
        const result = normalizeToUTC(inputDate);

        // Expect midnight UTC on the same date
        expect(result).toBe("2024-12-09T00:00:00.000Z");
    });

    it("should handle date objects without a time component correctly", () => {
        const inputDate = new Date("2024-12-09"); // Date-only input
        const result = normalizeToUTC(inputDate);

        expect(result).toBe("2024-12-09T00:00:00.000Z");
    });

    it("should correctly normalize dates across time zone boundaries", () => {
        const inputDate = new Date("2024-12-31T23:59:59"); // Last second of the day
        const result = normalizeToUTC(inputDate);

        expect(result).toBe("2024-12-31T00:00:00.000Z");
    });
});

describe("getTaskPriorityIcon", () => {
    it("should return the correct class for priority 1", () => {
        const result = getTaskPriorityIcon(1);
        expect(result).toBe("pi pi-angle-down text-muted-color");
    });

    it("should return the correct class for priority 2", () => {
        const result = getTaskPriorityIcon(2);
        expect(result).toBe("pi pi-minus text-primary");
    });

    it("should return the correct class for priority 3", () => {
        const result = getTaskPriorityIcon(3);
        expect(result).toBe("pi pi-angle-up text-orange-500");
    });

    it("should return the correct class for priority 4", () => {
        const result = getTaskPriorityIcon(4);
        expect(result).toBe("pi pi-angle-double-up text-red-500");
    });

    it("should return undefined for null", () => {
        const result = getTaskPriorityIcon(null);
        expect(result).toBeUndefined();
    });

    it("should return undefined for an invalid priorityId", () => {
        const result = getTaskPriorityIcon(999);
        expect(result).toBeUndefined();
    });
});
