import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import CommonIconTitle from "./CommonIconTitle.vue";

describe("CommonIconTitle", () => {
    it("renders title and subtitle props correctly", () => {
        const wrapper = mount(CommonIconTitle, {
            props: {
                title: "Test Title",
                subtitle: "Test Subtitle",
                icon: "pi pi-check",
            },
        });

        expect(wrapper.text()).toContain("Test Title");
        expect(wrapper.text()).toContain("Test Subtitle");

        const iconElement = wrapper.find("i");
        expect(iconElement.classes()).toContain("pi");
        expect(iconElement.classes()).toContain("pi-check");
    });

    it("does not render subtitle if not provided", () => {
        const wrapper = mount(CommonIconTitle, {
            props: {
                title: "Test Title",
                icon: "pi pi-check",
            },
        });

        expect(wrapper.text()).toContain("Test Title");
        expect(wrapper.text()).not.toContain("Test Subtitle");
    });

    it("renders slot content correctly", () => {
        const wrapper = mount(CommonIconTitle, {
            slots: {
                default: "<div>Slot Content</div>",
            },
            props: {
                title: "Test Title",
                icon: "pi pi-check",
            },
        });

        expect(wrapper.html()).toContain("Slot Content");
    });

    it("conditionally renders the return button based on props", () => {
        const wrapper = mount(CommonIconTitle, {
            props: {
                returnButtonRoute: "/home",
                returnButtonLabel: "Go Back",
                title: "Test Title",
                icon: "pi pi-check",
            },
        });

        const button = wrapper.find("button");
        expect(button.exists()).toBe(true);
        expect(button.text()).toBe("Go Back");
    });

    it("does not render the return button if returnButtonRoute is not provided", () => {
        const wrapper = mount(CommonIconTitle, {
            props: {
                title: "Test Title",
                icon: "pi pi-check",
            },
        });

        const button = wrapper.find("button");
        expect(button.exists()).toBe(false);
    });

    it("uses default return button label when not provided", () => {
        const wrapper = mount(CommonIconTitle, {
            props: {
                returnButtonRoute: "/home",
                title: "Test Title",
                icon: "pi pi-check",
            },
        });

        const button = wrapper.find("button");
        expect(button.text()).toBe("Return");
    });

    it("adjusts return button label for mobile devices", async () => {
        const wrapper = mount(CommonIconTitle, {
            props: {
                returnButtonRoute: "/home",
                title: "Test Title",
                icon: "pi pi-check",
            },
        });

        const mockWindowWidth = 500;
        global.innerWidth = mockWindowWidth;
        global.dispatchEvent(new Event("resize"));
        await wrapper.vm.$nextTick();

        const button = wrapper.find("button");
        expect(button.text()).toBe(""); // Should be undefined label on mobile
    });
});
