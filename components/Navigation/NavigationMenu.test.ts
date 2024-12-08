import { it, expect, describe, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import NavigationMenu from "./NavigationMenu.vue";

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
    });
});
