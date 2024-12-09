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
