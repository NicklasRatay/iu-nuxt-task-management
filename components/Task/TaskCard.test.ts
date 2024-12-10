import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import TaskCard from "./TaskCard.vue"; // Update the path accordingly

describe("TaskCard", () => {
    const task = {
        id: 1,
        name: "Test Task",
        description: "This is a test task description.",
        deadline: "2024-12-31",
        created_at: "2024-01-01T10:00:00Z",
        updated_at: "2024-01-02T10:00:00Z",
        project_id: 1,
        project_name: "Test Project",
        priority_id: 2,
        priority_name: "Medium",
        status_id: 1,
        status_name: "To Do",
        assigned_user_id: "123",
        assigned_user_email: "user@example.com",
        assigned_user_name: "John Doe",
    };

    it("renders task name", () => {
        const wrapper = mount(TaskCard, {
            props: { task },
        });

        expect(wrapper.text()).toContain("Test Task");
    });

    it("renders task description when not mobile", async () => {
        global.innerWidth = 1200;

        const wrapper = mount(TaskCard, {
            props: { task },
        });

        expect(wrapper.text()).toContain("This is a test task description");
    });

    it("does not render task description when mobile", async () => {
        global.innerWidth = 600;

        const wrapper = mount(TaskCard, {
            props: { task },
        });
        await nextTick();
        expect(wrapper.text()).not.toContain("This is a test task description");
    });

    it("renders the priority icon", () => {
        const mockGetTaskPriorityIcon = vi
            .fn()
            .mockReturnValue("pi pi-minus text-primary");

        const wrapper = mount(TaskCard, {
            props: { task },
            global: {
                mocks: {
                    getTaskPriorityIcon: mockGetTaskPriorityIcon,
                },
            },
        });

        const iconElement = wrapper.find("i");
        expect(iconElement.classes()).toContain("pi");
        expect(iconElement.classes()).toContain("pi-minus");
        expect(iconElement.classes()).toContain("text-primary");
    });

    it("renders the deadline", () => {
        const wrapper = mount(TaskCard, {
            props: { task },
        });

        expect(wrapper.text()).toContain("2024-12-31");
    });
});
