import { it, expect, describe } from "vitest";
import { mount, config } from "@vue/test-utils";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import TaskDialog from "./TaskDialog.vue";

config.global.plugins = [PrimeVue, ToastService];

describe("TaskDialog", () => {
    it("can be mounted", () => {
        const wrapper = mount(TaskDialog, {
            props: {
                projectId: 1,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });
});
