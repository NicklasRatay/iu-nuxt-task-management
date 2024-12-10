import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import NavigationError from "./NavigationError.vue";

describe("NavigationError", () => {
    it("renders the error code, icon, and title correctly", () => {
        const wrapper = mount(NavigationError, {
            props: {
                errorCode: "404",
                icon: "pi pi-exclamation-triangle",
                color: "text-red-500",
                title: "Page Not Found",
            },
        });

        expect(wrapper.text()).toContain("404");
        expect(wrapper.find("i").classes()).toContain("pi");
        expect(wrapper.find("i").classes()).toContain(
            "pi-exclamation-triangle",
        );
        expect(wrapper.find("i").classes()).toContain("text-red-500");
        expect(wrapper.text()).toContain("Page Not Found");
    });

    it("renders the subtitle when provided", () => {
        const wrapper = mount(NavigationError, {
            props: {
                errorCode: "404",
                icon: "pi pi-exclamation-triangle",
                color: "text-red-500",
                title: "Page Not Found",
                subtitle: "The page you are looking for does not exist.",
            },
        });

        expect(wrapper.text()).toContain(
            "The page you are looking for does not exist.",
        );
    });

    it("does not render the subtitle when not provided", () => {
        const wrapper = mount(NavigationError, {
            props: {
                errorCode: "404",
                icon: "pi pi-exclamation-triangle",
                color: "text-red-500",
                title: "Page Not Found",
            },
        });

        expect(wrapper.text()).not.toContain("subtitle");
    });

    it("renders the button with correct label and icon when provided", () => {
        const wrapper = mount(NavigationError, {
            props: {
                errorCode: "403",
                icon: "pi pi-lock",
                color: "text-orange-500",
                title: "Access Denied",
                buttonIcon: "pi pi-refresh",
                buttonLabel: "Retry",
                buttonCallback: vi.fn(),
            },
        });

        const button = wrapper.findComponent({ name: "Button" });
        expect(button.exists()).toBe(true);
        expect(button.props("icon")).toBe("pi pi-refresh");
        expect(button.props("label")).toBe("Retry");
    });

    it("does not render the button when buttonCallback is not provided", () => {
        const wrapper = mount(NavigationError, {
            props: {
                errorCode: "403",
                icon: "pi pi-lock",
                color: "text-orange-500",
                title: "Access Denied",
            },
        });

        const button = wrapper.findComponent({ name: "Button" });
        expect(button.exists()).toBe(false);
    });

    it("calls buttonCallback when the button is clicked", async () => {
        const mockCallback = vi.fn();
        const wrapper = mount(NavigationError, {
            props: {
                errorCode: "403",
                icon: "pi pi-lock",
                color: "text-orange-500",
                title: "Access Denied",
                buttonIcon: "pi pi-refresh",
                buttonLabel: "Retry",
                buttonCallback: mockCallback,
            },
        });

        const button = wrapper.findComponent({ name: "Button" });
        await button.trigger("click");
        expect(mockCallback).toHaveBeenCalledTimes(1);
    });
});
