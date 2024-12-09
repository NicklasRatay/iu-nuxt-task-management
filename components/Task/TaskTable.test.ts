import { it, expect, describe } from "vitest";
import { mount, config } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import TaskTable from "./TaskTable.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("TaskTable", () => {
    it("can be mounted", () => {
        const wrapper = mount(TaskTable);
        expect(wrapper.exists()).toBe(true);
    });
});
