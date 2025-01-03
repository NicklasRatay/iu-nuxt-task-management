import { it, expect, describe } from "vitest";
import { mount, config } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ProjectTable from "./ProjectTable.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("ProjectTable", () => {
    it("can be mounted", () => {
        const wrapper = mount(ProjectTable);
        expect(wrapper.exists()).toBe(true);
    });
});
