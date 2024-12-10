import { it, expect, describe } from "vitest";
import { mount, config } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ChartTaskPriority from "./ChartTaskPriority.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("ChartTaskPriority", () => {
    it("can be mounted", () => {
        const wrapper = mount(ChartTaskPriority);
        expect(wrapper.exists()).toBe(true);
    });
});
