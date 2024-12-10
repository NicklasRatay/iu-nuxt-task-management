import { it, expect, describe } from "vitest";
import { mount, config } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import ChartTaskStatus from "./ChartTaskStatus.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("ChartTaskStatus", () => {
    it("can be mounted", () => {
        const wrapper = mount(ChartTaskStatus);
        expect(wrapper.exists()).toBe(true);
    });
});
