import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ProjectCard from "./ProjectCard.vue";

describe("ProjectCard", () => {
    const projectMock = {
        id: 1,
        name: "Test Project",
        completed_tasks: 5,
        total_tasks: 10,
        completion_percentage: 50,
        created_at: "2023-01-01T00:00:00Z",
        created_by: "user1",
        updated_at: "2023-01-02T00:00:00Z",
        updated_by: "user2",
    };

    it("renders project name correctly", () => {
        const wrapper = mount(ProjectCard, {
            props: {
                project: projectMock,
            },
        });

        expect(wrapper.text()).toContain("Test Project");
    });

    it("renders the correct number of completed and total tasks", () => {
        const wrapper = mount(ProjectCard, {
            props: {
                project: projectMock,
            },
        });

        expect(wrapper.text()).toContain("5 of 10 Tasks Done");
    });

    it("renders the correct completion percentage", () => {
        const wrapper = mount(ProjectCard, {
            props: {
                project: projectMock,
            },
        });

        expect(wrapper.text()).toContain("50 %");
    });

    it("handles null values gracefully", () => {
        const projectMockWithNulls = {
            id: null,
            name: null,
            completed_tasks: null,
            total_tasks: null,
            completion_percentage: null,
            created_at: null,
            created_by: null,
            updated_at: null,
            updated_by: null,
        };

        const wrapper = mount(ProjectCard, {
            props: {
                project: projectMockWithNulls,
            },
        });

        // Check for default values or fallback rendering
        expect(wrapper.text()).toContain("0 of 0 Tasks Done");
        expect(wrapper.text()).toContain("0 %");
    });
});
