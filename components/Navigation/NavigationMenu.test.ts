import { it, expect, describe, beforeEach, afterEach, vi } from "vitest";
import { mount, config } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import NavigationMenu from "./NavigationMenu.vue";

config.global.plugins = [PrimeVue, ToastService];

// Mocking the useRole composable as to have a user with all roles
vi.mock("~/composables/useRole", () => {
    return {
        useRole: () => {
            return {
                hasRole: vi.fn(async () => true),
            };
        },
    };
});

describe("NavigationMenu", () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        wrapper = mount(NavigationMenu);
    });

    afterEach(() => {
        wrapper.unmount();
    });

    it("can be mounted", () => {
        expect(wrapper.exists()).toBe(true);
    });

    it("has correct labels", () => {
        const entries = wrapper.findAll(
            ".p-panelmenu-header-content > a > div",
        );

        expect(entries[0].exists()).toBe(true);
        expect(entries[0].text()).toBe("Dashboard");
        expect(entries[1].exists()).toBe(true);
        expect(entries[1].text()).toBe("Your Projects");
        expect(entries[2].exists()).toBe(true);
        expect(entries[2].text()).toBe("Users");
    });
});
